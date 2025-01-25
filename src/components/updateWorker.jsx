import React, { useState } from 'react';
import Form from './form';

const UpdateWorker = ({ selectedWorker, onUpdate, onCancel, token }) => {

  const { name, id, motorcycleType, mobile, bloodType, birthdate, file } = selectedWorker;

  const [worker, setWorker] = useState({
    name: name || '',
    id: id || '',
    motorcycleType: motorcycleType || '',
    mobile: mobile || '',
    bloodType: bloodType || '',
    birthdate: birthdate || '',
    file: file || null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorker((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setWorker((prevState) => ({
        ...prevState,
        file: file
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in worker) {
      if (worker[key] !== null && worker[key] !== '') {
        formData.append(key, worker[key]);
      }
    }

    if (!token) {
      console.error('No se encontró el token de autenticación');
      return;
    }

    // fetch(`http://localhost:5000/api/workers/${mobile}`, {
    fetch(`${import.meta.env.VITE_API_URL}/${mobile}`, {
      method: 'PUT',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      mode: 'cors'
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.message) });
        }
        return response.json();
      })
      .then(data => {
        alert('Trabajador actualizado con éxito!');
        onUpdate(data);
      })
      .catch(error => {
        console.error('Hubo un error al actualizar el trabajador!', error);
      });
  }

  return (
    <>
      <Form
        worker={worker}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onFileChange={handleFileChange}
        onCancel={onCancel}
        imagePreview={imagePreview}
      />
    </>
  )
}

export default UpdateWorker;