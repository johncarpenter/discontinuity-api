import { ar } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
const Guides = (props) => {
  const { articles } = props;
  return (
    <div className="w-full py-10">
      <div className="relative flex flex-col px-5 mx-auto space-y-5 md:w-3/4">
        <div className="flex flex-col items-center">
          <h6 className="font-bold text-center text-blue-600 uppercase">
            Guides
          </h6>
          <h2 className="text-4xl font-bold text-center">
            <span className="block">Samples of Works</span>
          </h2>
          <p className="text-center text-gray-600">
            AI is fantastically flexible, here are some examples of how it can
            be used.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-3">
          {articles.map((article, index) => (
            <Link href={article.link} key={index}>
              <div className="p-5 space-y-5 transition rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2">
                <div className="relative w-full h-40 bg-gray-400 rounded-lg">
                  <Image
                    priority
                    src={article.thumbnail}
                    className="rounded-lg"
                    fill
                    style={{ objectFit: "contain" }}
                    alt={article.title}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-400">
                    {article.title}
                  </h3>
                  <h2 className="text-2xl font-bold">{}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guides;
