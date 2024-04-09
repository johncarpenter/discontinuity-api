// Ignore no-unused-vars in this file for now
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type AIStreamCallbacksAndOptions, createCallbacksTransformer } from 'ai'
import { createStreamDataTransformer } from 'ai'

export function LangChainAgentStream(callbacks?: AIStreamCallbacksAndOptions) {
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()

  const runs = new Set()

  const handleError = async (e: Error, runId: string) => {
    runs.delete(runId)
    console.error(e)
    await writer.ready
    await writer.abort(e)
  }

  const handleStart = async (runId: string) => {
    runs.add(runId)
  }

  const handleEnd = async (runId: string, outputs?: any) => {
    runs.delete(runId)

    console.log('runs', runs)
    if (runs.size === 0) {
      await handleText(outputs?.output || '')
      await writer.ready
      await writer.close()
    }
  }

  const handleText = async (text: string) => {
    await writer.ready
    await writer.write(text)
  }

  return {
    stream: stream.readable
      .pipeThrough(createCallbacksTransformer(callbacks))
      .pipeThrough(createStreamDataTransformer(callbacks?.experimental_streamData)),
    writer,
    handlers: {
      handleLLMNewToken: async (token: string) => {
        //console.log('handleLLMNewToken', token)
        await handleText(token)
      },
      handleLLMStart: async (_llm: any, _prompts: string[], runId: string) => {
        //console.log('handleLLMStart')
        handleStart(runId)
      },
      handleLLMEnd: async (_output: any, runId: string) => {
        //console.log('handleLLMEnd')
        await handleEnd(runId)
      },
      handleLLMError: async (e: Error, runId: string) => {
        //console.log('handleLLMError')
        await handleError(e, runId)
      },
      handleChainStart: async (_chain: any, _inputs: any, runId: string) => {
        //console.log('handleChainStart')
        await handleStart(runId)
      },
      handleChainEnd: async (_outputs: any, runId: string) => {
        //console.log('handleChainEnd')
        await handleEnd(runId, _outputs)
      },
      handleChainError: async (e: Error, runId: string) => {
        //console.log('handleChainError')
        await handleError(e, runId)
      },
      handleToolStart: async (_tool: any, _input: string, runId: string) => {
        //console.log('handleToolStart')
        await handleStart(runId)
      },
      handleToolEnd: async (_output: string, runId: string) => {
        //console.log('handleToolEnd')
        await handleEnd(runId)
      },
      handleToolError: async (e: Error, runId: string) => {
        //console.log('handleToolError')
        await handleError(e, runId)
      },

      handleChatModelStart: async (llm: any, messages: any, runId: string) => {
        await handleStart(runId)
        //console.log('handleChatModelStart')
      },
    },
  }
}
