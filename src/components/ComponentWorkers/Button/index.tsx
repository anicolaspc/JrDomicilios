import { Box, Button } from "@mui/material"
import { Worker } from "../../ComponentInterface"
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from "react"
import DeleteWorkers from "../DeleteWorkers"

interface ActionMenuProps {
    worker?: Worker
    token: string
    setShowForm: (show: boolean) => void
    setFormAction: (action: "create" | "update" | null) => void
    setSelectedWorker: (worker: Worker | null) => void
    onDelete: (workerId: string) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({
    worker,
    token,
    setShowForm,
    setFormAction,
    setSelectedWorker,
    onDelete,
}) => {
    const [openDialog, setOpenDialog] = useState(false)

    const handleDelete = () => {
        setOpenDialog(true)
    }

    return (
        <Box display="flex" gap={1}>
            {worker ? (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setSelectedWorker(worker)
                            setFormAction("update")
                            setShowForm(true)
                        }}
                        startIcon={<EditIcon />}
                    >
                        Editar
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        startIcon={<DeleteIcon />}
                    >
                        Eliminar
                    </Button>

                    <DeleteWorkers
                        mobile={worker.mobile}
                        token={token}
                        onDelete={onDelete}
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                    />
                </>
            ) : (
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                        setSelectedWorker(null)
                        setFormAction("create")
                        setShowForm(true)
                    }}
                    startIcon={<AddIcon />}
                >
                    Agregar Trabajador
                </Button>
            )}
        </Box>
    )
}

export default ActionMenu
