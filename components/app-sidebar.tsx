"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
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
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center px-4 py-3">
          <Frame className="h-6 w-6 mr-2 text-indigo-500" />
          <span className="font-bold text-lg">CryptoWeather</span>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2 py-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/"}>
              <Link href="/" className="flex items-center">
                <Home className="h-5 w-5 mr-3" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/weather")}>
              <Link href="/weather/all" className="flex items-center">
                <Cloud className="h-5 w-5 mr-3" />
                <span>Weather</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/crypto")}>
              <Link href="/crypto/all" className="flex items-center">
                <CreditCard className="h-5 w-5 mr-3" />
                <span>Cryptocurrency</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/news")}>
              <Link href="/news" className="flex items-center">
                <Newspaper className="h-5 w-5 mr-3" />
                <span>News</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/search"}>
              <Link href="/search" className="flex items-center">
                <Search className="h-5 w-5 mr-3" />
                <span>Search</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/charts"}>
              <Link href="/charts" className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-3" />
                <span>Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/map"}>
              <Link href="/map" className="flex items-center">
                <Map className="h-5 w-5 mr-3" />
                <span>Weather Map</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarSeparator className="my-2" />

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/notifications"}>
              <Link href="/notifications" className="flex items-center">
                <Bell className="h-5 w-5 mr-3" />
                <span>Notifications</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/settings"}>
              <Link href="/settings" className="flex items-center">
                <Settings className="h-5 w-5 mr-3" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="icon" onClick={toggleTheme} className="mr-2">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
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
      </SidebarFooter>
    </Sidebar>
  )
}

