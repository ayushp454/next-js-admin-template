'use client'

import React, { useState, useEffect } from 'react'
import SearchIcon from '../icons/SearchIcon'
import { ArrowUpIcon } from '../icons/ArrowUpIcon'
import clsx from 'clsx'

interface PaginationMeta {
  count: number
  current_page: number
  per_page: number
  totals: number
  total_pages: number
  links: {
    current: string
    first: string
    next?: string
    previous?: string
    last: string
  }
}

interface ApiResponse<T> {
  data: T[]
  meta: { pagination: PaginationMeta }
}

export interface Column<T> {
  header: string
  accessor: keyof T | ((row: T) => React.ReactNode)
  sortable?: boolean
  width?: string
}

interface DynamicTableProps<T> {
  columns: Column<T>[]
  fetchData?: (
    params: { page: number; perPage: number; search?: string; sortBy?: string; sortDir?: 'asc' | 'desc' }
  ) => Promise<ApiResponse<T>>
  data?: T[]
  staticMeta?: PaginationMeta
  pageSizes?: number[]
  initialPerPage?: number
  searchEnabled?: boolean
}

export function Table<T>({
  columns,
  fetchData,
  data: staticData,
  staticMeta,
  pageSizes = [10, 20, 30],
  initialPerPage = 10,
  searchEnabled = true,
}: DynamicTableProps<T>) {
  const [rows, setRows] = useState<T[]>([])
  const [meta, setMeta] = useState<PaginationMeta | null>(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(initialPerPage)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<string | undefined>()
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | undefined>()
  const [loading, setLoading] = useState(false)

  // Fetch or set static data, with sort
  useEffect(() => {
    async function load() {
      setLoading(true)
      if (fetchData) {
        const res = await fetchData({ page, perPage, search: searchEnabled ? search : undefined, sortBy, sortDir })
        setRows(res.data)
        setMeta(res.meta.pagination)
      } else if (staticData) {
        let filtered = staticData
        if (searchEnabled && search) {
          const term = search.toLowerCase()
          filtered = filtered.filter(item =>
            Object.values(item as Record<string, any>).some(val => String(val).toLowerCase().includes(term))
          )
        }
        if (sortBy && sortDir) {
          filtered = [...filtered].sort((a, b) => {
            const aVal = (a as any)[sortBy]
            const bVal = (b as any)[sortBy]
            if (typeof aVal === 'string' && typeof bVal === 'string') {
              return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
            }
            return sortDir === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1)
          })
        }
        const count = filtered.length
        const total_pages = Math.ceil(count / perPage)
        const start = (page - 1) * perPage
        const pageData = filtered.slice(start, start + perPage)
        setRows(pageData)
        setMeta(
          staticMeta || {
            count: pageData.length,
            current_page: page,
            per_page: perPage,
            totals: count,
            total_pages,
            links: { current: '', first: '', last: '' },
          }
        )
      }
      setLoading(false)
    }
    load()
  }, [fetchData, staticData, page, perPage, search, sortBy, sortDir, searchEnabled, staticMeta])

  const startIndex = meta ? (meta.current_page - 1) * meta.per_page : 0
  const endIndex = startIndex + rows.length

  // Pagination pages with ellipses
  const getPageList = () => {
    const total = meta?.total_pages || 1
    const current = meta?.current_page || page
    const delta = 1
    const pages: (number | '...')[] = []
    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...')
      }
    }
    return pages
  }

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return
    const key = typeof col.accessor === 'string' ? col.accessor : undefined
    if (!key) return
    if (sortBy === key) {
      // toggle direction
      const next = sortDir === 'asc' ? 'desc' : sortDir === 'desc' ? undefined : 'asc'
      setSortDir(next)
      if (!next) setSortBy(undefined)
    } else {
      setSortBy(key)
      setSortDir('asc')
    }
    setPage(1)
  }

  return (
    <div className="card overflow-hidden">
      {/* header controls */}
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
        {searchEnabled && (
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input
              type="search"
              placeholder="Search..."
              className="input pl-10"
              value={search}
              onChange={e => {
                setSearch(e.target.value)
                setPage(1)
              }}
            />
          </div>
        )}
        <div className="flex items-center gap-2">
          <label htmlFor="per-page" className="text-sm">Per page:</label>
          <select id="per-page" value={perPage} onChange={e => { setPerPage(+e.target.value); setPage(1) }} className="input">
            {pageSizes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider ${col.width || ''}`}
                >
                  {col.sortable ? (
                    <button className="flex items-center gap-1" onClick={() => handleSort(col)}>
                      {col.header}
                      {sortBy === (col.accessor as string) && (
                        <ArrowUpIcon
                          className={clsx(
                            'h-3 w-3 transition-transform',
                            sortDir === 'asc' ? '' : 'rotate-180',
                          )}
                        />
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {loading ? (
              <tr><td colSpan={columns.length} className="px-6 py-4 text-center">Loading...</td></tr>
            ) : rows.length ? (
              rows.map((r, i) => (
                <tr key={i} className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  {columns.map((col, j) => (
                    <td key={j} className="px-6 py-4 whitespace-nowrap text-sm">
                      {typeof col.accessor === 'function' ? col.accessor(r) : (r[col.accessor] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr><td colSpan={columns.length} className="px-6 py-4 text-center">No records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-sm text-neutral-500">
            Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{endIndex}</span> of <span className="font-medium">{meta?.totals || 0}</span> results
          </p>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1} className="btn-outline py-1 px-3 text-sm">Previous</button>
            {getPageList().map((item, k) => item === '...' ? (
              <span key={k} className="px-3 text-sm text-neutral-500">…</span>
            ) : (
              <button key={item} onClick={() => setPage(+item)} className={`${item === page ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'btn-outline'} py-1 px-3 text-sm rounded-md transition-colors`}>{item}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(p + 1, meta?.total_pages || p))} disabled={page === meta?.total_pages} className="btn-outline py-1 px-3 text-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
