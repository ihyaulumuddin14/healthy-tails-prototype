'use client'

import { createNews, deleteNews, editNews, getNewsById } from "@/api/news.actions";
import { NewsCredentials } from "@/schema/NewsSchema";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { showErrorToast, showSuccessToast } from "./toastHelper";

type Props = {
   type: 'getNewsById' | 'createNews' | 'editNews' | 'deleteNews'
   data?: { id: string } | NewsCredentials | { id: string, news: NewsCredentials }
   router?: AppRouterInstance;
}

export default async function handleNewsResponse({ type, data, router }: Props) {
   let response;

   switch (type) {
      case 'getNewsById':
         response = await getNewsById(data as { id: string });
         break;
      case 'createNews':
         response = await createNews(data as NewsCredentials);
         break;
      case 'editNews':
         response = await editNews(data as { id: string, news: NewsCredentials });
         break;
      case 'deleteNews':
         response = await deleteNews(data as { id: string });
         break;
      default:
         break;
   }

   if (response) {
      if (response.success) {
         const fallbackMap: Record<string, () => void> = {
            'getNewsById': () => { },
            'createNews': () => {
               showSuccessToast(response.message as string);
               router?.refresh();
            },
            'editNews': () => {
               showSuccessToast(response.message as string);
               router?.refresh();
            },
            'deleteNews': () => {
               showSuccessToast(response.message as string);
               router?.refresh();
            },
         }

         const doRedirect = fallbackMap[type];
         if (doRedirect) doRedirect();
      } else {
         showErrorToast(response.error as string);
      }
   } else {
      return
   }
}