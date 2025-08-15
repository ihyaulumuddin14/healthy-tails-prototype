import NewsCard from "./NewsCard";
import api from "@/lib/axiosInstance";
import appStore from "@/stores/appStore";
import useSWR from "swr";
import SkeletonCard from "./SkeletonCard";
import { showErrorToast } from "@/helpers/toastHelper";

const fetcher = (url: string) => api.get(url).then(res => res.data);

export default function Cards() {
   const news = appStore(state => state.news);
   const setNews = appStore(state => state.setNews);

   const shouldFetch = !news;

   const { data, error, isLoading } = useSWR(
      shouldFetch ? '/news/' : null,
      fetcher,
      {
         revalidateOnFocus: false,
         revalidateOnReconnect: true,
         revalidateOnMount: true,
         keepPreviousData: true,
         shouldRetryOnError: false,
         onError: (err) => showErrorToast(err.message)
      }
   )

   if (data && !news) setNews(data.news);

   if (isLoading) {
      return (
         [...Array(5)].map((_, index) => (
            <SkeletonCard key={index} />
         ))
      )
   }

   if (error) {
      return <div className="text-center text-2xl font-bold text-gray-600">Failed to load</div>
   }

   if (news?.length === 0) return <div className="text-center text-2xl font-bold text-gray-600">No updates yet — stay tuned!</div>;

   return (
      <>
         {news?.map((item, index) => (
            <NewsCard title={item.title} badge={item.badge} imgSrc={item.imageUrl} link={item.sourceUrl} key={index} />
         ))}
      </>
   )
}
