import { useRouter } from "next/navigation";

export function useNavigation() {
   const router = useRouter();

   const goRefresh = () => router.refresh();
   const goPush = (path: string) => router.push(path);
   const goReplace = (path: string) => router.replace(path);
   const goPrefetch = (path: string) => router.prefetch(path);

   return { goRefresh, goPush, goReplace, goPrefetch };
}