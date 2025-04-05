import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box } from "@mui/system";
import { Button, Card, CircularProgress, TextField, Typography } from "@mui/material";
import { AccountCircle, Lock } from '@mui/icons-material';
import './login.css'

type LoginProps = {
    onLogin?: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('https://jr-domicilios.vercel.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName: username, password }),
            })

            if (!res.ok) {
                throw new Error('Credenciales incorrectas. Intentalo nuevamente.')
            }

            const { token } = await res.json()

            localStorage.setItem('authToken', token)
            alert('Inicio de sesión exitoso')
            navigate('/')

            if (onLogin) {
                onLogin(token)
            }
        } catch (error: any) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Box className='ImgFondo'>
                <Card className="ContenedorLogin">
                    <Typography variant='h5' component='h2' gutterBottom>
                        Iniciar Sesión
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box className='Login' sx={{ color: '#007FfF' }}>
                            <TextField
                                variant='outlined'
                                label='Usuario'
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                InputProps={{ startAdornment: <AccountCircle /> }}
                            />
                            <TextField
                                variant='outlined'
                                label='Contraseña'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{ startAdornment: <Lock /> }}

                            />
                            <Button
                                type='submit'
                                variant='contained'
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size='1rem' /> : null}
                            >
                                Iniciar Sesión
                            </Button>
                        </Box>
                    </form>
                </Card>
            </Box>
        </>
    )
}

export default Login