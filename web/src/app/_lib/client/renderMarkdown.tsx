import { marked } from 'marked'
import { sanitize } from 'dompurify'
import style from '@/css/markdown.module.css'

export const RenderMarkdown = ({ content }: { content: string }) => {
  return (
    <div
      className={style.markdown}
      dangerouslySetInnerHTML={{
        __html: sanitize(marked.parse(content, { async: false }) as string),
      }}
    ></div>
  )
}
