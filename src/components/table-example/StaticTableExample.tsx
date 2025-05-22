'use client'

import React from 'react'
import { Column, Table } from '../ui/Table'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
}

const staticUsers: User[] = [
  { id: 1, name: 'Alice',   email: 'alice@acme.com',   role: 'Admin',  status: 'Active' },
  { id: 2, name: 'Bob',     email: 'bob@acme.com',     role: 'Editor', status: 'Active' },
  { id: 3, name: 'Charlie', email: 'charlie@acme.com', role: 'User',   status: 'Inactive' },
  // …add as many as you like
]

const staticMeta = {
  count: staticUsers.length,
  current_page: 1,
  per_page: 10,
  totals: staticUsers.length,
  total_pages: 1,
  links: { current: '', first: '', last: '', next: '', previous: '' },
}

const columns: Column<User>[] = [
  { header: 'ID',    accessor: 'id',    width: 'w-12', sortable: true },
  { header: 'Name',  accessor: 'name', sortable: true },
  { header: 'Email', accessor: 'email', sortable: true },
  { header: 'Role',  accessor: 'role', sortable: true },
  { 
    header: 'Status', 
    accessor: user => (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
          user.status === 'Active'
            ? 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400'
            : 'bg-error-100   text-error-800 dark:bg-error-900/20 dark:text-error-400'
        }`}
      >
        {user.status}
      </span>
    ),
  },
]

export default function StaticTableExample() {
  return (
    <Table
      columns={columns}
      data={staticUsers}
      staticMeta={staticMeta}
      pageSizes={[5, 10, 20]}
      initialPerPage={5}
      searchEnabled={true}
    />
  )
}
