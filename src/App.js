import React, { Component, useEffect, useState } from 'react';
import './App.css';
import data from './data'
const { getAirportByCode, getAirlineById } = data

const App = () => {
  const [routes, setRoutes] = useState([])

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
        <table>
          {routes.map(({ airline, src, dest }) => 
            <tr>
              <td>
                {getAirlineById(airline)}
              </td>
              <td>
                {getAirportByCode(src)}
              </td>
              <td>
                {getAirportByCode(dest)}
              </td>
            </tr>
          )}
        </table>
      </section>
    </div>
  )
}

export default App;