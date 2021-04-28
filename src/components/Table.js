import React, { useState } from 'react'

const Table = ({ columns, rows, format, className }) => {
  const [pageSize, setPageSize] = useState(25)
  const [page, setPage] = useState(0)

  const colDataElems = (row) => {
    return columns.map(col => {
      const value = row[col.property]
      return <td key={col.property + value}>{format(col.property, value)}</td>
    })
  }

  const tdRow = (row) => (
    <tr key={Object.values(row).join(':')}>
      {colDataElems(row)}
    </tr>
  )

  const rowsToShow = rows.slice(page, page + pageSize)

  return (
    <div>
      <table className={className}>
        <tbody>
          {rowsToShow.map(row => tdRow(row))}
        </tbody>
      </table>
      <div>
        <p>Showing {page} - {page + pageSize} routes of {pageSize} total routes.</p>
      </div>
    </div>
  )
}

export default Table