'use client'

import { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ConflictoTable from '@/components/ConflictoTable';
import Loading from '@/components/global/loading';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
function conflictoPage() {
    const [conflictos, setConflictos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getConflictos = async () => {
            const response = await axios.get('/api/conflicto');
            setConflictos(response.data);
        };
        getConflictos();
    }, []);

    const handleSearch = ((e) => {
        setSearchTerm(e.target.value);
    });

    const filteredConflictos = conflictos.filter((conflicto) =>
        conflicto.evento.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='ml-64 pt-14'>
            <div className="relative px-4">
                <div className="flex items-center my-4">
                    <Link href="/dashboard/conflictoSocial/new">
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
                                {filteredConflictos.map((conflicto) => (
                                    <ConflictoTable conflicto={conflicto} key={conflicto.id} />
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



// Con paginación



// import { useState, useEffect, Suspense } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import ConflictoTable from '@/components/ConflictoTable';
// import Loading from '../rinfa/loading';

// function conflictoPage() {
//     const [conflictos, setConflictos] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(10); // Número de elementos por página

//     useEffect(() => {
//         const getConflictos = async () => {
//             const response = await axios.get('/api/conflicto');
//             setConflictos(response.data);
//         };
//         getConflictos();
//     }, []);

//     const handleSearch = (e) => {
//         setSearchTerm(e.target.value);
//         setCurrentPage(1); // Resetear a la primera página al hacer una búsqueda
//     };

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const filteredConflictos = conflictos.filter((conflicto) =>
//         conflicto.evento.toLowerCase().includes(searchTerm.toLowerCase())
//     ).slice(indexOfFirstItem, indexOfLastItem);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     return (
//         <div className='pl-56 pt-14'>
//             <div className="relative px-4">
//                 <Link href="/dashboard/conflictoSocial/new">
//                     <button className="bg-kaitoke-green-400 hover:bg-kaitoke-green-600 py-2 px-3 rounded-md text-white font-bold my-2 mx-3">Agregar</button>
//                 </Link>
//                 <input
//                     type="text"
//                     placeholder="Buscar evento..."
//                     value={searchTerm}
//                     onChange={handleSearch}
//                     className="border border-gray-300 rounded-md px-3 py-1 my-4"
//                 />
//                 <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//                     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                         <thead className="text-xs text-gray-700 uppercase bg-kaitoke-green-50 dark:bg-gray-700 dark:text-gray-400">
//                             <tr>
//                                 <th scope="col" className="px-6 py-3 text-xs text-center">
//                                     Evento
//                                 </th>
//                                 <th></th>
//                             </tr>
//                         </thead>
//                         <Suspense fallback={<Loading />}>
//                             <tbody>
//                                 {filteredConflictos.map((conflicto) => (
//                                     <ConflictoTable conflicto={conflicto} key={conflicto.id} />
//                                 ))}
//                             </tbody>
//                         </Suspense>
//                     </table>
//                 </div>
//                 <div className="flex justify-center mt-4">
//                     <button
//                         onClick={() => paginate(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         className="mr-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
//                     >
//                         Anterior
//                     </button>
//                     <button
//                         onClick={() => paginate(currentPage + 1)}
//                         disabled={indexOfLastItem >= conflictos.length}
//                         className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
//                     >
//                         Siguiente
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default conflictoPage;
