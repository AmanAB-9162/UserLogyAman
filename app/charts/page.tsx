"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Scatter,
  ScatterChart,
  ZAxis,
} from "recharts"

export default function ChartsPage() {
  const [activeTab, setActiveTab] = useState("weather")

  // Weather data for multiple cities
  const weatherData = [
    { name: "Delhi", temperature: 32, humidity: 55, rainfall: 0 },
    { name: "Mumbai", temperature: 29, humidity: 78, rainfall: 2.5 },
    { name: "Bangalore", temperature: 24, humidity: 65, rainfall: 1.2 },
    { name: "Chennai", temperature: 31, humidity: 72, rainfall: 0.8 },
    { name: "Kolkata", temperature: 30, humidity: 70, rainfall: 1.5 },
    { name: "Hyderabad", temperature: 28, humidity: 60, rainfall: 0.3 },
    { name: "Jaipur", temperature: 33, humidity: 45, rainfall: 0 },
    { name: "Pune", temperature: 26, humidity: 62, rainfall: 0.5 },
  ]

  // Crypto market data
  const cryptoData = [
    { name: "Bitcoin", value: 45, marketCap: 900, price: 51000 },
    { name: "Ethereum", value: 25, marketCap: 350, price: 3200 },
    { name: "Solana", value: 10, marketCap: 40, price: 110 },
    { name: "Cardano", value: 8, marketCap: 30, price: 0.9 },
    { name: "Polkadot", value: 7, marketCap: 25, price: 22 },
    { name: "Avalanche", value: 5, marketCap: 20, price: 60 },
  ]

  // Historical weather data
  const historicalWeather = [
    { month: "Jan", delhi: 20, mumbai: 28, bangalore: 22 },
    { month: "Feb", delhi: 22, mumbai: 29, bangalore: 24 },
    { month: "Mar", delhi: 28, mumbai: 30, bangalore: 26 },
    { month: "Apr", delhi: 32, mumbai: 32, bangalore: 28 },
    { month: "May", delhi: 36, mumbai: 33, bangalore: 29 },
    { month: "Jun", delhi: 38, mumbai: 31, bangalore: 27 },
    { month: "Jul", delhi: 34, mumbai: 29, bangalore: 25 },
    { month: "Aug", delhi: 33, mumbai: 28, bangalore: 24 },
    { month: "Sep", delhi: 32, mumbai: 29, bangalore: 25 },
    { month: "Oct", delhi: 30, mumbai: 31, bangalore: 24 },
    { month: "Nov", delhi: 26, mumbai: 30, bangalore: 23 },
    { month: "Dec", delhi: 22, mumbai: 29, bangalore: 22 },
  ]

  // Crypto correlation data
  const correlationData = [
    { x: 4000, y: 2400, z: 2400 },
    { x: 3000, y: 1398, z: 2210 },
    { x: 2000, y: 9800, z: 2290 },
    { x: 2780, y: 3908, z: 2000 },
    { x: 1890, y: 4800, z: 2181 },
    { x: 2390, y: 3800, z: 2500 },
    { x: 3490, y: 4300, z: 2100 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Interactive Analytics Dashboard</h1>

      <Tabs defaultValue="weather" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="weather">Weather Analytics</TabsTrigger>
          <TabsTrigger value="crypto">Crypto Analytics</TabsTrigger>
          <TabsTrigger value="combined">Combined Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="weather">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Temperature Comparison</CardTitle>
                <CardDescription>Current temperature across major Indian cities</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weatherData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}°C`} />
                    <Tooltip formatter={(value) => [`${value}°C`, "Temperature"]} />
                    <Legend />
                    <Bar dataKey="temperature" fill="hsl(var(--chart-1))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Humidity & Rainfall</CardTitle>
                <CardDescription>Current humidity and rainfall across cities</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={weatherData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" tickFormatter={(value) => `${value}%`} />
                    <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}mm`} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="humidity" fill="hsl(var(--chart-2))" yAxisId="left" />
                    <Line type="monotone" dataKey="rainfall" stroke="hsl(var(--chart-3))" yAxisId="right" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Historical Temperature Trends</CardTitle>
                <CardDescription>Monthly average temperatures for major cities</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalWeather}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value}°C`} />
                    <Tooltip formatter={(value) => [`${value}°C`, "Temperature"]} />
                    <Legend />
                    <Line type="monotone" dataKey="delhi" stroke="hsl(var(--chart-1))" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="mumbai" stroke="hsl(var(--chart-2))" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="bangalore" stroke="hsl(var(--chart-3))" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="crypto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Share</CardTitle>
                <CardDescription>Cryptocurrency market distribution</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cryptoData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {cryptoData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Market Share"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Cap Comparison</CardTitle>
                <CardDescription>Market capitalization in billions USD</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cryptoData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}B`} />
                    <Tooltip formatter={(value) => [`$${value}B`, "Market Cap"]} />
                    <Legend />
                    <Bar dataKey="marketCap" fill="hsl(var(--chart-4))">
                      {cryptoData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Price Correlation Analysis</CardTitle>
                <CardDescription>Relationship between different market factors</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis type="number" dataKey="x" name="Market Cap" unit="M" />
                    <YAxis type="number" dataKey="y" name="Price" unit="$" />
                    <ZAxis type="number" dataKey="z" range={[60, 400]} name="Volume" unit="M" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Legend />
                    <Scatter name="Crypto Assets" data={correlationData} fill="hsl(var(--chart-5))" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="combined">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Weather Impact on Crypto Trading Volume</CardTitle>
                <CardDescription>Correlation between weather conditions and trading activity</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={[
                      { month: "Jan", temperature: 20, volume: 1200 },
                      { month: "Feb", temperature: 22, volume: 1300 },
                      { month: "Mar", temperature: 28, volume: 1400 },
                      { month: "Apr", temperature: 32, volume: 1100 },
                      { month: "May", temperature: 36, volume: 900 },
                      { month: "Jun", temperature: 38, volume: 800 },
                      { month: "Jul", temperature: 34, volume: 1000 },
                      { month: "Aug", temperature: 33, volume: 1100 },
                      { month: "Sep", temperature: 32, volume: 1300 },
                      { month: "Oct", temperature: 30, volume: 1500 },
                      { month: "Nov", temperature: 26, volume: 1400 },
                      { month: "Dec", temperature: 22, volume: 1300 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" tickFormatter={(value) => `${value}°C`} />
                    <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}M`} />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="temperature"
                      fill="hsl(var(--chart-1))"
                      stroke="hsl(var(--chart-1))"
                      yAxisId="left"
                    />
                    <Bar dataKey="volume" fill="hsl(var(--chart-4))" yAxisId="right" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seasonal Crypto Performance</CardTitle>
                <CardDescription>Price trends across different seasons</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      { season: "Winter", bitcoin: 45000, ethereum: 3200 },
                      { season: "Spring", bitcoin: 48000, ethereum: 3400 },
                      { season: "Summer", bitcoin: 42000, ethereum: 2800 },
                      { season: "Fall", bitcoin: 52000, ethereum: 3600 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="season" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="bitcoin"
                      stackId="1"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="ethereum"
                      stackId="2"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Market Activity</CardTitle>
                <CardDescription>Trading volume by region and weather</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { region: "North", volume: 1200, rainfall: 2.5 },
                      { region: "South", volume: 1800, rainfall: 8.2 },
                      { region: "East", volume: 1400, rainfall: 5.1 },
                      { region: "West", volume: 1600, rainfall: 3.8 },
                      { region: "Central", volume: 1100, rainfall: 1.2 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="region" />
                    <YAxis yAxisId="left" tickFormatter={(value) => `${value}M`} />
                    <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}mm`} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="volume" fill="hsl(var(--chart-5))" yAxisId="left" />
                    <Line type="monotone" dataKey="rainfall" stroke="hsl(var(--chart-3))" yAxisId="right" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

