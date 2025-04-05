import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Container, CssBaseline } from '@mui/material'
import About from './components/ComponentAbout'
import Nav from './components/ComponentNav'
import Login from './components/ComponentLogin'
import Footer from './components/ComponentFooter'
import List from './components/ComponentWorkers/ListWorker'
import './App.css'

const App: React.FC = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken"))

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token)
    } else {
      localStorage.removeItem("authToken")
    }
  }, [token])

  const onLogin = (token: string) => {
    setToken(token)
  }

  const onLogout = () => {
    setToken(null)
  }

  useEffect(() => {
    if (token) {
      const timeout = setTimeout(() => {
        onLogout()
      }, 900000)
      return () => clearTimeout(timeout)
    }
  }, [token])

  return (
    <Router>
      <CssBaseline />
      <Nav isAuthenticated={!!token} onLogout={onLogout} />
      <Container>
        <Routes>
          <Route path="/" element={<List isAuthenticated={!!token} token={token || ''} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="*" element={<Navigate to='/' replace />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  )
}

export default App
