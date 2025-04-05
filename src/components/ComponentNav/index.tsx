import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import logo from '../../assets/logo.jpg';
import './nav.css';

type NavProps = {
    isAuthenticated: boolean;
    onLogout: () => void;
};

const Nav: React.FC<NavProps> = ({ isAuthenticated, onLogout }) => {
    const location = useLocation();

    const menuItems = [
        { key: '/', label: 'Inicio', to: '/' },
        { key: '/about', label: 'Sobre Nosotros', to: '/about' },
        isAuthenticated
            ? { key: '/logout', label: 'Cerrar sesión', onClick: onLogout }
            : { key: '/login', label: 'Iniciar Sesión', to: '/login' },
    ];

    return (
        <AppBar position='static' id='appbar' >
            <Toolbar>
                <img src={logo} alt="logo JR" className='Logo' />
                <Typography variant='h6' id='TituloLogo' >
                    JR Domicilios
                </Typography>
            {menuItems.map((item) =>
                item.to ? (
                    <Button
                        key={item.key}
                        component={Link}
                        to={item.to}
                        color='inherit'
                        id={location.pathname === item.to ? 'ButtonNav' : 'MenuItem'}
                    >
                        {item.label}
                    </Button>
                ) : (
                    <Button
                        key={item.key}
                        onClick={item.onClick}
                        color='inherit'
                        id='MenuItem'
                    >
                        {item.label}
                    </Button>
                )
            )}
        </Toolbar>
        </AppBar >
    )

}

export default Nav;