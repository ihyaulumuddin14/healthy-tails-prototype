import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonHistory() {
   return (
      <section className='w-full h-fit rounded-2xl overflow-hidden border-2 border-border'>
         <div className='w-full h-fit relative overflow-x-auto'>
            <table className='w-full text-sm text-left'>
               <thead>
                  <tr className='text-xs text-[var(--color-muted-foreground)] border-b-2 border-border bg-muted'>
                     <th scope='col' className='px-6 py-4 whitespace-nowrap flex gap-1 items-center cursor-pointer'>
                        Date
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 20V7m0 13-4-4m4 4 4-4m4-12v13m0-13 4 4m-4-4-4 4"/>
                        </svg>
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
                  {[...Array(5)].map((history, index) => (
                     <tr key={index} className='hover:bg-[var(--color-muted)]'>
                        <td className='px-6 py-4'><Skeleton className="w-[100px] h-[30px]"/></td>
                        <td className='px-6 py-4'><Skeleton className="w-[60px] h-[30px]"/></td>
                        <td className='px-6 py-4 flex justify-between items-center'><Skeleton className="w-[50px] h-[30px]"/></td>
                        <td className='px-6 py-4'><Skeleton className="w-[100px] h-[30px]"/></td>
                        <td className='px-6 py-4'><Skeleton className="w-[150px] h-[30px]"/></td>
                        <td className='px-6 py-4'><Skeleton className="w-[100px] h-[30px]"/></td>
                        <td className='px-6 py-4'><Skeleton className="w-[75px] h-[30px]"/></td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>
   )
}
