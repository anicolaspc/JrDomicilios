import React, { ChangeEvent, FormEvent, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { Worker } from '../../ComponentInterface';
import Form from "../../ComponentForm";

interface NewProps {
    token: string;
    onCancel: () => void;
    fetchWorkers: () => void;
}

const New: React.FC<NewProps> = ({ token, onCancel, fetchWorkers }) => {
    const [worker, setWorker] = useState<Worker>({
        name: '',
        id: '',
        motorcycleType: '',
        mobile: '',
        bloodType: '',
        birthdate: '',
        file: undefined,
    });

    const [_isCreating, setIsCreating] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
    const [alert, setAlert] = useState<{ message: string, severity: 'success' | 'error' } | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setWorker((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setWorker((prevState) => ({
                ...prevState,
                file: file
            }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const validateFields = () => {
        const errors: string[] = [];
        if (!worker.name) errors.push('El campo Nombre es requerido.');
        if (!worker.id) errors.push('El campo ID es requerido.');
        if (!worker.motorcycleType) errors.push('El campo Tipo de motocicleta es requerido.');
        if (!worker.mobile) errors.push('El campo Móvil es requerido.');
        if (!worker.bloodType) errors.push('El campo Tipo de sangre es requerido.');
        if (!worker.birthdate) errors.push('El campo Fecha de nacimiento es requerido.');
        if (!worker.file) errors.push('El campo Archivo es requerido.');
        return errors;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsCreating(true);
        
        const validationErrors = validateFields();
        if (validationErrors.length > 0) {
            setAlert({ message: validationErrors.join(' '), severity: 'error' });
            setIsCreating(false);
            return;
        }

        const formData = new FormData();
        for (const key in worker) {
            if (worker[key as keyof Worker] !== null && worker[key as keyof Worker] !== '') {
                formData.append(key, worker[key as keyof Worker] as string | Blob);
            }
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear el trabajador');
            }

            setAlert({ message: 'Trabajador creado con éxito', severity: 'success' });
            fetchWorkers();
            onCancel();
        } catch (error: any) {
            setAlert({ message: '!Hubo un error al crear el trabajador!', severity: 'error' });
            console.error('!Hubo un error al crear el trabajador!', error.message);
        } finally {
            setIsCreating(false);
        }
    };


    return (
        <>
            <Form
                NewWorker={worker}
                onSubmit={handleSubmit}
                onChange={handleChange}
                onFileChange={handleFileChange}
                onCancel={onCancel}
                imagePreview={imagePreview}
            />
            <Snackbar
                open={!!alert}
                autoHideDuration={6000}
                onClose={() => setAlert(null)}
            >
                {alert ? (
                    <Alert onClose={() => setAlert(null)} severity={alert.severity}>
                        {alert.message}
                    </Alert>
                ) : undefined}
            </Snackbar>
        </>
    );
};

export default New;