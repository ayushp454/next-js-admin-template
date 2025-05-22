'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import {
  Users, Settings, Bell,
  LayoutDashboard, LogOut, Palette,
  Menu, Search, X,
  Table
} from 'lucide-react'
import { SidebarItem } from '@/components/SidebarItem'

const NAV_ITEMS = [
  { href: '/dashboard', title: 'Dashboard', Icon: LayoutDashboard },
  { href: '/dashboard/users', title: 'Users', Icon: Users },
  { href: '/dashboard/notifications', title: 'Notifications', Icon: Bell },
  { href: '/dashboard/components', title: 'Components', Icon: Palette },
  { href: '/dashboard/settings', title: 'Settings', Icon: Settings },
]

const COL_HIDE = 'hidden md:block'
// const COL_SHOW = 'md:hidden'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => setIsOpen(false), [pathname])

  const toggleSidebar = useCallback(() => setIsOpen(open => !open), [])
  const closeSidebar = useCallback(() => setIsOpen(false), [])

  const renderNav = useCallback((mobile = false) => (
    <nav className="p-4 flex flex-col">
      <div className="mb-4">
        <h2 className="px-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
          Main
        </h2>
        {NAV_ITEMS.map(({ href, title, Icon }) => (
          <SidebarItem
            key={href}
            href={href}
            icon={<Icon className="h-5 w-5" />}
            title={title}
            isActive={pathname === href}
          />
        ))}
        <SidebarItem
          href="/dashboard/table"
          icon={<Settings className="h-5 w-5" />}
          title="Sub Menus"
          isActive={pathname === '/dashboard/table'}
          hasDropdown
        >
          <SidebarItem
            href="/dashboard/table"
            icon={<Table className="h-5 w-5" />}
            title="Table Components"
            isActive={pathname === '/dashboard/table'}
          />
          {/* <SidebarItem
            href="/dashboard/menu2"
            icon={<Settings className="h-5 w-5" />}
            title="Settings"
            isActive={pathname === '/dashboard/menu2'}
          /> */}
        </SidebarItem>
      </div>
      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
        <SidebarItem
          href="/"
          icon={<LogOut className="h-5 w-5" />}
          title="Log out"
          isActive={false}
        />
      </div>
    </nav>
  ), [pathname])

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex">
      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-neutral-950/50 z-30 md:hidden" onClick={closeSidebar} />
          {/* 
          hidden md:block fixed top-0 left-0 z-30 h-full w-64 md:w-72 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 overflow-y-auto
           */}
          <aside className="fixed top-0 left-0 z-40 flex flex-col h-full w-64 md:w-72 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 md:hidden overflow-y-auto">
            <div className="p-4 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
              <Logo />
              <button onClick={closeSidebar} className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                <X className="h-5 w-5" />
              </button>
            </div>
            {renderNav(true)}
          </aside>
        </>
      )}

      {/* Desktop Sidebar */}
      <aside className={`${COL_HIDE} fixed top-0 left-0 z-30 flex flex-col h-full w-64 md:w-72 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 overflow-y-auto`}>
        <div className="p-4 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
          <Logo />
        </div>
        {renderNav()}
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:pl-72 flex flex-col">
        <Header onMenuClick={toggleSidebar} />
        <main className="p-4 md:p-8 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

// Extracted components

const Logo = () => (
  <h1 className="text-lg font-display font-semibold text-neutral-900 dark:text-neutral-100">
    Admin<span className="text-primary-600">OS</span>
  </h1>
)

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <header className="h-16 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-4 sticky top-0 z-20">
    <div className="flex items-center gap-4">
      <button onClick={onMenuClick} className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 md:hidden">
        <Menu className="h-5 w-5" />
      </button>
      <SearchBox />
    </div>
    <div className="flex items-center">
      <Notification />
      <UserProfile />
    </div>
  </header>
)

const SearchBox = () => (
  <div className="relative hidden sm:block w-64">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
    <input
      type="text"
      placeholder="Search..."
      className="pl-10 input bg-neutral-100 dark:bg-neutral-800 border-transparent focus:bg-white dark:focus:bg-neutral-900"
    />
  </div>
)

const Notification = () => (
  <button className="p-1.5 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 relative">
    <Bell className="h-5 w-5" />
    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-accent-500" />
  </button>
)

const UserProfile = () => (
  <div className="ml-4 flex items-center">
    <div className="avatar-sm mr-2">
      <img
        src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
        alt="Profile"
      />
    </div>
    <div className="hidden sm:block">
      <h3 className="text-sm font-medium">Sarah Johnson</h3>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">Admin</p>
    </div>
  </div>
)
