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

  const filteredRoutes = routes.filter(route => {
    return (
      (airline === 'all' || route.airline === airline) &&
      (airport === 'all' || (airport === route.src || airport === route.dest))
    )
  })

  const airportSet = new Set()
  filteredRoutes.forEach(route => {
    airportSet.add(route.src)
    airportSet.add(route.dest)
  })

  // const airportOptions = DATA.airports.filter(airport => airportSet.has(airport.code))
  const airportOptions = DATA.airports.map(airport => {
    const active = airportSet.has(airport.code)
    return Object.assign({}, airport, { active })
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
          going through
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
          >Show All Routes</button>
        </p>
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