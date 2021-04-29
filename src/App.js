import React, { Component, useEffect, useState } from 'react';
import './App.css';
import Select from './components/Select';
import Table from './components/Table'
import DATA from './data'

const App = () => {
  const [routes, setRoutes] = useState([])
  const [airline, setAirline] = useState('all')
  const [airport, setAirport] = useState('all')

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

  const handleAirportSelect = (value) => setAirport(value)
  const resetFilters = () => {
    setAirline('all')
    setAirport('all')
  }
  const defaultFilters = airline === 'all' && airport === 'all'

  const airlineOptions = DATA.airlines

  const filteredByRoutes = routes.filter(route => {
    return (
      (airline !== 'all' && route.airline === airline) ||
      (airline === 'all')
    )
  })

  const airportSet = new Set()
  filteredByRoutes.forEach(route => {
    airportSet.add(route.src)
    airportSet.add(route.dest)
  })

  const airportOptions = DATA.airports.filter(airport => airportSet.has(airport.code))

  const filteredByAirport = filteredByRoutes.filter(route => {
    return (
      (airport === 'all') ||
      (airport !== 'all' && (airport === route.src || airport === route.dest))
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
        <p>
          Show routes on
          <Select
            options={airlineOptions}
            valueKey="id"
            titleKey="name"
            allTitle="All Airlines"
            value={airline}
            onSelect={handleAirlineSelect}
          />
          through
          <Select
            options={airportOptions}
            valueKey="code"
            titleKey="name"
            allTitle="All Airports"
            value={airport}
            onSelect={handleAirportSelect}
          />
          <button
            onClick={resetFilters}
            disabled={defaultFilters}
          >Clear Filters</button>
        </p>
        <Table
          className="route-table"
          columns={columns}
          rows={filteredByAirport}
          format={formatValue}
        />
      </section>
    </div>
  )
}

export default App;