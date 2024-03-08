'use client'
import React from 'react';
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

// Datos de tu gráfico matrix
const data = {
  datasets: [
    {
      label: 'My Matrix',
      data: [
        { x: 'Enero', y: 'Alto', v: 11 },
        { x: 'Febrero', y: 'Intermedio', v: 12 },
        { x: 'Marzo', y: 'Bajo', v: 13 },
        { x: 'Abril', y: 'Bajo', v: 21 },
        { x: 'Mayo', y: 'Intermedio', v: 22 },
        { x: 'Junio', y: 'Alto', v: 23 },
        { x: 'Julio', y: 'Alto', v: 31 },
        { x: 'Agosto', y: 'Alto', v: 32 },
        { x: 'Septiembre', y: 'Bajo', v: 33 },
        { x: 'Agosto', y: 'Intermedio', v: 20 },
        { x: 'Setpiembre', y: 'Intermedio', v: 21 },
        { x: 'Octubre', y: 'Bajo', v: 22 },
        { x: 'Noviembre', y: 'Bajo', v: 23 },
        { x: 'Diciembre', y: 'Alto', v: 24 },
        
        // ... más datos aquí
      ],
      backgroundColor(context) {
        const value = context.dataset.data[context.dataIndex].v;
        const alpha = Math.max(0, Math.min(1, (value - 5) / 40)); // Aseguramos que alpha esté entre 0 y 1
        return `rgba(0, 128, 0, ${alpha})`; // Ajusta los valores RGB para verde y usa el alpha calculado
      },
      // ... más configuración aquí
    },
  ],
  // ... más configuración aquí
};

const options = {
  scales: {
    x: {
      // Se configura la escala del eje X para utilizar las etiquetas 'A', 'B', 'C'
      type: 'category',
      labels: ['Enero', 'febrero', 'Marzo'],
    },
    y: {
      // Se configura la escala del eje Y para utilizar las etiquetas 'X', 'Y', 'Z'
      type: 'category',
      labels: ['Alto', 'Intermedio', 'Bajo'],
      offset: true,
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        title() {
          return '';
        },
        label(context) {
          const v = context.raw;
          return `x: ${v.x}, y: ${v.y}, v: ${v.v}`;
        },
      },
    },
  },
  // ... más opciones si son necesarias
};

export default function Example() {
  return (
    <div className='ml-64 mt-24'>
      <Chart type='matrix' data={data} options={options} />
    </div>
  );
}
