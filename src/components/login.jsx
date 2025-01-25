import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Button, Card, Space, message, Form } from 'antd';
import logo from "../assets/logo.jpg";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://jr-domicilios.vercel.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: username, password }),
            });

            if (!response.ok) {
                throw new Error('Credenciales incorrectas. Intente nuevamente.');
            }

            const { token } = await response.json();

            localStorage.setItem('authToken', token);
            message.success('Inicio de sesión exitoso');
            navigate('/');

            if (onLogin) {
                onLogin(token);
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60vh',
                backgroundColor: '#f0f2f5',
                backgroundImage: `url(${logo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                flexDirection: 'column',
                padding: '20px'
            }}
        >
            <Card
                style={{
                    width: "90vh",
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    textAlign: "center"
                }}
                title="Iniciar Sesión"
            >
                <Form onSubmit={handleSubmit}>
                    <Space direction="vertical" style={{ width: '90%', gap: "20px" }}>
                        
                        <Form.Item name="username"
                            rules={[{ required: true, message: 'Por favor ingrese su usuario' }]}>
                            <Input
                                size="large"
                                id="username"
                                type="text"
                                placeholder="Usuario"
                                prefix={<UserOutlined />}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item name="password"
                            rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
                        >
                            <Input
                                size="large"
                                id="password"
                                type="password"
                                placeholder="Contraseña"
                                prefix={<LockOutlined />}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                block
                                htmlType="submit"
                                loading={loading}
                                onClick={handleSubmit}
                            >
                                Iniciar Sesión
                            </Button>
                        </Form.Item>
                    </Space>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
