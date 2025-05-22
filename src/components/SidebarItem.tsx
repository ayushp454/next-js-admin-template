'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface SidebarItemProps {
  href: string
  icon: React.ReactNode
  title: string
  isActive: boolean
  onClick?: () => void
  hasDropdown?: boolean
  children?: React.ReactNode
}

export const SidebarItem = ({ 
  href, 
  icon, 
  title, 
  isActive, 
  onClick,
  hasDropdown = false,
  children
}: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div>
      {hasDropdown ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-md mb-1 text-sm font-medium transition-colors
            ${isActive 
              ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400' 
              : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800/50'
            }`}
        >
          <div className="flex items-center">
            <span className="mr-3">{icon}</span>
            <span>{title}</span>
          </div>
          <ChevronDown 
            className={`h-4 w-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>
      ) : (
        <Link
          href={href}
          onClick={onClick}
          className={`flex items-center px-3 py-2 rounded-md mb-1 text-sm font-medium transition-colors
            ${isActive 
              ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400' 
              : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800/50'
            }`}
        >
          <span className="mr-3">{icon}</span>
          <span>{title}</span>
        </Link>
      )}
      
      {hasDropdown && isOpen && (
        <div className="pl-2 pb-1">
          {children}
        </div>
      )}
    </div>
  )
}