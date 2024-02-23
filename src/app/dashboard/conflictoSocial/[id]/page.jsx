import { NextResponse } from "next/server";
import React from 'react'
import axios from 'axios';
import Buttons from './Buttons';
import { format } from "@formkit/tempo"


async function loadConflicto(conflictoId) {
    try {
        const { data } = await axios.get('http://localhost:3000/api/conflicto/' + conflictoId)
        // console.log(data.evento)
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

    const conflicto = await loadConflicto(params.id)

    return (
        <div className='pl-60 pt-24 flex justify-center items-center'>
            <div key={conflicto.id} className='rounded-md bg-kaitoke-green-50 mx-6'>
                <div className=' px-6 py-4 '>
                    <p className='text-gray-700 font-bold'>ID:&nbsp;<span className='font-normal text-sm'>{conflicto.id}</span></p>
                    <p className='text-gray-700 font-bold'>Fecha:&nbsp;<span className='font-normal text-sm'>{format(conflicto.fecha, "full", "es")}</span></p>
                    <p className='text-gray-700 font-bold text-justify'>Evento:&nbsp;<span className='font-normal text-sm'>{conflicto.evento}</span></p>
                    <p className='text-gray-700 font-bold'>Lugar:&nbsp;<span className='font-normal text-sm'>{conflicto.lugar}</span></p>
                    <p className='text-gray-700 font-bold'>Riesgo:&nbsp;<span className='font-normal text-sm'>{conflicto.riesgo}</span></p>
                    <p className='text-gray-700 font-bold'>Factor:&nbsp;<span className='font-normal text-sm'>{conflicto.factor}</span></p>
                    <p className='text-gray-700 font-bold'>Tipo de conflicto social:&nbsp;<span className='font-normal text-sm'>{conflicto.tipo_conflicto_social}</span></p>
                </div>
                <Buttons conflictoId={conflicto.id} />
            </div>
        </div>
    )
}
export default conflictoDetail;