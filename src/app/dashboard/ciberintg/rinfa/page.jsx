'use client'

import { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Loading from '@/components/global/loading';
import RinfaTable from '@/components/RinfaTable';
import { PlusIcon } from '@heroicons/react/24/outline';

function rinfaPage() {
    const [rinfas, setRinfas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getRinfas = async () => {
            const response = await axios.get('/api/rinfa');
            setRinfas(response.data);
        };
        getRinfas();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    function getFileNameWithoutExtension(pathName) {
        // Obtener el nombre del archivo desde la última barra diagonal
        const fileNameWithExtension = pathName.substring(pathName.lastIndexOf('/') + 1);

        // Eliminar la extensión del archivo
        const fileNameWithoutExtension = fileNameWithExtension.substring(0, fileNameWithExtension.lastIndexOf('.'));

        return fileNameWithoutExtension;
    }

    const filteredRinfas = rinfas.filter((rinfa) =>
        getFileNameWithoutExtension(rinfa.pathName).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='mx-2'>
            <div className="relative px-4">
                <div className="flex items-center my-4">
                    <Link href="/dashboard/ciberintg/rinfa/new">
                        <button className="flex bg-white border-kaitoke-green-400 text-sm border-[1px] hover:border-kaitoke-green-600 py-2 pl-4 pr-2 rounded-[7px] text-kaitoke-green-400 mr-3">
                            Agregar <PlusIcon className='animate-bounce hover:animate-spin flex w-4 h-full' />
                        </button>
                    </Link>
                    <div className="relative">
                        <input
                            className="peer w-full h-full bg-white font-sans font-normal outline outline-0 focus:outline-0 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-kaitoke-green-500 placeholder-shown:border-t-kaitoke-green-500 border focus:border border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] focus:border-kaitoke-green-700"
                            // placeholder="Buscarasd rinfa..."
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder=" " />
                        
                        <label
                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-[1px] after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-kaitoke-green-200 peer-focus:before:!border-kaitoke-green-900 after:border-kaitoke-green-200 peer-focus:after:!border-kaitoke-green-900">Buscar rinfa
                        </label>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-kaitoke-green-500">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-xs text-center text-white">
                                    Resumen de información de fuente abierta
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs text-center text-white">
                                    Fecha
                                </th>
                                <th>

                                </th>
                            </tr>
                        </thead>
                        <Suspense fallback={<Loading />}>
                            <tbody>
                                {filteredRinfas.map((rinfa) => (
                                    <RinfaTable rinfa={rinfa} key={rinfa.id} />
                                ))}
                            </tbody>
                        </Suspense>
                    </table>
                </div>
            </div >
        </div >
    );
}

export default rinfaPage;