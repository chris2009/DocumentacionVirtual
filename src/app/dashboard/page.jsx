'use client'

import React, { useState, useEffect, Fragment } from 'react';
import { Line, Radar, Bar, Pie } from 'react-chartjs-2';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
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

  useEffect(() => {
    if (selectedPlace && selectedYear) {
      const getFactores = async () => {
        const response = await axios.get(`/api/conflicto/factor?lugar=${selectedPlace}&year=${selectedYear}`);
        setFactor(response.data);
      };
      getFactores();

      const getRiesgos = async () => {
        // Incluye tanto el lugar como el año en la solicitud
        const response = await axios.get(`/api/conflicto/riesgo?lugar=${selectedPlace}&year=${selectedYear}`);
        setRiesgo(response.data);
      };
      getRiesgos()

      if (selectedPlace && selectedYear) {
        const getTipo = async () => {
          const response = await axios.get(`/api/conflicto/tipo?lugar=${selectedPlace}&year=${selectedYear}`);
          setTipo(response.data); // Asegúrate de tener un estado 'setTipo' para almacenar esta información
        };
        getTipo();
      }
    }

    if (selectedYear && selectedPlace) {
      const fetchFactoresPorMes = async () => {
        // Asegúrate de incluir tanto el year como el lugar en la solicitud
        const response = await axios.get(`/api/conflicto/fecha?year=${selectedYear}&lugar=${selectedPlace}`);
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

  const handlePlaceChange = (newValue) => {
    setSelectedPlace(newValue);
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
  const years = [2024, 2023]
  return (
    <div className='pl-52 pt-20 w-[calc(100%-theme(space.8))] mx-4'>
      <div className='pl-6 flex items-center pb-4'>
        <h1 className='text-gray-700 mr-6 font-bold text-sm bg-kaitoke-green-00 px-4 py-2 rounded-lg'>Estadística de conflicto social</h1>
        <div className="top-16 ml-3 w-28 z-10">
          <Listbox value={selectedYear} onChange={setSelectedYear}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-kaitoke-green-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-kaitoke-green-300 sm:text-sm">
                <span className="block truncate">{selectedYear}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {years.map((year) => (
                    <Listbox.Option
                      key={year}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-kaitoke-green-100 text-kaitoke-green-900' : 'text-gray-900'}`
                      }
                      value={year}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {year}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-kaitoke-green-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <div className="top-16 ml-3 w-44">
          <Listbox value={selectedPlace} onChange={handlePlaceChange}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selectedPlace}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {lugares.map((lugar) => (
                    <Listbox.Option
                      key={lugar.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-kaitoke-green-100 text-kaitoke-green-900' : 'text-gray-900'}`
                      }
                      value={lugar.lugar}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selectedPlace ? 'font-medium' : 'font-normal'}`}>
                            {lugar.lugar}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-kaitoke-green-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

      </div>
      <div className='flex'>
        <div className='shadow-md focus:outline-none focus-visible:border-kaitoke-green-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-kaitoke-green-300 p-4 mr-4'>
          <PeruSvg className="" selectedPlace={selectedPlace} />
        </div>
        <div className='grid grid-cols-1 gap-y-4 mr-4 items-baseline w-2/5'>

          <div className='shadow-md focus:outline-none focus-visible:border-kaitoke-green-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-kaitoke-green-300 p-4'>
            <Line
              data={dataFactores}
              options={options}
            />
          </div>
          <div className='shadow-md focus:outline-none focus-visible:border-kaitoke-green-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-kaitoke-green-300 p-4'>
            <Bar
              data={dataFactoresPorMes}
              options={options}
            />
          </div>

        </div>
        <div className='grid grid-cols-1 gap-y-4 items-baseline w-1/5'>
          <div className='shadow-md focus:outline-none focus-visible:border-kaitoke-green-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-kaitoke-green-300 p-4'>
            <Radar
              data={dataTipos}
            />
          </div>
          <div className='shadow-md focus:outline-none focus-visible:border-kaitoke-green-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-kaitoke-green-300 p-4'>
            <Pie
              data={dataRiesgos}
            />
          </div>
        </div>
      </div>
    </div>
  );
}