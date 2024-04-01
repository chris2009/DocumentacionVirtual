'use client'

import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    BarElement,
    Legend,
    CategoryScale,
    LinearScale,
    Tooltip
} from 'chart.js'
import axios from 'axios'

ChartJS.register(
    BarElement,
    Legend,
    CategoryScale,
    LinearScale,
    Tooltip
)

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export default function acNacionalPage() {
    const [acNacionalData, setAcNacionalData] = useState({});

    useEffect(() => {
        const getAcNacional = async () => {
            try {
                const response = await axios.get(`/api/ac/institucional`);
                const data = response.data;

                // Creamos un objeto para mapear los meses con su total correspondiente
                const dataPorMes = meses.reduce((accumulator, mes, index) => {
                    accumulator[mes] = 0; // Inicializa todos los meses a 0
                    return accumulator;
                }, {});

                // Llenamos el objeto con los datos de la API
                data.forEach(item => {
                    const mes = meses[item.mes - 1]; // Restamos 1 porque los meses en JS son 0-indexados
                    dataPorMes[mes] += item.total; // Sumamos el total a cada mes correspondiente
                });

                // Establecemos la estructura de datos para Chart.js
                setAcNacionalData({
                    labels: meses,
                    datasets: [{
                        label: 'Eventos',
                        data: Object.values(dataPorMes),
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        borderColor: 'rgba(53, 162, 235, 1)',
                        borderWidth: 1
                    }]
                });
            } catch (error) {
                console.error('Hubo un error al obtener los datos', error);
                // Manejar el error como sea apropiado para tu aplicación
            }
        };

        getAcNacional();
    }, []);

    return (
        <div className=''>
            <div className='mx-4'>
                {acNacionalData.labels && <Bar data={acNacionalData} />}
            </div>
        </div>
    );
}
