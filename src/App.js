import React, { Component, useEffect, useState } from 'react';
import './App.css';
import Select from './components/Select';
import Table from './components/Table'
import DATA from './data'

const App = () => {
  const [routes, setRoutes] = useState([])

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

  const filteredAirlines = DATA.airlines

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Welcome to the app!
        </p>

        <Select options={filteredAirlines} valueKey="id" titleKey="name"
  allTitle="All Airlines" value="" onSelect={console.log} />
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