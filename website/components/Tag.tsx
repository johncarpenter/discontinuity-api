import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <span role="button" className="m-0.5 inline-flex items-center rounded-full bg-primary-200 px-3 py-0.5 text-sm font-sm text-primary-600">
        {text.toLocaleLowerCase()}
      </span>      
    </Link>
  )
}

export default Tag
