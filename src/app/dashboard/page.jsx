// 'use client'

// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import axios from 'axios';
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Legend,
//   Tooltip
// } from 'chart.js';

// ChartJS.register(
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Legend,
//   Tooltip
// );

// export default function FactorPage() {
//   const [factor, setFactor] = useState([]);
//   const [selectedPlace, setSelectedPlace] = useState('');

//   useEffect(() => {
//     if (selectedPlace) {
//       const getFactores = async () => {
//         const response = await axios.get(`/api/factor?lugar=${selectedPlace}`);
//         setFactor(response.data);
//       };
//       getFactores();
//     }
//   }, [selectedPlace]);

//   const handlePlaceChange = (e) => {
//     setSelectedPlace(e.target.value);
//   };

//   const data = {
//     labels: factor.map(item => item.factor),
//     datasets: [{
//       label: 'Factores',
//       data: factor.map(item => item.cantidad),
//       backgroundColor: '#166535',
//       pointBorderColor: '#166535',
//       tension: 0.1
//     }]
//   };

//   const options = {
//     plugins: {
//       legend: true
//     }
//   };

//   return (
//     <div className='pl-64 pt-20 w-full'>
//       <div className='flex'>
//         <div className='pl-4'>
//           <select
//             name="lugar"
//             onChange={handlePlaceChange}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 "
//             required
//           >
//             <option value="Amazonas">Amazonas</option>
//             <option value="Ancash">Ancash</option>
//             <option value="Apurimac">Apurimac</option>
//             <option value="Arequipa">Arequipa</option>
//             <option value="Ayacucho">Ayacucho</option>
//             <option value="Cajamarca">Cajamarca</option>
//             <option value="Callao">Callao</option>
//             <option value="Cusco">Cusco</option>
//             <option value="Huancavelica">Huancavelica</option>
//             <option value="Huanuco">Huanuco</option>
//             <option value="Ica">Ica</option>
//             <option value="Junin">Junin</option>
//             <option value="La Libertad">La Libertad</option>
//             <option value="Lambayeque">Lambayeque</option>
//             <option value="Lima">Lima</option>
//             <option value="Loreto">Loreto</option>
//             <option value="Madre de Dios">Madre de Dios</option>
//             <option value="Moquegua">Moquegua</option>
//             <option value="Pasco">Pasco</option>
//             <option value="Piura">Piura</option>
//             <option value="Puno">Puno</option>
//             <option value="San Martin">San Martin</option>
//             <option value="Tacna">Tacna</option>
//             <option value="Tumbes">Tumbes</option>
//             <option value="Ucayali">Ucayali</option>
//           </select>
//         </div>
//         <div className='w-[800px] h-[400px]'>
//           <Line
//             className='pl-28 w-2/3'
//             data={data}
//             options={options}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }



'use client'

import React, { useState, useEffect } from 'react';
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
  const [riesgo, setRiesgo] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState('');

  useEffect(() => {
    if (selectedPlace) {
      const getFactores = async () => {
        const response = await axios.get(`/api/factor?lugar=${selectedPlace}`);
        setFactor(response.data);
      };
      getFactores();

      const getRiesgos = async () => {
        const response = await axios.get(`/api/riesgo?lugar=${selectedPlace}`);
        setRiesgo(response.data);
      };
      getRiesgos();
    }
  }, [selectedPlace]);

  const handlePlaceChange = (e) => {
    setSelectedPlace(e.target.value);
  };

  // Configuración de los datos para los factores
  const dataFactores = {
    labels: factor.map(item => item.factor),
    datasets: [{
      label: 'Factores',
      data: factor.map(item => item.cantidad),
      backgroundColor: '#166535',
      pointBorderColor: '#166535',
      tension: 0.1
    }]
  };

  // Configuración de los datos para los riesgos
  const dataRiesgos = {
    labels: riesgo.map(item => item.riesgo),
    datasets: [{
      label: 'Riesgos',
      data: riesgo.map(item => item.cantidad),
      backgroundColor: '#FF6384',
      pointBorderColor: '#FF6384',
      tension: 0.1
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
    <div className='pl-64 pt-20 w-full'>
      <div className='pl-6'>
        <label className="block mb-2 text-sm font-medium text-gray-900">Lugar</label>
        <select
          name="lugar"
          onChange={handlePlaceChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 "
          required
        >
          <option disabled value="">Lugar...</option>
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
      <div className='grid gap-4 grid-cols-2 pt-6 pl-6'>

        <div>
          <Line
            width={900}
            height={400}
            data={dataFactores}
            options={options}
          />
        </div>
        <div>
          <Line
            width={800}
            height={400}
            data={dataRiesgos}
            options={options}
          />
        </div>
        <div>
          <Line
            width={800}
            height={400}
            data={dataRiesgos}
            options={options}
          />
        </div>
        <div>
          <Line
            width={800}
            height={400}
            data={dataRiesgos}
            options={options}
          />
        </div>
      </div>
    </div>
  );
}