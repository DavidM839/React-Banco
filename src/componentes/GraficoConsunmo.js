import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const GraficoConsunmo = () => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/transacciones/')
      .then(response => response.json())
      .then(transacciones => {
        // Procesa los datos para calcular intervalos de tiempo y montos.
        const intervalos = {};
        
        transacciones.forEach(transaccion => {
          const fecha = new Date(transaccion.fecha);
          const mes = `${fecha.getFullYear()}-${(fecha.getMonth() + 1)}`;
          
          if (!intervalos[mes]) {
            intervalos[mes] = {
              deposito: 0,
              retiro: 0,
            };
          }
          
          if (transaccion.tipo === 'deposito') {
            intervalos[mes].deposito += transaccion.monto;
          } else if (transaccion.tipo === 'retiro') {
            intervalos[mes].retiro += transaccion.monto;
          }
        });

        const intervaloLabels = Object.keys(intervalos);
        const montoDeposito = intervaloLabels.map(intervalo => intervalos[intervalo]?.deposito || 0);
        const montoRetiro = intervaloLabels.map(intervalo => intervalos[intervalo]?.retiro || 0);

        if (chart) {
          chart.destroy();
        }

        const newChart = new Chart(chartRef.current, {
          type: 'bar',
          data: {
            labels: intervaloLabels,
            datasets: [
              {
                label: 'Depósitos',
                data: montoDeposito,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
              },
              {
                label: 'Retiros',
                data: montoRetiro,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
              },
            ],
          },
        });

        setChart(newChart);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []);

  return (
    <div>
      <h1>Gráfico de Consumo</h1>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default GraficoConsunmo;
