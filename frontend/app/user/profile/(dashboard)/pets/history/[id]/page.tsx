'use client'

import { getHistoryOfPet, getPetById } from '@/api/pet.actions';
import DashboardContent from '@/components/ui/DashboardContent';
import { showErrorToast } from '@/helpers/toastHelper';
import { userStore } from '@/stores/userStore';
import React, { useEffect, useMemo, useState } from 'react'
import { type History } from '@/type/type';
import { Button } from '@/components/ui/button';
import SkeletonHistory from './SkeletonHistory';
import VisitHistoryAlert from './components/VisitHistoryAlert';

export default function HistoryPage({
   params
}: {
   params: Promise<{ id: string }>
}) {
   const [isLoading, setIsLoading] = useState(true);
   const [isError, setIsError] = useState(false);
   const [sortByDesc, setSortByDesc] = useState(true);
   const histories = userStore((state) => state.histories);
   const setHistories = userStore((state) => state.setHistories);
   const [petName, setPetName] = useState('');
   const [historyAlert, setHistoryAlert] = useState<History>({} as History);
   const [isAlertOpen, setIsAlertOpen] = useState(false);
   
   useEffect(() => {
      const fetchHistory = async () => {
         const { id } = await params;
         const historyData = await getHistoryOfPet({ id });
         const petData = await getPetById({ id });
         
         if (historyData.success && petData.success) {
            setHistories(historyData.histories);
            setPetName(petData.pet.name);
         } else {
            showErrorToast(historyData.error as string);
            setIsError(true);
         }
         
         setIsLoading(false);
      }

      fetchHistory();

      return () => setHistories(null);
   }, [])
   
   useEffect(() => {
      console.log(historyAlert);
      console.log(isAlertOpen)
   }, [historyAlert, isAlertOpen])

   const sortedHistories: History[] = useMemo(() => {
      const historiesRaw = (histories as History[]) ?? [];
      const sortedHistories = historiesRaw.sort((a, b) => {
         if (sortByDesc) {
            return (a.visitDate > b.visitDate) ? -1 : (a.visitDate < b.visitDate) ? 1 : 0;
         } else {
            return (a.visitDate < b.visitDate) ? -1 : (a.visitDate > b.visitDate) ? 1 : 0;
         }
      });
      return sortedHistories
   }, [sortByDesc, histories]);

   return ( 
      <DashboardContent title={`Visit History of ${petName}`} subtitle='Here you can view a complete record of your pet’s veterinary visits, including diagnoses, treatments, and follow-up care.'>
         {isLoading && <SkeletonHistory></SkeletonHistory>}
         {isError && <div className="text-center text-2xl font-bold text-gray-600">Failed to load</div>}
         {sortedHistories.length > 0 ? (
            <section className='w-full h-fit rounded-2xl overflow-hidden border-2 border-border'>
               <div className='w-full h-fit relative overflow-x-auto'>
                  <table className='w-full text-sm text-left'>
                     <thead>
                        <tr className='text-xs text-[var(--color-muted-foreground)] border-b-2 border-border bg-muted'>
                           <th scope='col' className='px-6 py-4 whitespace-nowrap flex gap-1 items-center cursor-pointer' onClick={() => setSortByDesc(!sortByDesc)}>
                              Date
                              {sortByDesc ? (
                                 <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v13m0-13 4 4m-4-4-4 4"/>
                                 </svg>
                              ) : (
                                 <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v13m0-13 4 4m-4-4-4 4"/>
                                 </svg>
                              )}
                           </th>
                           <th scope='col' className='px-6 py-4 whitespace-nowrap'>Pet</th>
                           <th scope='col' className='px-6 py-4 whitespace-nowrap'>Weight (kg)</th>
                           <th scope='col' className='px-6 py-4 whitespace-nowrap'>Diagnosis</th>
                           <th scope='col' className='px-6 py-4 whitespace-nowrap'>Treatments</th>
                           <th scope='col' className='px-6 py-4 whitespace-nowrap'>Next Visit</th>
                           <th></th>
                        </tr>
                     </thead>
                     <tbody>
                        {sortedHistories?.map((history, index) => (
                           <tr key={index} className='hover:bg-[var(--color-muted)]'>
                              <td className='px-6 py-4'>{new Date(history.visitDate).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'})}</td>
                              <td className='px-6 py-4'>{history.pet.name}</td>
                              <td className='px-6 py-6 flex justify-between items-center'>
                                 <div>
                                    {history.bodyWeight}
                                    {sortByDesc && index !== histories!.length - 1 && (
                                       history.bodyWeight - sortedHistories[index + 1].bodyWeight > 0 ? (
                                          <span className='flex gap-1 text-xs text-[var(--color-tertiary)]'>
                                             <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" style={{fill: 'var(--color-tertiary)'}}><path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z"></path></svg>
                                             {(history.bodyWeight - sortedHistories[index + 1].bodyWeight).toPrecision(1)} kg
                                          </span>
                                          ) : (
                                             <span className='flex gap-1 text-xs text-[var(--color-destructive)]'>
                                             <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" style={{fill: 'var(--color-destructive)'}}><path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path></svg>
                                             {(sortedHistories[index + 1].bodyWeight - history.bodyWeight).toPrecision(1)} kg
                                          </span>
                                       )
                                       )}
                                 </div>
                              </td>
                              <td className='px-6 py-4'>{history.diagnosis || "-"}</td>
                              <td className='px-6 py-4'>{history.treatments || "-"}</td>
                              <td className='px-6 py-4'>{history.nextVisitDate ? new Date(history.nextVisitDate).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'}) : "-"}</td>
                              <td className='px-6 py-4'>
                                 <Button variant={"secondary"} onClick={() => {
                                    setHistoryAlert(history);
                                    setIsAlertOpen(true);
                                 }}>
                                    Details
                                 </Button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </section>
         ) : (
            !isLoading && <div className="text-center text-2xl font-bold text-gray-600">No History Found</div>
         )}
         <VisitHistoryAlert history={historyAlert} setHistoryAlert={setHistoryAlert} isAlertOpen={isAlertOpen} setIsAlertOpen={setIsAlertOpen} />
      </DashboardContent>
   )
}
