'use client'

import { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Loading from '@/components/global/loading';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import CiTable from '@/components/CiTable';


function conflictoPage() {
    const [cis, setCIS] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getCI = async () => {
            const response = await axios.get('/api/contrainteligencia');
            setCIS(response.data);
        };
        getCI();
    }, []);

    const handleSearch = ((e) => {
        setSearchTerm(e.target.value);
    });

    const filteredCI = cis.filter((ci) =>
        ci.evento.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className=''>
            <div className="relative px-4">
                <div className="flex items-center my-4">
                    <Link href="/dashboard/contrainteligencia/new">
                        <button className="flex bg-kaitoke-green-400 hover:bg-kaitoke-green-600 py-2 pl-4 pr-2 rounded-full text-white mr-3">
                            Agregar <PlusIcon className='animate-bounce hover:animate-spin flex w-4 h-full' />
                        </button>
                    </Link>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar evento..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="border border-gray-300 rounded-full px-3 py-1"
                        />
                        <MagnifyingGlassIcon className='w-5 h-5 text-gray-400 absolute top-1/2 transform -translate-y-1/2 right-3' />
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-white uppercase bg-kaitoke-green-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-xs text-center">
                                    Evento
                                </th>
                                <th>

                                </th>
                            </tr>
                        </thead>
                        <Suspense fallback={<Loading />}>
                            <tbody>
                                {filteredCI.map((cis) => (
                                    <CiTable ci={cis} key={cis.id} />
                                ))}
                            </tbody>
                        </Suspense>
                    </table>
                </div>
            </div >

        </div >
    );
}

export default conflictoPage;