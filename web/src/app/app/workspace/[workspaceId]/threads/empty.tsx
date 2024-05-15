import { Text } from '@/components/Base/text'
import Image from 'next/image'

export default function ThreadsEmptyState() {
  return (
    <div className="text-center border border-dashed border-gray-600 py-20 px-40 rounded-md min-w-60">
      <h3 className="mt-2 text-lg font-semibold text-normal">No Threads</h3>
      <Text>Threads are a way to share and save chats for reference later</Text>
      <Text>
        You can save a thread, by opening the menu in the top right corner of the chat window and
        selecting "Save Thread "
      </Text>
      <Image
        className="mx-auto mt-5"
        width={400}
        height={200}
        src="/images/thread_helper.png"
        alt="Screenshot of the save thread command in the top right corner of the chat window."
      />
    </div>
  )
}
