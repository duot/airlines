import React, { Component, useEffect, useState } from 'react';
import './App.css';
import data from './data'

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
            <tr>`{airline} {src}, {dest}`</tr>
          )}
        </table>
      </section>
    </div>
  )
}

export default App;