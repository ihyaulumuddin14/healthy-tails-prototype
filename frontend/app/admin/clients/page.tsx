'use client'

import { User } from "@/type/type"
import { useMemo, useState } from "react"
import { useAllUsers } from "@/hooks/useAllUsers"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SkeletonClient from "./components/SkeletonClient";
import { deleteUserById } from "@/api/user.actions";
import { showSuccessToast } from "@/helpers/toastHelper";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertConfirmation } from "@/components/ui/AlertConfirmation";

export default function AdminClientPage() {
   const { users, error, isLoading } = useAllUsers();
   const [searchTerm, setSearchTerm] = useState('');
   const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
   const { mutateUsers } = useAllUsers();

   const filteredUsers = useMemo(() => {
      return users?.filter((user) => 
         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
   }, [searchTerm, users])

   const handleDeleteUser = async () => {
      if (!userIdToDelete) return;
      const result = await deleteUserById({ _id: userIdToDelete });

      if (result.success) {
         mutateUsers();
         showSuccessToast(result.message as string);
      } else {
         showSuccessToast(result.error as string);
      }

      setUserIdToDelete(null);
   }

   return (
      <div className="w-full h-fit flex flex-col">
         <AlertDialog>
            <nav className="w-full flex items-center gap-5 self-start p-[min(6vw,40px)] justify-between mb-5 sm:mb-0 border-b-2 border-border">
               <div className="w-full flex md:flex-row flex-col items-center gap-5">
                  {/* search input */}
                  <div className="relative w-full max-w-[300px] flex self-start">
                     <label htmlFor="search" className="text-[var(--color-muted-foreground)] absolute top-1/2 -translate-y-1/2 left-4">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                           <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                        </svg>
                     </label>
                     <input id="search" type="text" className="w-full px-3 py-2 pl-13 outline-0 bg-[var(--color-foreground)]/10 rounded-4xl focus:rounded-none transition-all duration-400 ease-in-out peer font-extralight" placeholder="Search Name or Email" onChange={(e) => setSearchTerm(e.target.value)}/>
                     <div className="peer-focus:w-full w-0 h-0 border-t-2 border-[var(--color-accent)] absolute bottom-0 origin-center transition-all duration-400 ease-in-out"></div>
                  </div>
               </div>
            </nav>
            {isLoading && <SkeletonClient />}
            {error && <div className="text-center text-2xl font-bold text-gray-600">Failed to load</div>}
            {users && <Table clients={filteredUsers} setUserIdToDelete={setUserIdToDelete}/>}

            <AlertConfirmation heading="Delete User" description="Are you sure you want to delete this user?" submitLabel="Delete" onSubmit={handleDeleteUser}/>
         </AlertDialog>
      </div>
   )
}

function Table ({ clients, setUserIdToDelete }: { clients: User[], setUserIdToDelete: React.Dispatch<React.SetStateAction<string | null>> }) {
   const [sortByAsc, setSortByAsc] = useState(true)

   const sortClients: User[] = useMemo(() => {
      let result = clients ?? []

      if (sortByAsc) {
         result = result.sort((a, b) => a.name.localeCompare(b.name))
      } else {
         result = result.sort((a, b) => b.name.localeCompare(a.name))
      }

      return result;
   }, [clients, sortByAsc])

   return (
      <div className='w-full h-fit relative overflow-x-auto p-0 sm:p-[min(6vw,40px)]'>
         <table className='w-full text-sm text-left rounded-xl overflow-hidden'>
            <thead>
               <tr className='text-xs text-[var(--color-muted-foreground)] border-b-2 border-border bg-muted'>
                  <th scope='col' className='px-6 py-4 whitespace-nowrap flex items-center cursor-pointer' onClick={() => setSortByAsc(!sortByAsc)}>
                     Name
                     <svg className={`w-5 h-5 ${sortByAsc ? 'rotate-0' : 'rotate-180'} transition-all ease-in-out duration-200`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v13m0-13 4 4m-4-4-4 4"/>
                     </svg>
                  </th>
                  <th scope='col' className='px-6 py-4 whitespace-nowrap'>Email</th>
                  <th scope='col' className='px-6 py-4 whitespace-nowrap'>Status</th>
                  <th scope='col' className='px-6 py-4 whitespace-nowrap'>Roles</th>
                  <th scope='col' className='px-6 py-4 whitespace-nowrap'>Option</th>
               </tr>
            </thead>
            <tbody>
               {sortClients.map((client, index) => (
                  <tr key={index} className='hover:bg-[var(--color-muted)]'>
                     <td className='px-6 py-4 whitespace-nowrap'>{client.name}</td>
                     <td className='px-6 py-4 whitespace-nowrap'>{client.email}</td>
                     <td className='px-6 py-4 whitespace-nowrap'>
                        {client.verified ? (
                           <Badge variant="default">Verified</Badge>
                        ) : (
                           <Badge variant="destructive">Not Verified</Badge>
                        )}
                     </td>
                     <td className='px-6 py-4 whitespace-nowrap'>{client.role}</td>
                     <td className='px-6 py-4 whitespace-nowrap'>
                        <AlertDialogTrigger>
                           <Button variant='destructive' className={`${client.role === "ADMIN" ? "pointer-events-none opacity-30" : ""}`} onClick={() => setUserIdToDelete(client._id)}>Delete</Button>
                        </AlertDialogTrigger>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>

   )
}