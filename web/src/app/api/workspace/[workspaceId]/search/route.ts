import { NextRequest, NextResponse } from 'next/server'

import { ContextualCompressionRetriever } from 'langchain/retrievers/contextual_compression'
import { LLMChainExtractor } from 'langchain/retrievers/document_compressors/chain_extract'
import { OpenAI } from '@langchain/openai'
import { Document } from 'langchain/document'

import { auth } from '@clerk/nextjs'

import { getPostgresVectorStore } from '../util'

export async function POST(req: NextRequest, { params }: { params: { workspaceId: string } }) {
  const { workspaceId } = params

  const { sessionId, orgId } = auth()
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 })
  }

  if (orgId === null || orgId === undefined) {
    return NextResponse.json({}, { status: 401 })
  }

  const data = await req.json()

  const { q } = data

  console.log('searching for', q)

  const model = new OpenAI({
    modelName: 'gpt-3.5-turbo-instruct',
  })

  const baseCompressor = LLMChainExtractor.fromLLM(model)

  const vector = await getPostgresVectorStore(workspaceId)

  const retriever = new ContextualCompressionRetriever({
    baseCompressor: baseCompressor,
    baseRetriever: vector.asRetriever(),
  })

  let documents = await retriever.getRelevantDocuments(q)

  // Reduce the documents to only one per filename
  const uniqueDocuments = new Map<string, Document>()
  documents.forEach((doc) => {
    if (!uniqueDocuments.has(doc.metadata.file)) {
      uniqueDocuments.set(doc.metadata.file, doc)
    } else {
      // append the pageContent to the existing document
      const existingDoc = uniqueDocuments.get(doc.metadata.file)
      if (!existingDoc) {
        return
      }
      existingDoc.pageContent += doc.pageContent
      uniqueDocuments.set(doc.metadata.file, existingDoc)
    }
  })

  documents = Array.from(uniqueDocuments.values())

  return NextResponse.json({ documents })
}
