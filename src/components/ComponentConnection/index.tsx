import { useState, useEffect } from "react";
import { Worker } from '../ComponentInterface'

const FetchWorkers = () => {
    const [workers, setWorkers] = useState<Worker[]>([])
    const [error, setError] = useState<string | null>(null)

    const fetchWorkers = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}`)
            if (!res.ok) {
                throw new Error('Error al obtener los datos')
            }
            const data: Worker[] = await res.json()
            setWorkers(data)
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Ocurrió un error desconocido");
            }
        }
    }

    useEffect(() => {
        fetchWorkers()
    }, [])

    return { workers, error, fetchWorkers }
}

export default FetchWorkers
