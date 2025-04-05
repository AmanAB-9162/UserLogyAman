"use client"

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Bar,
  ComposedChart,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface CryptoChartProps {
  data: Array<{
    date: string
    price: number
  }>
}

export function CryptoChart({ data }: CryptoChartProps) {
  const [chartType, setChartType] = useState<"area" | "composed">("area")

  // Enhance data with volume for more interactive chart
  const enhancedData = data.map((item) => ({
    ...item,
    volume: Math.floor(Math.random() * 1000000) + 500000,
    ma7: item.price * (0.95 + Math.random() * 0.1), // 7-day moving average simulation
  }))

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-end mb-2 space-x-2">
        <Button variant={chartType === "area" ? "default" : "outline"} size="sm" onClick={() => setChartType("area")}>
          Area
        </Button>
        <Button
          variant={chartType === "composed" ? "default" : "outline"}
          size="sm"
          onClick={() => setChartType("composed")}
        >
          Price + Volume
        </Button>
      </div>

      <div className="flex-1">
        <ChartContainer
          config={{
            price: {
              label: "Price (USD)",
              color: "hsl(var(--chart-1))",
            },
            ma7: {
              label: "7-Day MA",
              color: "hsl(var(--chart-2))",
            },
            volume: {
              label: "Volume",
              color: "hsl(var(--chart-4))",
            },
          }}
          className="h-full w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart
                data={enhancedData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorMA7" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
                  }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  domain={["auto", "auto"]}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                />
                <Area
                  type="monotone"
                  dataKey="ma7"
                  stroke="hsl(var(--chart-2))"
                  fillOpacity={0.5}
                  fill="url(#colorMA7)"
                />
              </AreaChart>
            ) : (
              <ComposedChart
                data={enhancedData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
                  }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  domain={["auto", "auto"]}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                  yAxisId="left"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  orientation="right"
                  domain={["auto", "auto"]}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  yAxisId="right"
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.3}
                  yAxisId="left"
                />
                <Bar dataKey="volume" fill="hsl(var(--chart-4))" yAxisId="right" />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}

