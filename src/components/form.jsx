import { Card, Button } from 'antd';
import React, { useRef } from 'react';

const Form = ({ worker, onSubmit, onChange, onFileChange, onCancel, imagePreview }) => {
  const fieldLabels = {
    name: 'Nombre',
    id: 'Cédula',
    motorcycleType: 'Tipo de Moto',
    mobile: '# Móvil',
    bloodType: 'Tipo de Sangre',
    birthdate: 'Fecha de Nacimiento',
  };

  const mobile = useRef(worker.mobile);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
      <form onSubmit={onSubmit} style={{ width: '30%', margin: '0 auto' }}>
        <h2>{mobile.current ? 'Editar trabajador' : 'Crear trabajador'}</h2>
        {Object.keys(fieldLabels).map((field) => (
          <label key={field} htmlFor={field} style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '10px' }}>
            {fieldLabels[field]}:
            <input
              type={field === 'birthdate' ? 'date' : 'text'}
              id={field}
              name={field}
              defaultValue={worker[field]}
              onChange={onChange}
              style={{ padding: '5px' }}
            />
          </label>
        ))}
        <div style={{margin: '10px 0'}}>
          <label htmlFor="file" >
            Archivo:
            <input type="file" id="file" name="file" onChange={onFileChange} />
          </label>
        </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: '5px' }}>
            <Button type="primary" htmlType="submit">{mobile.current ? 'Actualizar' : 'Crear'}</Button>
            <Button type="primary" danger onClick={onCancel}>Cancelar</Button>
        </div>
      </form>


      <Card style={{ width: '25%', padding: '20px', backgroundColor: '#f0f2f5' }}>
        {worker && (
          <div>
            <img src={imagePreview ? imagePreview : worker.file} alt={worker.name} style={{ width: '100%', height: 'auto', objectFit: 'cover', marginBottom: '20px' }} />
            <p><strong>{fieldLabels.name}:</strong> {worker.name}</p>
            <p><strong>{fieldLabels.id}:</strong> {worker.id}</p>
            <p><strong>{fieldLabels.motorcycleType}:</strong> {worker.motorcycleType}</p>
            <p><strong>{fieldLabels.mobile}:</strong> {worker.mobile}</p>
            <p><strong>{fieldLabels.bloodType}:</strong> {worker.bloodType}</p>
            <p><strong>{fieldLabels.birthdate}:</strong> {worker.birthdate}</p>
          </div>
        )}
      </Card>
    </div>
  );
}

export default Form;