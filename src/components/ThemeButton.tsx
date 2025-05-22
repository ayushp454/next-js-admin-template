'use client';
import { useThemeToggle } from '@/hooks/useTheme';
import Link from 'next/link';
import React from 'react'

const ThemeButton = () => {
  const { toggleTheme } = useThemeToggle();
  return (
    <div className='absolute bottom-2.5 right-1.5'>
      <button
        onClick={toggleTheme}
        className="bg-amber-200 border-amber-200 dark:bg-primary-600 dark:text-gray-50 dark:border-none p-2 border-1 mb-3 rounded-lg"
      >
        Toggle Theme
      </button>

      <Link href="/" className='underline btn-accent mb-2'>Go To Root</Link>
      <Link href="/dashboard" className='underline btn-accent'>Go To Dashboard</Link>
    </div>
  )
}

export default ThemeButton
