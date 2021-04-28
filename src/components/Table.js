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
  const nextPage = () => setPage(page + pageSize)
  const prevPage = () => {
    let newPage = page - pageSize
    setPage(newPage >= 0 ? newPage : 0)
  }

  return (
    <div>
      <table className={className}>
        <tbody>
          {rowsToShow.map(row => tdRow(row))}
        </tbody>
      </table>
      <div>
        <p>Showing {page} - {page + pageSize} routes of {rows.length} total routes.</p>
        <button onClick={prevPage} >Previous</button>
        <button onClick={nextPage} >Next</button>
      </div>
    </div>
  )
}

export default Table