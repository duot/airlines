import React, { Component, useEffect, useState } from 'react';
import './App.css';
import Map from './components/Map';
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
    switch (property) {
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

  const airportOptions = DATA.airports.map(airport => {
    const active = airportSet.has(airport.code)
    return { ...airport, active }
  })

  const airlineSet = new Set()
  filteredRoutes.forEach(({ airline }) => airlineSet.add(airline))

  const airlineOptions = DATA.airlines.map(airline => {
    const active = airlineSet.has(airline.id)
    return { ...airline, active }
  })

  const xyNCoord = (n, { lat, long }) => ({ ["x" + n]: long, ["y" + n]: lat })

  const routeCoordinates = filteredRoutes.map(({ src, dest }) => {
    const start = xyNCoord(1, DATA.getAirportByCode(src))
    const end = xyNCoord(2, DATA.getAirportByCode(dest))
    return { ...start, ...end }
  })

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <Map lines={routeCoordinates} />
        <p>
          Welcome to the app!
        </p>
        <p>
          Show routes on
          <Select
            options={airlineOptions}
            valueKey="id"
            titleKey="name"
            enabledKey="active"
            allTitle="All Airlines"
            value={airline}
            onSelect={handleAirlineSelect}
          />
          going through
          <Select
            options={airportOptions}
            valueKey="code"
            titleKey="name"
            enabledKey="active"
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