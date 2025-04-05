"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import {
  Cloud,
  CreditCard,
  Home,
  Newspaper,
  Search,
  Settings,
  Sun,
  Moon,
  Frame,
  User,
  Bell,
  LogOut,
  BarChart3,
  Map,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function NavBar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Weather", href: "/weather/all", icon: Cloud },
    { name: "Cryptocurrency", href: "/crypto/all", icon: CreditCard },
    { name: "News", href: "/news", icon: Newspaper },
    { name: "Search", href: "/search", icon: Search },
    { name: "Analytics", href: "/charts", icon: BarChart3 },
    { name: "Weather Map", href: "/map", icon: Map },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center mr-4">
          <Frame className="h-6 w-6 mr-2 text-indigo-500" />
          <span className="font-bold text-lg hidden md:inline-block">CryptoWeather</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Mobile Menu Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden mr-2">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <div className="flex items-center mb-6">
              <Frame className="h-6 w-6 mr-2 text-indigo-500" />
              <span className="font-bold text-lg">CryptoWeather</span>
            </div>
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
              <div className="pt-4 mt-4 border-t">
                <Link
                  href="/notifications"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center ml-auto space-x-2">
          <Button variant="outline" size="icon" onClick={toggleTheme} className="hidden sm:flex">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <Button variant="ghost" size="sm">
                  Mark all as read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex w-full flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-red-500">Temperature Alert</p>
                      <span className="text-xs text-muted-foreground">Just now</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Delhi temperature has risen by 3°C in the last hour!
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex w-full flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Weather Alert</p>
                      <span className="text-xs text-muted-foreground">5 minutes ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Storm alert in Mumbai!</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex w-full flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Price Alert</p>
                      <span className="text-xs text-muted-foreground">10 minutes ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Bitcoin price increased by 5%!</p>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hidden md:flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="h-4 w-4 mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

