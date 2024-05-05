'use client'

import toast from 'react-hot-toast'

type CopyToClipboardProps = {
  children: React.ReactNode
  copyText: string
}

export function CopyToClipboard({ children, copyText }: CopyToClipboardProps) {
  // This is the function we wrote earlier
  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand('copy', true, text)
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
    toast.success('Copied to clipboard')
  }

  return (
    <div>
      <input type="text" value={copyText} readOnly className="hidden" />
      {/* Bind our handler function to the onClick button property */}
      <button onClick={handleCopyClick} className="px-2">
        <span>{children}</span>
      </button>
    </div>
  )
}
//<ClipboardIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
