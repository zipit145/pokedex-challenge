import React from 'react'
import { Router, RouteComponentProps } from '@reach/router'
import Pokemon from './Pokemon'
import ID from './id'

const Screens: React.FC<RouteComponentProps> = () => (
  <Router style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
    <Pokemon path="/" />
    <ID path=":id" />
  </Router>
)

export default Screens
