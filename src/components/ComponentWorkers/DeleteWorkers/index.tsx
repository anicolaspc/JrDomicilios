import React, { useState } from "react"
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material"

interface DeleteProps {
    mobile: string
    token: string
    onDelete: (mobile: string) => void
    openDialog: boolean
    setOpenDialog: (open: boolean) => void
}

const DeleteWorkers: React.FC<DeleteProps> = ({ mobile, token, onDelete, openDialog, setOpenDialog }) => {
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
            onDelete(mobile)
            setOpenDialog(false)
        } catch (error) {
            setMessage('¡Hubo un error al eliminar el trabajador!')
            setSeverity('error')
            console.error('¡Hubo un error al eliminar el trabajador!', error)
        }
    }

    return (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogContent>
                ¿Estás seguro de que deseas eliminar a este trabajador?
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleDelete} color="secondary">
                    Eliminar
                </Button>
            </DialogActions>
            {message && (
                <div>
                    <p>{message}</p>
                </div>
            )}
        </Dialog>
    )
}

export default DeleteWorkers
