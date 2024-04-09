import { NextRequest, NextResponse } from 'next/server'
import { RunnableSequence } from '@langchain/core/runnables'

import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'
import { auth } from '@clerk/nextjs'

import { StringOutputParser } from '@langchain/core/output_parsers'
import { Document } from 'langchain/document'

import { Message as VercelChatMessage, StreamingTextResponse, experimental_StreamData } from 'ai'

import { getPostgresVectorStore, reduceSourcesToFiles } from '../util'

import { BaseCallbackHandler } from '@langchain/core/callbacks/base'
import { LangChainAgentStream } from './langchainagentstream'
//export const runtime = 'edge'

/**
 * Basic memory formatter that stringifies and passes
 * message history directly into the model.
 */
const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`
}

const TEMPLATE = `

System: You are a conversational chat bot assistant that uses the Documents and History to answer the users questions. The Documents are from files uploaded by the user. The History is the chat history of the conversation. You should use the Documents and History to answer the users questions.
Elaborate on the questions and quote the relevant documents. Answer the users Question using the Documents and History text above.
Keep your answer ground in the facts of the Documents.  If the Documents doesnt contain the facts to answer the Question inform the user. If the user refers to a file reference make sure to provide the link to the file in the response. 
 
Always include links to the relevant documents in your response. Use the Location URI: field in the Documents to get the link to the file. Don't duplicate the links. 

History:
{chatHistory}

Documents:
{context}

Question:
{question}

`

/*
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
export async function POST(req: NextRequest, { params }: { params: { workspaceId: string } }) {
  const { workspaceId } = params

  const { sessionId, orgId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  if (orgId === null || orgId === undefined) {
    return NextResponse.json({}, { status: 401 })
  }

  const body = await req.json()
  const messages = body.messages ?? []
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage)
  const currentMessageContent = messages[messages.length - 1].content

  const prompt = PromptTemplate.fromTemplate(TEMPLATE)
  /**
   * See a full list of supported models at:
   * https://js.langchain.com/docs/modules/model_io/models/
   */

  const vector = await getPostgresVectorStore(workspaceId)
  const retriever = vector.asRetriever()

  const data = new experimental_StreamData()
  const { stream, handlers } = LangChainAgentStream({
    onFinal: () => {
      data.close()
    },
    experimental_streamData: true,
  })

  const model = new ChatOpenAI({
    temperature: 0,
    callbacks: [handlers],
  })

  const chain = RunnableSequence.from([
    {
      question: (input: { question: string }) => input.question,
      chatHistory: () => formattedPreviousMessages.join('\n'),
      context: async (input: { question: string }) => {
        console.log('getting relevant docs')
        const relevantDocs = await retriever.getRelevantDocuments(input.question)
        const serialized = formatDocuments(workspaceId, relevantDocs)
        const sources = reduceSourcesToFiles(relevantDocs)
        data.append({
          sources: sources.map((doc: Document) => ({
            contentChunk: doc.pageContent,
            metadata: doc.metadata,
          })),
        })
        return serialized
      },
    },
    prompt,
    model,
    new StringOutputParser(),
  ])

  chain.invoke(
    {
      question: currentMessageContent,
    },
    {
      callbacks: [
        handlers,
        BaseCallbackHandler.fromMethods({
          handleRetrieverEnd(documents: Document[]) {
            // documents not being returned with the callback
            const sources = reduceSourcesToFiles(documents)
            data.append({
              sources: sources.map((doc: Document) => ({
                contentChunk: doc.pageContent,
                metadata: doc.metadata,
              })),
            })
          },
        }),
      ],
    }
  )

  return new StreamingTextResponse(stream, {}, data)
}

const formatDocuments = (workspaceId: string, documents: Document[]): string => {
  const docs = documents.map((doc) => {
    return `Location URI: /api/workspace/${workspaceId}/files/${doc.metadata.file} \n\nFilename: ${
      doc.metadata.filename
    }\n\nContent: ${doc.pageContent}\n\nMetadata: ${JSON.stringify(doc.metadata)}`.trim()
  })

  return docs.join('\n\n')
}
