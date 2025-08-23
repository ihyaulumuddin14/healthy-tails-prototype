'use client'

import { showErrorToast } from '@/helpers/toastHelper'
import React, { useEffect, useState } from 'react'

export default function ReportPage({
   params
}: {
   params: Promise<{ id: string }>
}) {
   const [isLoading, setIsLoading] = useState(true);
   const [petId, setPetId] = useState<string | null>(null)
   
   useEffect(() => {
      const fetchData = async () => {
         const { id } = await params;

         setPetId(id);
         setIsLoading(false)
      }

      fetchData();
   }, [])

   return (
      <>
         {isLoading && <div>Loading...</div>}
         {petId && <div>Report Page {petId}</div>}
      </>
   )
}
