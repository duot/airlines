import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Table from './Table'

test('render table', () => {
  const format = (_, value) => value

  const props = {
    format,
    columns: [
      {name: "A", property: "airline"}
    ],
    rows: [
      { "airline": 24, "src": "SCL", "dest": "DFW" },
      { "airline": 24, "src": "MIA", "dest": "YUL" },
      { "airline": 130, "src": "ROV", "dest": "TAS" },
    ],
  }
  const table = render(<Table {...props}/>)
})