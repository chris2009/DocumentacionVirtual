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

export default function MatrizCategoria() {
    const [matrizCategoria, setMatrizCategoria] = useState([]);

    useEffect(() => {
        const getMatrizCategoria = async () => {
            try {
                const response = await axios.get('/api/contrainteligencia/matrizCategoria');
                setMatrizCategoria(response.data); // Asumiendo que la respuesta es un arreglo
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        getMatrizCategoria();
    }, []);

    // Acumulación de datos
    const datosAcumulados = matrizCategoria.reduce((acc, { mes, catAcro, cantidad }) => {
        // Creamos una clave única para cada combinación de mes y riesgo
        const clave = `${mapearNumeroMesANombre(mes)}-${catAcro}`;
        // Si ya existe, sumamos a la cantidad existente
        if (acc[clave]) {
            acc[clave].v += cantidad;
        } else {
            // Si no existe, creamos una nueva entrada
            acc[clave] = { x: mapearNumeroMesANombre(mes), y: catAcro, v: cantidad };
        }
        return acc;
    }, {});

    // Convertimos el objeto acumulativo en un array para el gráfico
    const datosGrafico = Object.values(datosAcumulados);

    // Configuración de los datos para Chart.js
    const data = {
        datasets: [
            {
                label: 'Cantidad de eventos por categoria y mes',
                data: datosGrafico,
                backgroundColor: function (context) {
                    const data = context.dataset.data[context.dataIndex];
                    if (!data) {
                        return 'rgba(100, 256, 150, 0.5)'; // Retornar un color por defecto si no hay datos.
                    }
                    const value = data.v;
                    const alpha = Math.max(0, Math.min(1, (value - 5) / 40));
                    return `rgba(100, 256, 150, ${alpha})`;
                },
                borderWidth: 1,
                width: ({ chart }) => (chart.chartArea || {}).width / 12,
                height: ({ chart }) => (chart.chartArea || {}).height / 8 // Asumiendo 3 niveles de riesgo
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
                // labels: ['Transporte', 'Intermedio', 'Bajo'],
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
        <div className=''>
            <div className='mx-6'>
                <Chart type='matrix' data={data} options={options} />
            </div>
        </div>
    );
}
