import { createChatBotMessage, createCustomMessage } from 'react-chatbot-kit'
import Markdown from 'react-markdown'
import style from './markdown.module.css'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeMathJax from 'rehype-mathjax'

const MarkdownMessage = (props) => {
  console.log(props)
  const lastMessage = props.state.messages[props.state.messages.length - 1].message
  return (
    <div className="react-chatbot-kit-chat-bot-message bg-primary-400 m-4">
      <Markdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex, rehypeMathJax]}
        className={style.markdown}
      >
        {lastMessage}
      </Markdown>
    </div>
  )
}

const config = {
  initialMessages: [
    createChatBotMessage(
      `**Hi**, Of course I'm an AI, but this chat is designed to help you answer any questions about Discontinuity.ai. If you need to talk to a person you can always email use at hello@discontinuity.ai`,
      {}
    ),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#DB5132',
    },
    chatButton: {
      backgroundColor: '#DB5132',
    },
  },
  widgets: [
    {
      widgetName: 'markdown',
      widgetFunc: (props) => <MarkdownMessage {...props} />,
    },
  ],
}

export default config
