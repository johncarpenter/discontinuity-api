import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { ComponentProps, useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import { CoreContent } from '@/lib/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

interface Props {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: ComponentProps<typeof Pagination>
}

export default function GridLayout({ posts, title, initialDisplayPosts = [], pagination }: Props) {
  return (
    <div className="dark:bg-slate-800/80 bg-slate-200/80 rounded-xl py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-300 sm:text-4xl">
            Browse Demos
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-700 dark:text-gray-400">
            See and test how AI agents can revolutionalize your business.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => {
            const { slug, date, title, summary, tags, images } = post
            return (
              <Link href={`/demo/${slug}`} className="text-gray-900 dark:text-gray-100">
                <article key={slug} className="flex flex-col items-start justify-between">
                  <div className="relative w-full">
                    <img
                      src={images[0]}
                      alt=""
                      className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="max-w-xl">
                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                     <time dateTime={date}>{formatDate(date)}</time>
                      <div className="flex flex-wrap">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-800 dark:text-gray-300 group-hover:text-gray-600">
                        {title}
                      </h3>
                      <p className="line-clamp-3 mt-5 text-sm leading-6 text-gray-600 dark:text-gray-400">{summary}</p>
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
