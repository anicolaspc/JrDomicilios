import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Nav = ({ isAuthenticated, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { key: "/", label: <Link to="/">Inicio</Link> },
    { key: "/about", label: <Link to="/about">Sobre Nosotros</Link> },
    isAuthenticated
      ? { key: "/logout", label: <Link onClick={onLogout}>Cerrar sesión</Link> }
      : { key: "/login", label: <Link to="/login">Iniciar Sesión</Link> },
  ];



  return (
    <>
      <div
        className="demo-logo"
        style={{
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="logo JR" style={{ height: "10vh", padding: "5px" }} />
        JR Domicilios
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          gap: "10px",
        }}
      />
    </>
  );
};

export default Nav;
