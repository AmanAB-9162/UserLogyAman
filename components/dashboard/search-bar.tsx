"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { searchData } from "@/lib/api/search"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length < 2) {
        setResults([])
        return
      }

      setIsSearching(true)
      try {
        const data = await searchData(query, "all")
        setResults(data.slice(0, 5)) // Show only top 5 results
      } catch (error) {
        console.error("Search error:", error)
      } finally {
        setIsSearching(false)
      }
    }

    const debounce = setTimeout(() => {
      fetchResults()
    }, 300)

    return () => clearTimeout(debounce)
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setShowResults(false)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
  }

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <form onSubmit={handleSearch} className="flex w-full">
        <Input
          type="text"
          placeholder="Search for cities, cryptocurrencies, or news..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowResults(true)
          }}
          onFocus={() => setShowResults(true)}
          className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 border-r-0"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-16 top-0 h-10"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
        <Button type="submit" className="rounded-l-none">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>

      {showResults && query.trim().length >= 2 && (
        <Card className="absolute z-50 w-full mt-1 max-h-80 overflow-auto">
          <CardContent className="p-2">
            {isSearching ? (
              <div className="p-4 text-center text-sm text-muted-foreground">Searching...</div>
            ) : results.length > 0 ? (
              <div className="divide-y">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={result.url}
                    onClick={() => setShowResults(false)}
                    className="block p-2 hover:bg-accent rounded-md"
                  >
                    <div className="font-medium">{result.title}</div>
                    <div className="text-sm text-muted-foreground">{result.subtitle}</div>
                  </Link>
                ))}
                <div className="p-2 text-center">
                  <Button
                    variant="link"
                    onClick={(e) => {
                      e.preventDefault()
                      router.push(`/search?q=${encodeURIComponent(query)}`)
                      setShowResults(false)
                    }}
                  >
                    See all results
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">No results found</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

