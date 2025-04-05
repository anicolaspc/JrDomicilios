import React, { SyntheticEvent, useState } from "react"

interface DeleteProps {
    mobile: string
    token: string
    onDelete: (mobile: string) => void
}

const Delete: React.FC<DeleteProps> = ({ mobile, token, onDelete }) => {

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [_severity, setSeverity] = useState<'success' | 'error'>('success')

    const handleDelete = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/${mobile}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!res.ok) {
                throw new Error('Error al eliminar el trabajador')
            }
            setMessage('Trabajador eliminado con éxito')
            setSeverity('success')
            setOpen(true)
            onDelete(mobile)
        } catch (error) {
            setMessage('¡Hubo un error al eliminar el trabajador!')
            setSeverity('error')
            setOpen(true)
            console.error('¡Hubo un error al eliminar el trabajador!', error)
        }
    }

    const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    return (
        <>
            <button onClick={handleDelete}>Eliminar</button>
            {open && (
                <div>
                    <p>{message}</p>
                    <button onClick={handleClose}>Cerrar</button>
                </div>
            )}
        </>
    )
}

export default Delete 