'use client'
import Iframe from './Iframe'

const SecureIFrame = ({ token, url }: { token: string; url: string }) => {
  return (
    <div className="flex min-h-screen">
      <Iframe
        src={url}
        id=""
        className="w-full h-full flex-1 min-h-[100vh] border-none"
        display="block"
        position="relative"
        headers={{
          Authorization: `Bearer ${token}`,
          'Content-Type': 'text/html',
        }}
      />
    </div>
  )
}

export default SecureIFrame
