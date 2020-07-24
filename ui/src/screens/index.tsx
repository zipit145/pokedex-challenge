import React from 'react'
import { Router } from '@reach/router'
import Home from './Home'
import Pokemon from './pokemon'

const Screens: React.FC = () => (
  <Router style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
    <Home path="/" />
    <Pokemon path="/pokemon" />
  </Router>
)

export default Screens
