import React, { ChangeEvent, FormEvent, useState } from "react"
import { Worker } from "../../ComponentInterface"
import Form from "../../ComponentForm"

interface UpdateProps {
    selectedWorker: Worker
    onUpdate: (data: Worker) => void
    onCancel: () => void
    token: string
}

const Update: React.FC<UpdateProps> = ({ selectedWorker, onUpdate, onCancel, token }) => {
    const { id, name, motorcycleType, mobile, bloodType, birthdate, file } = selectedWorker

    const [worker, setWorker] = useState<Worker>({
        id: id || '',
        name: name || '',
        motorcycleType: motorcycleType || '',
        mobile: mobile || '',
        bloodType: bloodType || '',
        birthdate: birthdate || '',
        file: file || null
    })

    const [imagePreview, setImagePreview] = useState<string | undefined>(undefined)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setWorker((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        if (file) {
            setWorker((prevState) => ({
                ...prevState,
                file: file
            }))
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        for (const key in worker) {
            if (worker[key as keyof Worker]) {
                formData.append(key, worker[key as keyof Worker] as string | Blob)
            }
        }
        if (!token) {
            console.error('No se encontró el token de autenticación')
            return
        }

        fetch(`${import.meta.env.VITE_API_URL}/${mobile}`, {
            method: 'PUT',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            mode: 'cors'
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((err) => {
                        throw new Error(err.message)
                    })
                }
                return res.json()
            })
            .then((data) => {
                alert('!Trabajador actualizado con éxito¡')
                onUpdate(data)
            })
            .catch((err) => {
                console.error('!Hubo un error al actualizar el trabajador¡', err)
            })
    }


    return (
        <Form
            NewWorker={worker}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onFileChange={handleFileChange}
            onCancel={onCancel}
            imagePreview={imagePreview}
        />
    )
}

export default Update