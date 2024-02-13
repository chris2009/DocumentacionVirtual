import React from 'react'
import axios from 'axios';
import Link from 'next/link';
import ConflictoTable from '@/components/ConflictoTable';

async function loadConflicto() {
    const { data } = await axios.get("http://localhost:3000/api/conflicto")
    return data
}

async function conflictoPage() {
    const conflictos = await loadConflicto()
    return (
        <div className='pl-60 pt-24'>

            <div className="relative px-6">
                <h1 className='text-center font-bold text-2xl pb-6'> Conflicto Social</h1>
                <Link href="/dashboard/conflictoSocial/new">
                    <button className="bg-kaitoke-green-400 hover:bg-kaitoke-green-600 py-2 px-3 rounded-md text-white font-bold mb-4 ml-6">Agregar</button>
                </Link>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-xs text-center">
                                    N°
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs text-center">
                                    Fecha
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs text-center">
                                    Evento
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs text-center">
                                    Lugar
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs text-center">
                                    Riesgo
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs text-center">
                                    Factor
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs text-center">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {conflictos.map((conflicto) => (
                                <ConflictoTable conflicto={conflicto} key={conflicto.id} />
                            ))}
                        </tbody>
                    </table>
                </div>

            </div >
        </div >
    )
}

export default conflictoPage;