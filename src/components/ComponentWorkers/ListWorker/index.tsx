import { useState } from "react"
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Worker } from '../../ComponentInterface'
import FetchWorkers from "../../ComponentConnection"
import ActionMenu from "../Button"
import New from "../NewWorker"
import Update from "../UpdateWorkers"
import './ListWorker.css'

interface ListProps {
    isAuthenticated: boolean
    token?: string
}

const List: React.FC<ListProps> = ({ isAuthenticated, token }) => {
    const { workers, error, fetchWorkers } = FetchWorkers()
    const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null)
    const [showForm, setShowForm] = useState(false)
    const [formAction, setFormAction] = useState<'create' | 'update' | null>(null)

    const handleUpdate = () => {
        fetchWorkers()
        setSelectedWorker(null)
        setShowForm(false)
    }

    const handleCancel = () => {
        setSelectedWorker(null)
        setShowForm(false)
    }

    const handleDelete = (_workerId: string) => {
        fetchWorkers()
    }

    if (error) {
        return <Typography color="error">Error: {error}</Typography>
    }

    return (
        <>
            {showForm && formAction === 'create' && (
                <New onCancel={handleCancel} token={token || ''} fetchWorkers={fetchWorkers} />
            )}
            {showForm && formAction === 'update' && selectedWorker && (
                <Update selectedWorker={selectedWorker} onUpdate={handleUpdate} onCancel={handleCancel} token={token || ''} />
            )}
            {!showForm && (
                <>
                    <Typography variant='h6'>Lista de trabajadores</Typography>
                    <Box>
                        {isAuthenticated && (//!showForm && (
                            <ActionMenu
                                token={token || ''}
                                setShowForm={setShowForm}
                                setFormAction={setFormAction}
                                setSelectedWorker={setSelectedWorker}
                                onDelete={handleDelete}
                            />
                        )}
                    </Box>
                    <div className='GridContainer'>
                        {workers.map((worker) => (
                            <Card key={worker.mobile} className="Card">
                                <CardMedia
                                    className="CardMedia"
                                    component='img'
                                    image={typeof worker.file === "string" ? worker.file : "/default-image.png"}
                                />
                                <CardContent className="CardContent">
                                    <Typography variant='h6'>{worker.name}</Typography>
                                    <Typography variant='body2'>Cédula: {worker.id}</Typography>
                                    <Typography variant='body2'>Moto: {worker.motorcycleType}</Typography>
                                    <Typography variant='body2'>Tipo de sangre: {worker.bloodType}</Typography>
                                    <Typography variant='body2'>Movil: {worker.mobile}</Typography>
                                    <Typography variant='body2'>Fecha de nacimiento: {worker.birthdate}</Typography>
                                    {isAuthenticated && (
                                        <ActionMenu
                                            worker={worker}
                                            token={token || ''}
                                            setShowForm={setShowForm}
                                            setFormAction={setFormAction}
                                            setSelectedWorker={setSelectedWorker}
                                            onDelete={handleDelete}
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default List 
