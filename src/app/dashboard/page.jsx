'use client'

import React, { useState, useEffect } from 'react';
import Map from './@map/page';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

export default function FactorPage() {
  const [factor, setFactor] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState('');

  useEffect(() => {
    if (selectedPlace) {
      const getFactores = async () => {
        const response = await axios.get(`/api/factor?lugar=${selectedPlace}`);
        setFactor(response.data);
      };
      getFactores();
    }
  }, [selectedPlace]);

  const handlePlaceChange = (e) => {
    setSelectedPlace(e.target.value);
  };

  const data = {
    labels: factor.map(item => item.factor),
    datasets: [{
      label: 'Factores',
      data: factor.map(item => item.cantidad),
      backgroundColor: '#166535',
      pointBorderColor: '#166535',
      tension: 0.1
    }]
  };

  const options = {
    plugins: {
      legend: true
    }
  };

  return (
    <div className='pl-64 pt-20 w-full'>
      <div className='flex'>
        <div className='pl-4'>
          <select
            name="lugar"
            onChange={handlePlaceChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 "
            required
          >
            <option value="Amazonas">Amazonas</option>
            <option value="Ancash">Ancash</option>
            <option value="Apurimac">Apurimac</option>
            <option value="Arequipa">Arequipa</option>
            <option value="Ayacucho">Ayacucho</option>
            <option value="Cajamarca">Cajamarca</option>
            <option value="Callao">Callao</option>
            <option value="Cusco">Cusco</option>
            <option value="Huancavelica">Huancavelica</option>
            <option value="Huanuco">Huanuco</option>
            <option value="Ica">Ica</option>
            <option value="Junin">Junin</option>
            <option value="La Libertad">La Libertad</option>
            <option value="Lambayeque">Lambayeque</option>
            <option value="Lima">Lima</option>
            <option value="Loreto">Loreto</option>
            <option value="Madre de Dios">Madre de Dios</option>
            <option value="Moquegua">Moquegua</option>
            <option value="Pasco">Pasco</option>
            <option value="Piura">Piura</option>
            <option value="Puno">Puno</option>
            <option value="San Martin">San Martin</option>
            <option value="Tacna">Tacna</option>
            <option value="Tumbes">Tumbes</option>
            <option value="Ucayali">Ucayali</option>
          </select>
        </div>
        <div className='w-[800px] h-[400px]'>
          <Line
            className='pl-28 w-2/3'
            data={data}
            options={options}
          />
        </div>
      </div>
    </div>
  );
}
