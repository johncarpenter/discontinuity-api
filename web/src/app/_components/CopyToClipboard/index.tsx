'use client'
import { ClipboardIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export function CopyToClipboard({ copyText }: { copyText: string }) {
  const [isCopied, setIsCopied] = useState(false)

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
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 1500)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <input type="text" value={copyText} readOnly className="hidden" />
      {/* Bind our handler function to the onClick button property */}
      <button onClick={handleCopyClick} className="px-2">
        <span>
          {isCopied ? (
            <ClipboardIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          ) : (
            <ClipboardIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          )}
        </span>
      </button>
    </div>
  )
}
