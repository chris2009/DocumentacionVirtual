import { NextResponse } from "next/server";
import React from 'react'
import axios from 'axios';
import Buttons from './Buttons';
import { format } from "@formkit/tempo";

async function loadRinfa(rinfaId) {
    try {
        const { data } = await axios.get('http://localhost:3000/api/rinfa/' + rinfaId)
        return data
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500
            }
        );
    }
}
const conflictoDetail = async ({ params }) => {

    const conflicto = await loadRinfa(params.id)

    function getFileNameWithoutExtension(pathName) {
        // Obtener el nombre del archivo desde la última barra diagonal
        const fileNameWithExtension = pathName.substring(pathName.lastIndexOf('/') + 1);

        // Eliminar la extensión del archivo
        const fileNameWithoutExtension = fileNameWithExtension.substring(0, fileNameWithExtension.lastIndexOf('.'));

        return fileNameWithoutExtension;
    }

    return (
        <div className='pl-60 pt-24 flex justify-center items-center'>
            <div key={conflicto.id} className='rounded-md bg-kaitoke-green-50 mx-6 w-1/2'>
                <div className=' px-6 py-4 '>
                    <h1 className="text-center text-xl font-bold text-gray-700">Resumen de infomación de fuente abierta</h1>
                    <p className='text-gray-700 font-bold'>ID:&nbsp;<span className='font-normal text-sm'>{conflicto.id}</span></p>
                    <p className='text-gray-700 font-bold'>Fecha:&nbsp;<span className='font-normal text-sm'>{format(conflicto.fecha, "full", "es")}</span></p>
                    <p className='text-gray-700 font-bold text-justify'>Nombre:&nbsp;<span className='font-normal text-sm'>{getFileNameWithoutExtension(conflicto.pathName)}</span></p>
                </div>
                <Buttons rinfaId={conflicto.id} />
            </div>
        </div>
    )
}
export default conflictoDetail;
