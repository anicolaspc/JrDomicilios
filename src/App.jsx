import React, { useState, useEffect } from "react";
import { Layout, theme } from "antd";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import WorkersList from "./components/workers";
import Nav from "./components/nav";
import Footer from "./components/footer";
import About from "./components/about";
import Login from "./components/login";

const { Header, Content } = Layout;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token)
    } else {
      localStorage.removeItem("authToken")
    }
  }, [token])

  const onLogin = (token) => {
    setToken(token)
  }

  const onLogout = () => {
    setToken(null);
  }

  useEffect(() => {
    if (token) {
      const timeout = setTimeout(() => {
        onLogout();
      }, 900000);

      return () => clearTimeout(timeout);
    }
  }, [token]);

  return (
    <Router>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}>
          <Nav isAuthenticated={!!token} onLogout={onLogout} />
        </Header>
        <Content
          style={{
            padding: "0 48px",
          }}>
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              margin: 40,
              borderRadius: borderRadiusLG,
            }}>
            <Routes>
              <Route path="/" element={<WorkersList isAuthenticated={!!token} token={token} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login onLogin={onLogin} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
};

export default App;
