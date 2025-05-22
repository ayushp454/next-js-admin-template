'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { 
  Users, Settings, Bell, 
  LayoutDashboard, LogOut, Palette,
  Menu,
  Search,
  X
} from 'lucide-react'
import { SidebarItem } from '@/components/SidebarItem'

const DashboardLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar when changing routes on mobile
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-neutral-950/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 z-40 h-full w-64 md:w-72 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 md:hidden overflow-y-auto"
        >
          <div className="p-4 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
            <h1 className="text-lg font-display font-semibold text-neutral-900 dark:text-neutral-100">
              Admin<span className="text-primary-600">OS</span>
            </h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="p-4">
            <div className="mb-8">
              <h2 className="px-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                Main
              </h2>
              <SidebarItem
                href="/dashboard"
                icon={<LayoutDashboard className="h-5 w-5" />}
                title="Dashboard"
                isActive={pathname === '/dashboard'}
              />
              <SidebarItem
                href="/dashboard/users"
                icon={<Users className="h-5 w-5" />}
                title="Users"
                isActive={pathname === '/dashboard/users'}
              />
              <SidebarItem
                href="/dashboard/notifications"
                icon={<Bell className="h-5 w-5" />}
                title="Notifications"
                isActive={pathname === '/dashboard/notifications'}
              />
              <SidebarItem
                href="/dashboard/components"
                icon={<Palette className="h-5 w-5" />}
                title="Components"
                isActive={pathname === '/dashboard/components'}
              />
              <SidebarItem
                href="/dashboard/settings"
                icon={<Settings className="h-5 w-5" />}
                title="Settings"
                isActive={pathname === '/dashboard/settings'}
              />
              <SidebarItem
                href="/dashboard/main-menu"
                icon={<Settings className="h-5 w-5" />}
                title="Sub Menus"
                isActive={pathname === '/dashboard/main-menu'}
                hasDropdown={true}
              >
                <SidebarItem
                  href="/dashboard/components"
                  icon={<Palette className="h-5 w-5" />}
                  title="Components"
                  isActive={pathname === '/dashboard/menu1'}
                />
                <SidebarItem
                  href="/dashboard/settings"
                  icon={<Settings className="h-5 w-5" />}
                  title="Settings"
                  isActive={pathname === '/dashboard/menu2'}
                />
              </SidebarItem>
            </div>
            <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-800">
              {/* <ThemeSwitcher /> */}
              <SidebarItem
                href="/"
                icon={<LogOut className="h-5 w-5" />}
                title="Log out"
                isActive={false}
              />
            </div>
          </nav>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:block fixed top-0 left-0 z-30 h-full w-64 md:w-72 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 overflow-y-auto">
        <div className="p-4 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
          <h1 className="text-lg font-display font-semibold text-neutral-900 dark:text-neutral-100">
            Admin<span className="text-primary-600">OS</span>
          </h1>
        </div>
        <nav className="p-4">
          <div className="mb-8">
            <h2 className="px-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
              Main
            </h2>
            <SidebarItem
              href="/dashboard"
              icon={<LayoutDashboard className="h-5 w-5" />}
              title="Dashboard"
              isActive={pathname === '/dashboard'}
            />
            <SidebarItem
              href="/dashboard/users"
              icon={<Users className="h-5 w-5" />}
              title="Users"
              isActive={pathname === '/dashboard/users'}
            />
            <SidebarItem
              href="/dashboard/notifications"
              icon={<Bell className="h-5 w-5" />}
              title="Notifications"
              isActive={pathname === '/dashboard/notifications'}
            />
            <SidebarItem
              href="/dashboard/components"
              icon={<Palette className="h-5 w-5" />}
              title="Components"
              isActive={pathname === '/dashboard/components'}
            />
            <SidebarItem
              href="/dashboard/settings"
              icon={<Settings className="h-5 w-5" />}
              title="Settings"
              isActive={pathname === '/dashboard/settings'}
            />
            <SidebarItem
              href="/dashboard/main-menu"
              icon={<Settings className="h-5 w-5" />}
              title="Sub Menus"
              isActive={pathname === '/dashboard/main-menu'}
              hasDropdown={true}
            >
              <SidebarItem
                href="/dashboard/components"
                icon={<Palette className="h-5 w-5" />}
                title="Components"
                isActive={pathname === '/dashboard/menu1'}
              />
              <SidebarItem
                href="/dashboard/settings"
                icon={<Settings className="h-5 w-5" />}
                title="Settings"
                isActive={pathname === '/dashboard/menu2'}
              />
            </SidebarItem>
          </div>
          <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-800">
            {/* <ThemeSwitcher /> */}
            <SidebarItem
              href="/"
              icon={<LogOut className="h-5 w-5" />}
              title="Log out"
              isActive={false}
            />
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="md:pl-72">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-4 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative hidden sm:block w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 input bg-neutral-100 dark:bg-neutral-800 border-transparent focus:bg-white dark:focus:bg-neutral-900"
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <button className="p-1.5 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-accent-500"></span>
            </button>

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
          </div>
        </header>
        
        {/* Content */}
        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
