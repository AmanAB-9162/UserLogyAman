"use client"

import { useEffect } from "react"
import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useDispatch, useSelector } from "react-redux"
import { fetchNews } from "@/lib/redux/slices/newsSlice"
import type { AppDispatch, RootState } from "@/lib/redux/store"
import Link from "next/link"

interface NewsCardProps {
  title: string
  source: string
  url: string
  date: string
}

function NewsCard({ title, source, url, date }: NewsCardProps) {
  return (
    <Card className="overflow-hidden border bg-background/60 backdrop-blur-lg transition-all hover:shadow-lg hover:scale-[1.02]">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{source}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{date}</span>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm">
              Read <ExternalLink className="ml-1 h-4 w-4" />
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

export function NewsSection() {
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Latest News</h2>
        <Link href="/news">
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card className="border border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-400">Failed to load news data. Please try again later.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.slice(0, 4).map((item) => (
            <NewsCard key={item.url} title={item.title} source={item.source} url={item.url} date={item.date} />
          ))}
        </div>
      )}
    </div>
  )
}

