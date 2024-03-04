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
  const [factor, setFactor] = useState(['Lima']);
  const [riesgo, setRiesgo] = useState(['Lima']);
  const [tipo, setTipo] = useState(['Lima']);
  const [selectedPlace, setSelectedPlace] = useState(['Lima']);
  const [factoresPorMes, setFactoresPorMes] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (selectedPlace && selectedYear) {
      const getFactores = async () => {
        const response = await axios.get(`/api/factor?lugar=${selectedPlace}&year=${selectedYear}`);
        setFactor(response.data);
      };
      getFactores();

      // const getRiesgos = async () => {
      //   const response = await axios.get(`/api/riesgo?lugar=${selectedPlace}`);
      //   setRiesgo(response.data);
      // };
      // getRiesgos();

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


    const fetchFactoresPorMes = async () => {
      // Asegúrate de incluir tanto el year como el lugar en la solicitud
      const response = await axios.get(`/api/fecha?year=${selectedYear}&lugar=${selectedPlace}`);
      setFactoresPorMes(response.data);
    };

    if (selectedYear && selectedPlace) {
      fetchFactoresPorMes();
    }
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

  // Configuración de los datos para los riesgos
  const dataRiesgos = {
    labels: riesgo.map(item => item.riesgo),
    datasets: [{
      label: 'Riesgos',
      data: riesgo.map(item => item.cantidad),
      backgroundColor: [
        'rgba(255,0,0, 0.5)',
        'rgba(0,255,0, 0.5)',
        'rgba(0,0,255, 0.5)',
      ],
      borderColor: [
        'rgba(255,0,0, 1)',
        'rgba(0,255,0, 1)',
        'rgba(0,0,255, 1)',
      ],
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
      <div className='pl-6 flex items-center'>
        <h1 className='text-gray-700 mr-6 font-bold'>Estadística de conflicto social</h1>
        <label className="block mb-2 text-sm font-medium text-gray-900 mr-3">Año:</label>
        <select
          name="year"
          onChange={(e) => setSelectedYear(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-24"
          required
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
        <label className="block mb-2 text-sm font-medium text-gray-900 mx-3">Lugar:</label>
        <select
          name="lugar"
          onChange={handlePlaceChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
          required
        >
          <option disabled value="">Lugar...</option>
          <option value="Lima">Lima</option>
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
      <div className='grid gap-5 grid-cols-2 py-6'>

        <div className='border-2 border-kaitoke-green-400 p-2 rounded-lg'>
          <Line
            width={900}
            height={400}
            data={dataFactores}
            options={options}
          />
        </div>
        <div className='border-2 border-kaitoke-green-400 p-2 rounded-lg w-[95%]'>
          <Bar
            data={dataFactoresPorMes}
            options={options}
          />
        </div>
      </div>
      <div className='grid gap-5 grid-cols-2'>
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
  );
}