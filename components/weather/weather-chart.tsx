"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

interface WeatherChartProps {
  data: Array<{
    date: string
    temperature: number
    conditions: string
  }>
}

export function WeatherChart({ data }: WeatherChartProps) {
  // Add humidity data for more interactive chart
  const enhancedData = data.map((item) => ({
    ...item,
    humidity: Math.floor(Math.random() * 20) + 60, // 60-80%
    rainfall: item.conditions.toLowerCase().includes("rain") ? Math.random() * 10 : 0,
  }))

  return (
    <ChartContainer
      config={{
        temperature: {
          label: "Temperature (°C)",
          color: "hsl(var(--chart-1))",
        },
        humidity: {
          label: "Humidity (%)",
          color: "hsl(var(--chart-2))",
        },
        rainfall: {
          label: "Rainfall (mm)",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
              return date.toLocaleDateString(undefined, { weekday: "short" })
            }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            domain={["auto", "auto"]}
            tickFormatter={(value) => `${value}°C`}
            yAxisId="left"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            orientation="right"
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            yAxisId="right"
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="temperature"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            dot={{ r: 4 }}
            yAxisId="left"
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            dot={{ r: 4 }}
            yAxisId="right"
          />
          <Line
            type="monotone"
            dataKey="rainfall"
            stroke="hsl(var(--chart-3))"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            dot={{ r: 4 }}
            yAxisId="left"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

