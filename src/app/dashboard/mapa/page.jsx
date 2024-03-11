'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale } from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { Chart } from 'react-chartjs-2';

// Registro del controlador y elemento de Matrix para Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  MatrixController,
  MatrixElement
);

const mapearNumeroMesANombre = (numeroMes) => {
  const nombresDeMes = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return nombresDeMes[numeroMes - 1];
};

export default function Example() {
  const [riesgosMes, setRiesgosMes] = useState([]);

  useEffect(() => {
    const getRiesgoMes = async () => {
      try {
        const response = await axios.get('/api/conflicto/riesgoMes');
        setRiesgosMes(response.data); // Asumiendo que la respuesta es un arreglo
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    getRiesgoMes();
  }, []);

  // Acumulación de datos
  const datosAcumulados = riesgosMes.reduce((acc, { mes, riesgo, cantidad }) => {
    // Creamos una clave única para cada combinación de mes y riesgo
    const clave = `${mapearNumeroMesANombre(mes)}-${riesgo}`;
    // Si ya existe, sumamos a la cantidad existente
    if (acc[clave]) {
      acc[clave].v += cantidad;
    } else {
      // Si no existe, creamos una nueva entrada
      acc[clave] = { x: mapearNumeroMesANombre(mes), y: riesgo, v: cantidad };
    }
    return acc;
  }, {});

  // Convertimos el objeto acumulativo en un array para el gráfico
  const datosGrafico = Object.values(datosAcumulados);

  // Configuración de los datos para Chart.js
  const data = {
    datasets: [
      {
        label: 'Cantidad de eventos por nivel de riesgo y mes',
        data: datosGrafico,
        backgroundColor: function (context) {
          const data = context.dataset.data[context.dataIndex];
          if (!data) {
            return 'rgba(0, 128, 0, 0.5)'; // Retornar un color por defecto si no hay datos.
          }
          const value = data.v;
          const alpha = Math.max(0, Math.min(1, (value - 5) / 40));
          return `rgba(0, 128, 0, ${alpha})`;
        },
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        offset: true,
      },
      y: {
        type: 'category',
        labels: ['Alto', 'Intermedio', 'Bajo'],
        offset: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title() {
            return ''; // No title
          },
          label(context) {
            const value = context.dataset.data[context.dataIndex]?.v;
            return `Cantidad: ${value}`; // Muestra la cantidad, o nada si es undefined
          },
        },
      },
    },
  };

  return (
    <div className='ml-64 mt-24'>
      <Chart type='matrix' data={data} options={options} />
    </div>
  );
}
