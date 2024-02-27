import React from 'react'
import Lugar from '@/app/conflictoSocial/Lugar';
import Factor from '@/app/conflictoSocial/Factor';
import Riesgo from '@/app/conflictoSocial/Riesgo';
import Buscar from '@/app/conflictoSocial/Buscar';
import Link from 'next/link'
export default function FiltroConflicto() {
    return (
        <div className='flex  items-center justify-around text-xs text-gray-700'>
            <Link href="/dashboard/conflictoSocial/new">
                <button className="bg-kaitoke-green-400 hover:bg-kaitoke-green-600 py-2 px-3 rounded-md text-white font-bold my-2 mx-3">Agregar</button>
            </Link>
            <Buscar />
            <input type='date' className="border border-kaitoke-green-100 outline-kaitoke-green-200  rounded p-2">
            </input>
            <Lugar />
            <Riesgo />
            <Factor />
        </div>
    )
}
