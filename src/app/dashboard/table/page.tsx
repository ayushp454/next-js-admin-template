import StaticTableExample from '@/components/table-example/StaticTableExample'
import TableWithApi from '@/components/table-example/TableWithApi'
import React from 'react'

const TablePage = () => {
  return (
    <div>
      <h1 className='text-center'>Table Component</h1>
      <hr className='dark:text-white'/>
      <h3>Static Table</h3>
      <StaticTableExample />
      <hr className='dark:text-white my-4'/>
      <h3>Dynamic Api Fetching Table</h3>
      <TableWithApi />
    </div>
  )
}

export default TablePage
