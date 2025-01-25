import React, { useEffect, useState } from "react";
import FetchWorkers from './conecction';
import UpdateWorker from "./updateWorker";
import { Card, Button, Col, Row } from "antd";
import DeleteWorker from "./deleteWorker";
import NewWorker from "./newWorker";
const { Meta } = Card;

const WorkersList = ({ isAuthenticated, token }) => {
    const { workers, error, fetchWorkers } = FetchWorkers();
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [workerList, setWorkerList] = useState([]);
    const [showNewWorkerForm, setShowNewWorkerForm] = useState(false);

    useEffect(() => {
        setWorkerList(workers);
    }, [workers]);

    const handleEdit = (worker) => {
        setSelectedWorker(worker);
    };

    const handleUpdate = () => {
        fetchWorkers();
        setSelectedWorker(null);
    };

    const handleCancel = () => {
        setSelectedWorker(null);
        setShowNewWorkerForm(false)
    };

    const handleDelete = (workerId) => {
        setWorkerList((prev) => prev.filter((worker) => worker.mobile !== workerId));
        fetchWorkers();
    };

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            {selectedWorker ? (
                <UpdateWorker selectedWorker={selectedWorker} onUpdate={handleUpdate} onCancel={handleCancel} token={token} />
            ) :
                showNewWorkerForm ? (
                    <NewWorker onCancel={handleCancel} token={token} fetchWorkers={fetchWorkers} />
                ) : (
                    <>
                        <div className="listWorkers" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: '0 50px'}}>
                            <h1>Lista de Trabajadores</h1>
                            {isAuthenticated && (
                                <Button type="primary" style={{background: '#00dc00'}} onClick={() => setShowNewWorkerForm(true)}>
                                    Crear Nuevo Trabajador
                                </Button>
                            )}
                        </div>
                        <Row gutter={[16, 16]} justify="space-evenly"  >
                            {workerList.map((worker) => (
                                <Col xs={24} sm={16} md={9} lg={7} xl={5} key={worker.id} style={{ display: 'flex' }}>
                                    <Card
                                        style={{ width: '250px', border: '1.5px solid #e8e8e8', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                                        cover={<img alt={worker.name} src={worker.file} style={{ height: '200px', objectFit: 'cover' }} />}
                                    >
                                        <Meta
                                            title={worker.name}
                                            description={
                                                <>
                                                    <p>Cédula: {worker.id}</p>
                                                    <p>Moto: {worker.motorcycleType}</p>
                                                    <p>Movil: {worker.mobile}</p>
                                                    <p>Tipo de sangre: {worker.bloodType}</p>
                                                    <p>Fecha de nacimiento: {worker.birthdate}</p>
                                                </>
                                            } />
                                        {isAuthenticated && (
                                            <>
                                                <div className="" style={{ display: "flex", justifyContent: "space-around" }}>
                                                    <Button
                                                        type="primary"
                                                        onClick={() => handleEdit(worker)}
                                                    >
                                                        Actualizar
                                                    </Button>
                                                    <DeleteWorker
                                                        workerId={worker.mobile}
                                                        token={token}
                                                        onDelete={handleDelete}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </>
                )}
        </>
    );
};

export default WorkersList;