import React from 'react'
import axios from 'axios';
import Buttons from './Buttons';

async function loadConflicto(conflictoId) {
    const { data } = await axios.get('http://localhost:3000/api/conflicto/' + conflictoId)
    return data
}
const conflictoDetail = async ({ params }) => {

    const conflicto = await loadConflicto(params.id)
    // console.log(conflicto)

    return (
        <div className='pl-60 pt-24 flex justify-center items-center'>
            <div key={conflicto.id} className='rounded-md bg-kaitoke-green-200 mx-6'>
                <div className=' px-6 py-4 '>
                    <p className='text-gray-900 font-bold'>ID:&nbsp;<span className='font-normal'>{conflicto.id}</span></p>
                    <p className='text-gray-900 font-bold'>Fecha:&nbsp;<span className='font-normal'>{conflicto.fecha}</span></p>
                    <p className='text-gray-900 font-bold'>Evento:&nbsp;<span className='font-normal'>{conflicto.evento}</span></p>
                    <p className='text-gray-900 font-bold'>Lugar:&nbsp;<span className='font-normal'>{conflicto.lugar}</span></p>
                    <p className='text-gray-900 font-bold'>Riesgo:&nbsp;<span className='font-normal'>{conflicto.riesgo}</span></p>
                    <p className='text-gray-900 font-bold'>Factor:&nbsp;<span className='font-normal'>{conflicto.factor}</span></p>
                </div>
                <Buttons conflictoId={conflicto.id} />
            </div>
        </div>
    )
}
export default conflictoDetail;