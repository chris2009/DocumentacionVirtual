// 'use client'
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
        <div className='pl-56 pt-14'>

            <div className="relative px-4">
                <h1 className='text-center font-bold text-xl py-1 my-1 bg-kaitoke-green-100 rounded-md text-gray-700'> Conflicto Social</h1>
                <div className='flex  items-center justify-between'>
                    <Link href="/dashboard/conflictoSocial/new">
                        <button className="bg-kaitoke-green-400 hover:bg-kaitoke-green-600 py-2 px-3 rounded-md text-white font-bold my-2 ml-6">Agregar</button>
                    </Link>
                    <p>
                        Fecha:
                    </p>
                    <input type='date'>
                    </input>
                    <p>
                        Lugar:
                    </p>
                    <select>
                        <option>Callao</option>
                        <option>Lima</option>
                        <option>Loreto</option>
                    </select>
                    <p>
                        riesgo
                    </p>
                    <select>
                        <option>Alto</option>
                        <option>Intermedio</option>
                        <option>Bajo</option>
                    </select>
                    <p>
                        Factor
                    </p>
                    
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-kaitoke-green-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {/* <th scope="col" className="px-6 py-3 text-xs text-center">
                                    N°
                                </th> */}
                                {/* <th scope="col" className="px-6 py-3 text-xs text-center">
                                    Fecha
                                </th> */}
                                <th scope="col" className="px-6 py-3 text-xs text-center">
                                    Evento
                                </th>
                                {/* <th scope="col" className="px-6 py-3 text-xs text-center">
                                    Lugar
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs text-center">
                                    Riesgo
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs text-center">
                                    Factor
                                </th> */}
                                <th scope="col" className="px-6 py-3 text-xs text-center">
                                    Detalles
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