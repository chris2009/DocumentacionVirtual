import React from 'react'
import axios from 'axios';
import Link from 'next/link';
import ConflictoTable from '@/components/ConflictoTable';

async function loadConflicto() {
    const { data } = await axios.get("http://localhost:3000/api/conflicto")
    return data
}

async function rinfaPage() {
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
                    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
                        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Anterior</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                            </li>
                            <li>
                                <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Siguiente</a>
                            </li>
                        </ul>
                    </nav>
                </div>

            </div >
        </div >
    )
}

export default rinfaPage;


