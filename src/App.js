import React, { Component, useEffect, useState } from 'react';
import './App.css';
import Select from './components/Select';
import Table from './components/Table'
import DATA from './data'

const App = () => {
  const [routes, setRoutes] = useState([])
  const [airline, setAirline] = useState('all')

  const columns = [
    { name: 'Airline', property: 'airline' },
    { name: 'Source Airport', property: 'src' },
    { name: 'Destination Airport', property: 'dest' },
  ];

  const formatValue = (property, value) => {
    switch(property) {
      case "airline": return DATA.getAirlineById(value).name
      default: return DATA.getAirportByCode(value).name
    }
  }

  useEffect(() => {
    setRoutes(DATA.routes)
  }, [])

  const handleAirlineSelect = (value) => {
    console.log(value)
    if (value !== "all") {
      value = parseInt(value, 10)
    }
    setAirline(value)
  }

  const filteredAirlines = DATA.airlines

  const filteredRoutes = routes.filter(route => {
    return (
      (airline !== 'all' && route.airline === airline) ||
      (airline === 'all')
    )
  })

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Welcome to the app!
        </p>

        <Select 
          options={filteredAirlines}
          valueKey="id"
          titleKey="name"
          allTitle="All Airlines"
          value={airline}
          onSelect={handleAirlineSelect}
        />
        <Table
          className="route-table"
          columns={columns}
          rows={filteredRoutes}
          format={formatValue}
        />
      </section>
    </div>
  )
}

export default App;