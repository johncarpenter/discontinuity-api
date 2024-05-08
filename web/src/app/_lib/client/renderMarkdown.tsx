import { marked } from 'marked'
import { sanitize } from 'isomorphic-dompurify'
import style from '@/css/markdown.module.css'

export const RenderMarkdown = ({ content }: { content: string }) => {
  // const renderer = {
  //   code: (text: string) => {
  //     return (
  //       <SyntaxHighlighter style={dark} language={'javascript'}>
  //         {text}
  //       </SyntaxHighlighter>
  //     )
  //   },
  // }

  return (
    <div
      className={style.markdown}
      dangerouslySetInnerHTML={{
        __html: sanitize(marked.parse(content, { async: false }) as string),
      }}
    ></div>
  )
}
