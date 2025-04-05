import { Box, Button } from "@mui/material"
import { Worker } from "../../ComponentInterface"
import Delete from "../DeleteWorkers"

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
                    >
                        Editar
                    </Button>
                    <Delete mobile={worker.mobile} token={token} onDelete={onDelete} />
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
                >
                    Agregar Trabajador
                </Button>
            )}
        </Box>
    )
}

export default ActionMenu 
