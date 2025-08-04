import NewsCard from "./NewsCard";
import { getAllNews } from "@/lib/news.actions";

type newsType = {
    _id: string;
    title: string;
    imageUrl: string;
    badge: string;
    sourceUrl: string;
    createdAt: string;
    updatedAt: string;
}[]

export default async function Cards() {

   const allNews: newsType = await getAllNews();

   if (allNews.length === 0) return <div className="text-center text-2xl font-bold text-gray-600">No updates yet — stay tuned!</div>;

   return (
      <>
         {allNews.map((item, index) => (
            <NewsCard title={item.title} badge={item.badge} imgSrc={item.imageUrl} link={item.sourceUrl} key={index} />
         ))}
      </>
   )
}
