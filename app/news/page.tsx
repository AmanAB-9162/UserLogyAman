"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useDispatch, useSelector } from "react-redux"
import { fetchNews } from "@/lib/redux/slices/newsSlice"
import type { AppDispatch, RootState } from "@/lib/redux/store"

export default function AllNewsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector((state: RootState) => state.news)

  useEffect(() => {
    dispatch(fetchNews())

    // Refresh data every 5 minutes
    const interval = setInterval(() => {
      dispatch(fetchNews())
    }, 300000)

    return () => clearInterval(interval)
  }, [dispatch])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold ml-2">All News</h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : error ? (
        <Card className="border border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-400">Failed to load news data. Please try again later.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden border bg-background/60 backdrop-blur-lg transition-all hover:shadow-lg hover:scale-[1.02]"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{item.title}</CardTitle>
                <CardDescription>{item.source}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      Read <ExternalLink className="ml-1 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

