"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Cloud, CreditCard, Newspaper } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { searchData } from "@/lib/api/search"

interface SearchResultsProps {
  query: string
  type: "all" | "weather" | "crypto" | "news"
}

interface SearchResult {
  id: string
  type: "weather" | "crypto" | "news"
  title: string
  subtitle: string
  url: string
}

export function SearchResults({ query, type }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true)
        const data = await searchData(query, type)
        setResults(data)
        setError(null)
      } catch (err) {
        setError("Failed to load search results")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (query.trim()) {
      fetchResults()
    }
  }, [query, type])

  const getIcon = (resultType: string) => {
    switch (resultType) {
      case "weather":
        return <Cloud className="h-5 w-5 text-blue-500" />
      case "crypto":
        return <CreditCard className="h-5 w-5 text-indigo-500" />
      case "news":
        return <Newspaper className="h-5 w-5 text-emerald-500" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-9 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border border-red-200 bg-red-50 dark:bg-red-950/20">
        <CardContent className="pt-6">
          <p className="text-red-600 dark:text-red-400">{error}. Please try again later.</p>
        </CardContent>
      </Card>
    )
  }

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            No results found for "{query}". Try a different search term.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <Card
          key={result.id}
          className="overflow-hidden border bg-background/60 backdrop-blur-lg transition-all hover:shadow-lg"
        >
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              {getIcon(result.type)}
              <CardTitle className="text-lg">{result.title}</CardTitle>
            </div>
            <CardDescription>{result.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground capitalize">{result.type}</span>
              <Link href={result.url}>
                <Button size="sm">View Details</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

