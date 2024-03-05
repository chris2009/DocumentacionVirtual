'use client'

import React, { useState, useEffect } from 'react';
import { Line, Radar, Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Legend,
  Tooltip
} from 'chart.js';
import PeruSvg from './@map/PeruSvg';

ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Legend,
  Tooltip
);

export default function FactorPage() {
  const [factor, setFactor] = useState(['']);
  const [riesgo, setRiesgo] = useState(['']);
  const [tipo, setTipo] = useState(['']);
  const [lugares, setLugares] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(['Lima']);
  const [factoresPorMes, setFactoresPorMes] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  console.log(selectedPlace)
  useEffect(() => {
    if (selectedPlace && selectedYear) {
      const getFactores = async () => {
        const response = await axios.get(`/api/factor?lugar=${selectedPlace}&year=${selectedYear}`);
        setFactor(response.data);
      };
      getFactores();

      const getRiesgos = async () => {
        // Incluye tanto el lugar como el año en la solicitud
        const response = await axios.get(`/api/riesgo?lugar=${selectedPlace}&year=${selectedYear}`);
        setRiesgo(response.data);
      };
      getRiesgos()

      if (selectedPlace && selectedYear) {
        const getTipo = async () => {
          const response = await axios.get(`/api/tipo?lugar=${selectedPlace}&year=${selectedYear}`);
          setTipo(response.data); // Asegúrate de tener un estado 'setTipo' para almacenar esta información
        };
        getTipo();
      }
    }

    if (selectedYear && selectedPlace) {
      const fetchFactoresPorMes = async () => {
        // Asegúrate de incluir tanto el year como el lugar en la solicitud
        const response = await axios.get(`/api/fecha?year=${selectedYear}&lugar=${selectedPlace}`);
        setFactoresPorMes(response.data);
      };

      fetchFactoresPorMes();
    }

    const getLugares = async () => {
      try {
        const response = await axios.get('/api/lugar');
        setLugares(response.data); // Asumiendo que la respuesta es un arreglo de lugares
      } catch (error) {
        console.error('Error al obtener los lugares:', error);
      }
    };
    getLugares();

  }, [selectedPlace, selectedYear]); // Incluye selectedYear en las dependencias

  const handlePlaceChange = (e) => {
    setSelectedPlace(e.target.value);
  };


  const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

  // Configuración de los datos para los factores
  const dataFactores = {
    labels: factor.map(item => item.factor),
    datasets: [{
      label: 'Factores',
      data: factor.map(item => item.cantidad),
      backgroundColor: 'rgba(0,100,0, 0.5)',
      borderColor: 'rgba(0,100,0, 1)',
      borderWidth: 1
    }]
  };


  const colorsByRiesgo = {
    'Alto': {
      backgroundColor: 'rgba(255,0,0, 0.5)',
      borderColor: 'rgba(255,0,0, 1)'
    },
    'Intermedio': {
      backgroundColor: 'rgba(255,255,0, 0.5)',
      borderColor: 'rgba(255,255,0, 1)'
    },
    'Bajo': {
      backgroundColor: 'rgba(0,255,0, 0.5)',
      borderColor: 'rgba(0,255,0, 1)'
    }
  };

  const dataRiesgos = {
    labels: riesgo.map(item => item.riesgo),
    datasets: [{
      label: 'Riesgos',
      data: riesgo.map(item => item.cantidad),
      backgroundColor: riesgo.map(item => colorsByRiesgo[item.riesgo] ? colorsByRiesgo[item.riesgo].backgroundColor : 'rgba(0,0,0,0.5)'), // Color por defecto en caso de no encontrar la clave
      borderColor: riesgo.map(item => colorsByRiesgo[item.riesgo] ? colorsByRiesgo[item.riesgo].borderColor : 'rgba(0,0,0,1)'), // Color por defecto en caso de no encontrar la clave
      borderWidth: 1
    }]
  };

  const dataTipos = {
    labels: tipo.map(item => item.tipo),
    datasets: [{
      label: 'Tipos de conflictos sociales',
      data: tipo.map(item => item.cantidad),
      backgroundColor: 'rgba(0,0,255, 0.5)',
      borderColor: 'rgba(0,0,255, 1)',
      borderWidth: 1
    }]
  };

  const dataFactoresPorMes = {
    labels: meses,
    datasets: [{
      label: 'Eventos',
      data: meses.map((_, i) => {
        const mesData = factoresPorMes.find(d => d.mes === i + 1);
        return mesData ? mesData.cantidad : 0;
      }),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      borderColor: 'rgba(53, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  const options = {
    plugins: {
      legend: true
    },
    scales: {
      // x: {
      //   title: {
      //     display: true,
      //     text: 'Nombre del Eje X' // Aquí colocas el nombre para el eje X
      //   }
      // },
      y: {
        title: {
          display: true,
          text: 'Cantidad' // Aquí colocas el nombre para el eje Y
        }
      }
    }
  };

  return (
    <div className='pl-52 pt-20 w-full mx-4'>
      <div className='pl-6 flex items-center pb-4'>
        <h1 className='text-gray-700 mr-6 font-bold text-sm bg-kaitoke-green-00 px-4 py-2 rounded-lg'>Estadística de conflicto social</h1>
        {/* <label className="text-sm font-bold text-gray-700 mr-3">Año:</label> */}
        <select
          name="year"
          onChange={(e) => setSelectedYear(e.target.value)}
          className="bg-kaitoke-green-50 border border-kaitoke-green-400 text-gray-900 text-sm rounded-l-full focus:ring-kaitoke-green-500 focus:border-kaitoke-green-500 block p-2.5 w-24"
          required
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
        {/* <label className="text-sm font-bold text-gray-700 mx-3">Lugar:</label> */}
        <select
          name="lugar"
          onChange={handlePlaceChange}
          value={selectedPlace}
          className="bg-kaitoke-green-50 border border-kaitoke-green-400 text-gray-900 text-sm rounded-r-full focus:ring-kaitoke-green-500 focus:border-kaitoke-green-500 block p-2.5"
          required
        >
          <option disabled value="">Lugar...</option>
          {lugares.map((lugar) => (
            <option key={lugar.id} value={lugar.lugar}>{lugar.lugar}</option>
            ))}
        </select>

      </div>
      <div className='flex'>
        <div className='border-2 border-kaitoke-green-400 p-4 rounded-lg mr-4'>
          <PeruSvg selectedPlace={selectedPlace} />
        </div>
        <div className='grid grid-cols-1 gap-y-4 mr-4 items-baseline w-2/5'>

          <div className='border-2 border-kaitoke-green-400 rounded-lg'>
            <Line
              data={dataFactores}
              options={options}
            />
          </div>
          <div className='border-2 border-kaitoke-green-400 p-2 rounded-lg'>
            <Bar
              data={dataFactoresPorMes}
              options={options}
            />
          </div>

        </div>
        <div className='grid grid-cols-1 gap-y-4 items-baseline w-1/5'>
          <div className='mx-auto border-2 border-kaitoke-green-400 p-2 rounded-lg'>
            <Radar
              data={dataTipos}
            />
          </div>
          <div className='mx-auto border-2 border-kaitoke-green-400 p-2 rounded-lg'>
            <Pie
              data={dataRiesgos}
            />
          </div>
        </div>
      </div>
    </div>
  );
}