import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraficoDepositos = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/transacciones/');
        const transacciones = await response.json();

        // Procesa los datos para calcular intervalos de tiempo y montos de depósitos.
        const intervalos = {};

        transacciones.forEach(transaccion => {
          const fecha = new Date(transaccion.fecha);
          const mes = `${fecha.getFullYear()}-${(fecha.getMonth() + 1)}`;

          if (!intervalos[mes]) {
            intervalos[mes] = 0;
          }

          if (transaccion.tipo === 'deposito') {
            intervalos[mes] += parseFloat(transaccion.monto); // Convierte a número
          }
        });

        const intervaloData = Object.keys(intervalos).map(mes => ({ mes, deposito: intervalos[mes] }));

        setData(intervaloData);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    const intervalId = setInterval(fetchData, 60000); // Actualiza cada 60 segundos
    fetchData(); // Llama a fetchData al cargar el componente

    return () => {
      clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
    };
  }, []);

  return (
    <div>
      <h1>Gráfico de Depósitos</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="deposito" fill="green" name="Depósitos" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoDepositos;



