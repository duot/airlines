import React from 'react'

const Table = ({ columns, rows, format, className }) => {

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

  return (
    <table className={className}>
      <tbody>
        {rows.map(row => tdRow(row))}
      </tbody>
    </table>
  )
}

export default Table