import { OpenAIEmbeddings } from '@langchain/openai'
import { PGVectorStore, DistanceStrategy } from '@langchain/community/vectorstores/pgvector'
import { PoolConfig } from 'pg'
import { Document } from 'langchain/document'

export async function getPostgresVectorStore(tableName: string) {
  const config = {
    postgresConnectionOptions: {
      connectionString: process.env.VECTOR_DATABASE_URL || '',
    } as PoolConfig,
    tableName: tableName || 'documents',
    columns: {
      idColumnName: 'id',
      vectorColumnName: 'embedding',
      contentColumnName: 'pageContent',
      metadataColumnName: 'metadata',
    },
    // supported distance strategies: cosine (default), innerProduct, or euclidean
    distanceStrategy: 'cosine' as DistanceStrategy,
  }

  const pgstore = await PGVectorStore.initialize(await getEmbeddings(), config)

  return pgstore
}

async function getEmbeddings() {
  const openaiApiKey = process.env.OPENAI_API_KEY
  if (!openaiApiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not defined.')
  }

  const openaiEmbeddings = new OpenAIEmbeddings({ openAIApiKey: openaiApiKey })
  return openaiEmbeddings
}

export function reduceSourcesToFiles(documents: Document[]): Document[] {
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
  return Array.from(uniqueDocuments.values())
}
