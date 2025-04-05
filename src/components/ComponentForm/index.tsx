import { Box, Button, Card, TextField, Typography } from "@mui/material"
import React, { ChangeEvent, FormEvent, useRef } from "react"
import { Worker } from '../ComponentInterface'

interface FormProps {
    NewWorker: Worker
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
    onCancel: () => void
    imagePreview?: string
}

const Form: React.FC<FormProps> = ({ NewWorker, onSubmit, onChange, onFileChange, onCancel, imagePreview }) => {
    const fieldLabels = {
        name: 'Nombre',
        id: 'Cédula',
        motorcycleType: 'Tipo de Moto',
        mobile: '# Móvil',
        bloodType: 'Tipo de Sangre',
        birthdate: 'Fecha de Nacimiento'
    }

    const mobile = useRef(NewWorker.mobile)

    return (
        <Box className='ContainerForm'>
            <form className='Form' onSubmit={onSubmit}>
                <Typography variant="h4">{mobile.current ? 'Editar trabajador' : 'Crear trabajador'}</Typography>
                {Object.keys(fieldLabels).map((field) => (
                    <Box key={field} className='Input'>
                        <Typography>{fieldLabels[field as keyof typeof fieldLabels]}:</Typography>
                        <TextField
                            type={field === 'birthdate' ? 'date' : 'text'}
                            id={field}
                            name={field}
                            defaultValue={NewWorker[field as keyof Worker]}
                            onChange={onChange}
                            variant='outlined'
                            fullWidth
                        />
                    </Box>
                ))}
                <Box className='InputArchivo'>
                    <Typography variant='body1'>Archivo:</Typography>
                    <input
                        type='file'
                        id='file'
                        name='file'
                        onChange={onFileChange}
                    />
                </Box>
                <Box className='BotonInput'>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                    >
                        {mobile.current ? 'Actualizar' : 'Crear'}
                    </Button>
                    <Button
                        variant='contained'
                        color='error'
                        onClick={onCancel}
                    >
                        Cancelar
                    </Button>
                </Box>
            </form>

            <Card className='CardPreview'>
                {NewWorker && (
                    <Box>
                        <img src={typeof imagePreview === 'string' ? imagePreview : (NewWorker.file as string | undefined)}
                            alt={NewWorker.name} className='ImagenPreview' />
                        <Typography variant="body1"><strong>{fieldLabels.name}:</strong> {NewWorker.name}</Typography>
                        <Typography variant="body1"><strong>{fieldLabels.id}:</strong> {NewWorker.id}</Typography>
                        <Typography variant="body1"><strong>{fieldLabels.motorcycleType}:</strong> {NewWorker.motorcycleType}</Typography>
                        <Typography variant="body1"><strong>{fieldLabels.mobile}:</strong> {NewWorker.mobile}</Typography>
                        <Typography variant="body1"><strong>{fieldLabels.bloodType}:</strong> {NewWorker.bloodType}</Typography>
                        <Typography variant="body1"><strong>{fieldLabels.birthdate}:</strong> {NewWorker.birthdate}</Typography>
                    </Box>
                )}
            </Card>
        </Box>
    )
}

export default Form 