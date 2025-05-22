'use client'

import React from 'react'
import { Column, Table } from '../ui/Table'

interface Character {
  id: number
  name: string
  status: string
  species: string
  gender: string
}

async function fetchCharacters({
  page,
  perPage,
  search,
}: {
  page: number
  perPage: number
  search?: string
}) {
  const params = new URLSearchParams({
    page: String(page),
    ...(search ? { name: search } : {}),
  })
  const res = await fetch(`https://rickandmortyapi.com/api/character?${params}`)
  const json = await res.json()

  // json.info.pages is total_pages, json.info.count is totals
  return {
    data: json.results as Character[],
    meta: {
      pagination: {
        count: json.results.length,
        current_page: page,
        per_page: perPage,
        totals: json.info.count,
        total_pages: json.info.pages,
        links: {
          current: res.url,
          first: `https://rickandmortyapi.com/api/character?page=1`,
          next: json.info.next || undefined,
          last: `https://rickandmortyapi.com/api/character?page=${json.info.pages}`,
        },
      },
    },
  }
}

const columns: Column<Character>[] = [
  { header: 'ID',      accessor: 'id',      width: 'w-12', sortable: true },
  { header: 'Name',    accessor: 'name', sortable: true },
  { header: 'Status',  accessor: 'status', sortable: true },
  { header: 'Species', accessor: 'species', sortable: true },
  { header: 'Gender',  accessor: 'gender', sortable: true },
]

export default function TableWithApi() {
  return (
    <Table
      columns={columns}
      fetchData={fetchCharacters}
      pageSizes={[10, 20, 50]}
      initialPerPage={10}
      searchEnabled={true}
    />
  )
}
