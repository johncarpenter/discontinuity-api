import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'

type Article = {
  title: string
  link: string
  thumbnail: string
  pubDate: string
}

const BlogSlider = async () => {
  const { articles } = await getArticles()

  async function getArticles(): Promise<{ articles: Article[] }> {
    let articles = []
    try {
      const res = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@johncarpenter`
      )
      const data = await res.json()
      if (data.items.length > 3) data.items = data.items.slice(0, 3)
      articles = data.items
      console.log(articles)
    } catch (e) {}

    return {
      articles,
    }
  }
  return (
    <div className="w-full py-10">
      <div className="relative flex flex-col px-5 mx-auto space-y-5 md:w-3/4">
        <div className="flex flex-col  space-y-5">
          <h6 className="font-bold  text-secondary-600 uppercase">More Reading</h6>
          <h2 className="text-4xl font-bold ">
            <span className="block">Need Some Inspiration?</span>
          </h2>
          <p className=" text-gray-600">
            Follow some of our research online. We post when we can, but we are busy building the
            world.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-3">
          {articles.map((article, index) => (
            <Link href={article.link} key={index}>
              <div className="p-5 space-y-5 transition rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2">
                <div className="relative w-full bg-gray-400 rounded-lg h-48">
                  <Image
                    priority
                    src={article.thumbnail}
                    className="rounded-lg"
                    fill
                    style={{ objectFit: 'contain' }}
                    alt={article.title}
                  />
                </div>
                <div className="h-16 flex flex-col">
                  <h4 className="text-lg text-gray-500 flex-1">{article.title}</h4>
                  <h6 className="text-gray-400 text-md">
                    {moment(article.pubDate).format('DD MMM YYYY')}
                  </h6>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogSlider
