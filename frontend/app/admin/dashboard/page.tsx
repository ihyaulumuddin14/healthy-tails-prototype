'use client'

import { Switch } from "@/components/ui/switch";
import AreaChartDashboard from "./components/AreaChartDashboard";
import SummaryCard from "./components/SummaryCard";
import { useState } from "react";
import PieChartDashboard from "./components/PieChartDashboard";
import QueueTable from "./components/QueueTable";
import { useAllUsers } from "@/hooks/useAllUsers";
import { useTodaysQueue } from "./hooks/useTodaysQueue";

export default function AdminDasboard() {
   const [isShowSummary, setIsShowSummary] = useState(true);
   const { users } = useAllUsers();
   const { todaysQueue } = useTodaysQueue();

   return (
      <section className="w-full h-fit flex flex-col gap-4">
         {/* toggle show overview */}
         <span className="w-full flex justify-end">
            <label htmlFor="show-overview" className="p-2 border border-border rounded-lg bg-muted flex items-center gap-2 cursor-pointer hover:brightness-90 shadow-sm">
               <Switch className="cursor-pointer" id="show-overview" checked={isShowSummary} onCheckedChange={setIsShowSummary} />
               <p className="text-sm">Show Overview</p>
            </label>
         </span>
         
         <div className={`w-full grid grid-cols-1 ${!isShowSummary ? "grid-rows-[0fr_1fr]" : "grid-rows-[1fr_1fr]"} gap-4 transition-all ease-in-out duration-500`}>
            <div className="w-full h-full grid grid-cols-1 lg:grid-cols-4 gap-4 overflow-hidden">
               <SummaryCard title="Total Clients" subtitle="All Registered Clients">{users?.length}</SummaryCard>
               <SummaryCard title="Total Pets" subtitle="Loved Componions Registered">-</SummaryCard>
               <SummaryCard title="Today`s Queue" subtitle="Patiens in Line Today">{todaysQueue}</SummaryCard>
               <SummaryCard title="Completed Visits" subtitle="Successful Checkups">-</SummaryCard>
               <SummaryCard title="Total Visits" className="w-full h-fit flex justify-center lg:col-span-3 border">
                  <AreaChartDashboard className="h-[300px]" />
               </SummaryCard>
               <SummaryCard title="Most Popular Type of Pets">
                  <PieChartDashboard />
               </SummaryCard>
            </div>
            <QueueTable />
         </div>
      </section>
   )
}
