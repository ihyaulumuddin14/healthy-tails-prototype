import { Skeleton } from "@/components/ui/skeleton";


export default function SkeletonTableDashboard() {
   return (
      <div className='w-full h-fit relative rounded-xl overflow-x-auto shadow-sm'>
            <table className='w-full text-sm text-left overflow-hidden'>
               <thead>
                  <tr className='text-xs text-[var(--color-muted-foreground)] border-b-2 border-border bg-muted'>
                     <th scope='col' className='px-6 py-4 whitespace-nowrap'>Queue</th>
                     <th scope='col' className='px-6 py-4 whitespace-nowrap'>Owner</th>
                     <th scope='col' className='px-6 py-4 whitespace-nowrap'>Pet</th>
                     <th scope='col' className='px-6 py-4 whitespace-nowrap'>Date</th>
                     <th scope='col' className='px-6 py-4 whitespace-nowrap'>Status</th>
                     <th scope='col' className='px-6 py-4 whitespace-nowrap'>Service Type</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {[...Array(5)].map((_, index) => (
                     <tr key={index} className='hover:bg-[var(--color-muted)]'>
                        <td className='px-6 py-4 whitespace-nowrap'>
                           <Skeleton className="w-10 h-6 rounded-md" />
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                           <div className="flex items-center gap-2">
                              <Skeleton className="w-8 h-8 rounded-full" />
                              <div className="flex flex-col gap-1">
                                 <Skeleton className="w-24 h-4 rounded" />
                                 <Skeleton className="w-16 h-3 rounded" />
                              </div>
                           </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                           <div className="flex flex-col gap-1">
                              <Skeleton className="w-20 h-4 rounded" />
                              <Skeleton className="w-16 h-3 rounded" />
                           </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                           <Skeleton className="w-20 h-4 rounded" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                           <Skeleton className="w-24 h-7 rounded-full" />
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                           <Skeleton className="w-24 h-4 rounded" />
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                           <Skeleton className="w-16 h-8 rounded-md" />
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
      </div>

   )
}
