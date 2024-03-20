'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale } from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Registro del controlador y elemento de Matrix para Chart.js
ChartJS.register(
    CategoryScale,
    ChartDataLabels,
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

export default function matrizACIMes() {
    const [matrizACI, setMatrizACI] = useState([]);

    useEffect(() => {
        const getMatrizACI = async () => {
            try {
                const response = await axios.get('/api/ac/matrizACN');
                setMatrizACI(response.data); // Asumiendo que la respuesta es un arreglo
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        getMatrizACI();
    }, []);

    // Acumulación de datos
    const datosAcumulados = matrizACI.reduce((acc, { mes, activo_critico_nacional, cantidad }) => {
        // Creamos una clave única para cada combinación de mes y riesgo
        const clave = `${mapearNumeroMesANombre(mes)}-${activo_critico_nacional}`;
        // Si ya existe, sumamos a la cantidad existente
        if (acc[clave]) {
            acc[clave].v += cantidad;
        } else {
            // Si no existe, creamos una nueva entrada
            acc[clave] = { x: mapearNumeroMesANombre(mes), y: activo_critico_nacional, v: cantidad };
        }
        return acc;
    }, {});

    // Convertimos el objeto acumulativo en un array para el gráfico
    const datosGrafico = Object.values(datosAcumulados);

    // Configuración de los datos para Chart.js
    const data = {
        datasets: [
            {
                label: 'Cantidad de activos críticos insticionales por mes',
                data: datosGrafico,
                backgroundColor: function (context) {
                    const data = context.dataset.data[context.dataIndex];
                    if (!data) {
                        return 'rgba(0, 0, 256, 0.5)'; // Retornar un color por defecto si no hay datos.
                    }
                    const value = data.v;
                    const alpha = Math.max(0, Math.min(1, (value - 5) / 40));
                    return `rgba(0, 0, 256, ${alpha})`;
                },
                borderWidth: 1,
                width: ({ chart }) => (chart.chartArea || {}).width / 12,
                height: ({ chart }) => (chart.chartArea || {}).height/12 // Asumiendo 25 lugares
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                offset: true,
                ticks: {
                    display: true
                },
                grid: {
                    display: false
                }
            },
            y: {
                type: 'category',
                // labels: ['Amazona', 'Ancash', 'Bajo'],
                offset: true,
                ticks: {
                    display: true
                },
                grid: {
                    display: false
                }
            },
        },
        plugins: {
            datalabels: {
                color: 'black', // O el color que prefieras para las etiquetas
                anchor: 'center', // Puedes ajustar según necesites
                align: 'center', // Puedes ajustar según necesites
                font: {
                    size: 16, // Ajusta este valor al tamaño de fuente deseado
                },
                formatter: function (value, context) {
                    // Solo devolverá la propiedad 'v' del objeto de datos
                    return context.dataset.data[context.dataIndex].v;
                }
            },
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
        <div className='ml-64 mt-20'>
            <div className='mx-6'>
                <Chart type='matrix' data={data} options={options} />
            </div>
        </div>
    );
}