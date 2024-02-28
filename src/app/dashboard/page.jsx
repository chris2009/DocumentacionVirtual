'use client'
import React from 'react'
import Map from './@map/page'
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';
import { data } from 'autoprefixer';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default function page() {

  const data = {
    labels: ['Transporte', 'Minería', 'Salud', 'Vivienda', 'Ambiental', ' Población', 'Campesinado', 'Educación'],
    datasets: [{
      labels: 'Sales of the Week',
      data: [3, 6, 9, 10, 13, 23, 12, 9, 4,],
      backgroundColor: '#166535',
      pointBorderColor: '#166535'
    }]
  }

  const options = {
    plugins: {
      legend: true
    }
  }
  return (
    <div className='flex'>
      <div className='w-1/3'>
        <Map />
      </div>
      <div className='pl- pt-24 w-2/3'>
        <Line
        className='pl-28'
          width={600}
          height={300}
          data={data}
          options={options}
        />
      </div>
    </div>
  )
}
