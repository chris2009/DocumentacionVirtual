'use client'

import { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Loading from '@/components/global/loading';
import RinfaTable from '@/components/RinfaTable';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';

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
        <div className='ml-64 mt-20'>
            <div className="relative px-4">
                <div className="flex items-center my-4">
                    <Link href="/dashboard/rinfa/new">
                        <button className="flex border-kaitoke-green-400 text-sm border-[1px] hover:border-kaitoke-green-600 py-2 pl-4 pr-2 rounded-[7px] text-kaitoke-green-400 mr-3">
                            Agregar <PlusIcon className='animate-bounce hover:animate-spin flex w-4 h-full' />
                        </button>
                    </Link>
                    {/* <div className="relative">
                        <input
                            // type="text"
                            placeholder="Buscarasd rinfa..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="border border-gray-300 rounded-full px-3 py-1 focus:border-kaitoke-green-300 focus:border-2"
                        />
                        <MagnifyingGlassIcon className='w-5 h-5 text-gray-400 absolute top-1/2 transform -translate-y-1/2 right-3' />
                    </div> */}
                    <div className="relative">
                        <input
                            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-kaitoke-green-500 placeholder-shown:border-t-kaitoke-green-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                            // placeholder="Buscarasd rinfa..."
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder=" " />
                        <label
                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-kaitoke-green-200 peer-focus:before:!border-kaitoke-green-900 after:border-kaitoke-green-200 peer-focus:after:!border-kaitoke-green-900">Buscar rinfa
                        </label>
                        <MagnifyingGlassIcon className='w-5 h-5 text-gray-400 absolute top-1/2 transform -translate-y-1/2 right-3' />
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-kaitoke-green-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-xs text-center">
                                    Resumen de información de fuente abierta
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs text-center">
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



// Con paginación



// import { useState, useEffect, Suspense } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import ConflictoTable from '@/components/ConflictoTable';
// import Loading from '../rinfa/loading';

// function conflictoPage() {
//     const [conflictos, setRinfas] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(10); // Número de elementos por página

//     useEffect(() => {
//         const getRinfas = async () => {
//             const response = await axios.get('/api/conflicto');
//             setRinfas(response.data);
//         };
//         getRinfas();
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

