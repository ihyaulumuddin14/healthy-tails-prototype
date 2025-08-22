"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
   ChartConfig,
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An area chart with gradient fill"

const chartData = [
   { month: "January", mobile: 80 },
   { month: "February", mobile: 200 },
   { month: "March", mobile: 120 },
   { month: "April", mobile: 190 },
   { month: "May", mobile: 130 },
   { month: "June", mobile: 140 },
]

const chartConfig = {
   mobile: {
      label: "Mobile",
      color: "var(--chart-2)",
   },
} satisfies ChartConfig

export default function AreaChartDashboard({ className }: { className?: string }) {
   return (
      <ChartContainer config={chartConfig} className={className}>
         <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
               top: 12,
               left: 12,
               right: 12,
            }}
         >
            <CartesianGrid vertical={false} />
            <XAxis
               dataKey="month"
               tickLine={false}
               axisLine={false}
               tickMargin={8}
               tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
               <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop
                     offset="5%"
                     stopColor="var(--color-mobile)"
                     stopOpacity={0.8}
                  />
                  <stop
                     offset="95%"
                     stopColor="var(--color-mobile)"
                     stopOpacity={0.1}
                  />
               </linearGradient>
            </defs>
            <Area
               dataKey="mobile"
               type="natural"
               fill="url(#fillMobile)"
               fillOpacity={0.4}
               stroke="var(--color-mobile)"
               stackId="a"
            />
         </AreaChart>
      </ChartContainer>
   )
}
