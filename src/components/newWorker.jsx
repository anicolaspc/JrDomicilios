import React, { useState } from 'react';
import Form from './form';
import { message } from 'antd';

const NewWorker = ({ token, onCancel, fetchWorkers }) => {
    const [worker, setWorker] = useState({
        name: '',
        id: '',
        motorcycleType: '',
        mobile: '',
        bloodType: '',
        birthdate: '',
        file: null,
    });
    const [isCreating, setIsCreating] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorker((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setWorker((prevState) => ({
                ...prevState,
                file: file
            }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsCreating(true);
        const formData = new FormData();
        for (const key in worker) {
            if (worker[key] !== null && worker[key] !== '') {
                formData.append(key, worker[key]);
            }
        }

        try {
            // const response = fetch(`http://localhost:5000/api/workers`, {
            const response = await fetch(`${import.meta.env.VITE_API_URL}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al crear el trabajador');
            }
            
            message.success('Trabajador creado con éxito');
            fetchWorkers();
            onCancel();
        } catch (error) {
            message.error('Hubo un error al crear el trabajador!');
            console.error('Hubo un error al crear el trabajador!', error.message);
        } finally {
            setIsCreating(false);
        };
    }

    return (
        <>
            <Form
                worker={worker}
                onSubmit={handleSubmit}
                onChange={handleChange}
                onFileChange={handleFileChange}
                onCancel={onCancel}
                imagePreview={imagePreview}
            />
        </>
    );
};

export default NewWorker;