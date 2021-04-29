import React, { useState } from 'react'

const Table = ({ columns, rows, format, className,
  pageSize = 25,
}) => {
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
  const nextPage = (event) => {
    event.preventDefault()
    setPage(page + pageSize)
  }
  const prevPage = (event) => {
    event.preventDefault()
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
      <div className="pagination">
        <p>Showing {page + 1} - {page + pageSize} routes of {rows.length} total routes.</p>
        <button 
          onClick={prevPage}
          disabled={page === 0}>Previous</button>
        <button
          onClick={nextPage}
          disabled={page + pageSize >= rows.length } >Next</button>
      </div>
    </div>
  )
}

export default Table