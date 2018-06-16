import React from 'react'
import { Route } from 'react-router-dom'
import CameraOutput from './components/CameraOutput'

const App = () => <Route exact path="/" component={CameraOutput} />

export default App
