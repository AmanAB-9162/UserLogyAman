"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchResults } from "@/components/search/search-results"
import { Search } from "lucide-react"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setIsSearching(true)
      // Simulate search delay
      setTimeout(() => {
        setIsSearching(false)
        setHasSearched(true)
      }, 1000)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border bg-background/60 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Search</CardTitle>
          <CardDescription>Search for weather, cryptocurrencies, and news</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex w-full max-w-3xl mb-6">
            <Input
              type="text"
              placeholder="Search for cities, cryptocurrencies, or news..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 border-r-0"
            />
            <Button type="submit" className="rounded-l-none" disabled={isSearching || !query.trim()}>
              {isSearching ? "Searching..." : "Search"}
              <Search className="ml-2 h-4 w-4" />
            </Button>
          </form>

          {hasSearched && (
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Results</TabsTrigger>
                <TabsTrigger value="weather">Weather</TabsTrigger>
                <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <SearchResults query={query} type="all" />
              </TabsContent>

              <TabsContent value="weather">
                <SearchResults query={query} type="weather" />
              </TabsContent>

              <TabsContent value="crypto">
                <SearchResults query={query} type="crypto" />
              </TabsContent>

              <TabsContent value="news">
                <SearchResults query={query} type="news" />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

