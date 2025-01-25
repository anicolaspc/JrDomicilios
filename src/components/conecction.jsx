import { useState, useEffect } from 'react';

const FetchWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [error, setError] = useState(null);

  const fetchWorkers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const data = await response.json();
      setWorkers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  return { workers, error, fetchWorkers };
};

export default FetchWorkers;