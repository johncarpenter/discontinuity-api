import style from '@/css/markdown.module.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Markdown from 'marked-react'
import { CopyToClipboard } from '@/app/_components/CopyToClipboard'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import { Text } from '@/components/Base/text'

export const RenderMarkdown = ({ content }: { content: string }) => {
  const renderer = {
    code(snippet: string, lang: string) {
      return (
        <div className="rounded-lg my-4 flex flex-col bg-gray-700/60  border-gray-500 border-1">
          <div className="text-white px-2 flex flex-row">
            <Text className="flex-1">{lang}</Text>
            <CopyToClipboard copyText={snippet}>
              <ClipboardDocumentIcon className="w-5 h-5 mt-2 text-lighter" />
            </CopyToClipboard>
          </div>
          <SyntaxHighlighter style={a11yDark} language={lang}>
            {snippet}
          </SyntaxHighlighter>
        </div>
      )
    },
  }

  return (
    <div
      className={style.markdown}
      // dangerouslySetInnerHTML={{
      //   __html: sanitize(marked.parse(content, { async: false }) as string),
      // }}
    >
      <Markdown value={content} renderer={renderer} />
    </div>
  )
}
