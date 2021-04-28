import React, { Component, useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table'
import data from './data'

const App = () => {
  const [routes, setRoutes] = useState([])

  const columns = [
    { name: 'Airline', property: 'airline' },
    { name: 'Source Airport', property: 'src' },
    { name: 'Destination Airport', property: 'dest' },
  ];

  const formatValue = (property, value) => {
    switch(property) {
      case "airline": return data.getAirlineById(value).name
      default: return data.getAirportByCode(value).name
    }
  }

  useEffect(() => {
    setRoutes(data.routes)
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Welcome to the app!
        </p>
        <Table
          className="route-table"
          columns={columns}
          rows={routes}
          format={formatValue}
        />
      </section>
    </div>
  )
}

export default App;