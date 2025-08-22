import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { useReducer } from "react";

type FilterState = {
   petKinds: string[]
   date: Date | null
   statuses: string[]
}

type Action = 
   { type: "TOGGLE_PET_KIND", payload: string } |
   { type: "SET_DATE", payload: Date | null } |
   { type: "TOGGLE_STATUS", payload: string }

export default function QueueTable() {
   const filterReducer = (state: FilterState, action: Action) => {
      switch (action.type) {
         case "TOGGLE_PET_KIND":
            const petKinds = state.petKinds.includes(action.payload) ?
               state.petKinds.filter(petKind => petKind !== action.payload) :
               [...state.petKinds, action.payload];
            return {...state, petKinds};
         case "SET_DATE":
            return {...state, date: action.payload};
         case "TOGGLE_STATUS":
            const statuses = state.statuses.includes(action.payload) ?
               state.statuses.filter(status => status !== action.payload) :
               [...state.statuses, action.payload];
            return {...state, statuses};
         default:
            return state
      }
   }

   const [filters, dispatch] = useReducer(filterReducer, {
      petKinds: ["dog", "cat"],
      date: null,
      statuses: ["waiting", "in_progress", "completed", "cancelled"]
   })

   return (
      <div className="w-full h-fit flex flex-col">
         <nav className="w-full flex items-center gap-5 self-start p-0 py-5 justify-between mb-5 border-b-2 border-border">
            <div className="w-full flex md:flex-row flex-col items-center gap-5">
               {/* search input */}
               <div className="relative w-full max-w-[300px] flex self-start">
                  <label htmlFor="search" className="text-[var(--color-muted-foreground)] absolute top-1/2 -translate-y-1/2 left-4">
                     <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                     </svg>
                  </label>
                  <input id="search" type="text" className="w-full px-3 py-2 pl-13 outline-0 bg-[var(--color-foreground)]/10 rounded-4xl focus:rounded-none transition-all duration-400 ease-in-out peer font-extralight" placeholder="Pet's name"/>
                  <div className="peer-focus:w-full w-0 h-0 border-t-2 border-[var(--color-accent)] absolute bottom-0 origin-center transition-all duration-400 ease-in-out"></div>
               </div>

               <div className="w-full flex flex-wrap items-center gap-2">
                  {/* pet type filter */}
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button variant={"secondary"}>
                           Pet Type
                           <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "var(--color-foreground)"}}><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent className="w-20 border-[var(--color-muted)]">
                        <DropdownMenuLabel>Type</DropdownMenuLabel>
                        <DropdownMenuCheckboxItem checked={filters.petKinds.includes("dog")} onClick={() => dispatch({ type: "TOGGLE_PET_KIND", payload: "dog"})}>Dog</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={filters.petKinds.includes("cat")} onClick={() => dispatch({ type: "TOGGLE_PET_KIND", payload: "cat"})}>Cat</DropdownMenuCheckboxItem>
                     </DropdownMenuContent>
                  </DropdownMenu>

                  {/* status filter */}
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button variant={"secondary"}>
                           Status
                           <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "var(--color-foreground)"}}><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent className="w-45 border-[var(--color-muted)]">
                        <DropdownMenuLabel>Status</DropdownMenuLabel>
                        <DropdownMenuCheckboxItem checked={filters.statuses.includes("waiting")} onClick={() => dispatch({ type: "TOGGLE_STATUS", payload: "waiting"})}>WAITING</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={filters.statuses.includes("in_progress")} onClick={() => dispatch({ type: "TOGGLE_STATUS", payload: "in_progress"})}>IN_PROGRESS</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={filters.statuses.includes("completed")} onClick={() => dispatch({ type: "TOGGLE_STATUS", payload: "completed"})}>COMPLETED</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={filters.statuses.includes("cancelled")} onClick={() => dispatch({ type: "TOGGLE_STATUS", payload: "cancelled"})}>CANCELLED</DropdownMenuCheckboxItem>
                     </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button variant={"secondary"}>
                           Date
                           <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "var(--color-foreground)"}}><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent>
                        <Calendar
                           mode="single"
                           captionLayout="dropdown"
                           onSelect={(date) => {
                              dispatch({type: "SET_DATE", payload: date as Date})
                           }}
                        />
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </div>
         </nav>

         <h1 className="text-lg font-semibold mb-3">Today`s Queue</h1>
         <Table />
      </div>
   )
}

function Table () {
   return (
      <div className='w-full h-fit relative overflow-x-auto'>
         <table className='w-full text-sm text-left rounded-xl overflow-hidden'>
            <thead>
               <tr className='text-xs text-[var(--color-muted-foreground)] border-b-2 border-border bg-muted'>
                  <th scope='col' className='px-6 py-4 whitespace-nowrap'>Queue</th>
                  <th scope='col' className='px-6 py-4 whitespace-nowrap'>Pet`s Name</th>
                  <th scope='col' className='px-6 py-4 whitespace-nowrap'>Pet`s Type</th>
                  <th scope='col' className='px-6 py-4 whitespace-nowrap'>Date</th>
                  <th scope='col' className='px-6 py-4 whitespace-nowrap'>Status</th>
                  <th scope='col' className='px-6 py-4 whitespace-nowrap'>Service Type</th>
                  <th></th>
               </tr>
            </thead>
            {/* <tbody>
               {bookings.map((booking, index) => (
                  <tr key={index} className='hover:bg-[var(--color-muted)]'>
                     <td className='px-6 py-4 whitespace-nowrap'>{booking.queueNumber}</td>
                     <td className='px-6 py-4 whitespace-nowrap'>{booking.pet.name}</td>
                     <td className='px-6 py-4 whitespace-nowrap'>
                        {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "N/A"}<br />
                     </td>
                     <td className='px-6 py-4 whitespace-nowrap'>
                        <Badge
                           variant={
                              booking.status === "CANCELLED" ? "destructive" :
                              booking.status === "COMPLETED" ? "default" :
                              booking.status === "WAITING" ? "waiting" :
                              booking.status === "IN_PROGRESS" ? "inProgress" : null
                           }
                           className="self-end">
                              {booking.status}
                        </Badge>
                     </td>
                     <td className='px-6 py-4 whitespace-nowrap'>{booking.service.name}</td>
                     <td className='px-6 py-4 flex gap-3'>
                        <Button variant={"secondary"} onClick={() => {
                           goPush(`/user/profile/appointments/booking/${booking._id}`)
                        }}>Details</Button>
                        <Button variant={"default"} disabled={booking.status !== "COMPLETED"}>Visit Result</Button>
                     </td>
                  </tr>
               ))}
            </tbody> */}
         </table>
      </div>

   )
}