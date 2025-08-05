import axios from "axios";

function newAbortSignal(timeoutMs: number) {
   const abortController = new AbortController();
   setTimeout(() => abortController.abort(), timeoutMs || 0);
   return abortController.signal;
}

export async function getAllNews() {
   try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news`, {
         signal: newAbortSignal(5000),
      });
      return data.news;
   } catch {
      return []
   }
}