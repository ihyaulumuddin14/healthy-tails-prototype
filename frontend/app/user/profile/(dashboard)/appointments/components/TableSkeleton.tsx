import { Skeleton } from "@/components/ui/skeleton";


export default function TableSkeleton() {
   return (
      <section className='w-full h-fit rounded-2xl overflow-hidden border-2 border-border'>
         <div className='w-full h-fit relative overflow-x-auto'>
            <table className='w-full text-sm text-left'>
               <thead>
                  <tr className='text-xs text-[var(--color-muted-foreground)] border-b-2 border-border bg-muted'>
                     <th scope='col' className='px-6 py-4 whitespace-nowrap'>Queue</th>
                     <th scope='col' className='px-6 py-4 whitespace-nowrap'>Pet Name</th>
                     <th scope='col' className='px-6 py-4 whitespace-nowrap'>Date</th>
                     <th scope='col' className='px-6 py-4 whitespace-nowrap'>Status</th>
                     <th scope='col' className='px-6 py-4 whitespace-nowrap'>Service Type</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {[...Array(5)].map((booking, index) => (
                     <tr key={index} className='hover:bg-[var(--color-muted)]'>
                        <td className='px-6 py-4 whitespace-nowrap'><Skeleton className="w-[50px] h-[30px]"/></td>
                        <td className='px-6 py-4 whitespace-nowrap'><Skeleton className="w-[100px] h-[30px]"/></td>
                        <td className='px-6 py-4 whitespace-nowrap flex flex-col gap-3'>
                           <Skeleton className="w-[200px] h-[20px]"/>
                           <span className='text-[var(--color-muted-foreground)] text-xs'>
                              <Skeleton className="w-[100px] h-[10px]"/>
                           </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'><Skeleton className="w-[100px] h-[30px]"/></td>
                        <td className='px-6 py-4 whitespace-nowrap'><Skeleton className="w-[100px] h-[30px]"/></td>
                        <td className='px-6 py-4 flex gap-3'>
                           <Skeleton className="w-[75px] h-[30px]"/>
                           <Skeleton className="w-[100px] h-[30px]"/>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>
   )
}
