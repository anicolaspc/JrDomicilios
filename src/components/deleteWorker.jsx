import React from 'react';
import { Button, message } from 'antd';

const DeleteWorker = ({ workerId, token, onDelete }) => {

    const handleDelete = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/${workerId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el trabajador');
            }

            message.success('Trabajador eliminado con éxito');
            onDelete(workerId);
        } catch (error) {
            message.error('Hubo un error al eliminar el trabajador!');
            console.error('Hubo un error al eliminar el trabajador!', error);
        }
    };

    return (
        <Button type="primary" danger onClick={handleDelete}>
            Eliminar
        </Button>
    );
};

export default DeleteWorker;