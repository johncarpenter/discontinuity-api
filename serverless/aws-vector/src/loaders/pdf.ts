import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export async function load(file: string | Blob) {
  const loader = new PDFLoader(file);
  const docs = await loader.load();
}
