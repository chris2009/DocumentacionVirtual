// 'use client'

// import { useState, useEffect, Suspense } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import Loading from '@/components/global/loading';
// import ConflictoTable from '@/components/ConflictoTable';
// import { PlusIcon } from '@heroicons/react/24/outline'

// function conflictoPage() {
//     const [conflictos, setConflictos] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         const getConflictos = async () => {
//             const response = await axios.get('/api/conflicto');
//             setConflictos(response.data);
//         };
//         getConflictos();
//     }, []);

//     const handleSearch = ((e) => {
//         setSearchTerm(e.target.value);
//     });

//     const filteredConflictos = conflictos.filter((conflicto) =>
//         conflicto.evento.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className='mx-2 mt-4'>
//             <div className="relative px-4">
//                 <div className="flex items-center my-4">
//                     <Link href="/dashboard/ciberintg/conflictoSocial/new">
//                         <button className="flex bg-white border-kaitoke-green-400 text-sm border-[1px] hover:border-kaitoke-green-600 py-2 pl-4 pr-2 rounded-[7px] text-kaitoke-green-400 mr-3">
//                             Agregar <PlusIcon className='animate-bounce hover:animate-spin flex w-4 h-full' />
//                         </button>
//                     </Link>
//                     <div className="relative">
//                         <input
//                             className="peer w-full h-full bg-white font-sans font-normal outline outline-0 focus:outline-0 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-kaitoke-green-500 placeholder-shown:border-t-kaitoke-green-500 border focus:border border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] focus:border-kaitoke-green-700"
//                             // placeholder="Buscarasd rinfa..."
//                             value={searchTerm}
//                             onChange={handleSearch}
//                             placeholder=" " />

//                         <label
//                             className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-[1px] after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-kaitoke-green-200 peer-focus:before:!border-kaitoke-green-900 after:border-kaitoke-green-200 peer-focus:after:!border-kaitoke-green-900">Buscar evento
//                         </label>
//                     </div>
//                 </div>
//                 <div className="relative overflow-x-auto shadow-md sm:rounded-[7px]">
//                     <table className="w-full text-sm text-left rtl:text-right text-gray-500">
//                         <thead className="text-xs text-white uppercase bg-kaitoke-green-400">
//                             <tr>
//                                 <th scope="col" className="px-6 py-3 text-xs text-center">
//                                     Evento
//                                 </th>
//                                 <th>

//                                 </th>
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
//             </div >

//         </div >
//     );
// }

// export default conflictoPage;

// Añade useState al import de React al inicio de tu archivo

'use client'
import { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Loading from '@/components/global/loading';
import ConflictoTable from '@/components/ConflictoTable';
import { PlusIcon } from '@heroicons/react/24/outline'

function conflictoPage() {
    const [conflictos, setConflictos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    // Estados para paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(18);

    // Nuevas funciones para manejar los clics de paginación
    const goToNextPage = () => setCurrentPage(page => Math.min(page + 1, pageNumbers.length));
    const goToPreviousPage = () => setCurrentPage(page => Math.max(page - 1, 1));

    const MAX_PAGES = 5;
    const paginationStart = Math.max(currentPage - (MAX_PAGES / 2), 1);
    const pageNumbers = [];
    const paginationEnd = Math.min(paginationStart + MAX_PAGES, pageNumbers.length);

    useEffect(() => {
        const getConflictos = async () => {
            const response = await axios.get('/api/conflicto');
            setConflictos(response.data);
        };
        getConflictos();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Vuelve a la primera página al buscar
    };

    // Calcula los conflictos filtrados basándose en el término de búsqueda
    const filteredConflictos = conflictos.filter((conflicto) =>
        conflicto.evento.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calcula los ítems a mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredConflictos.slice(indexOfFirstItem, indexOfLastItem);

    // Calcula el total de páginas
    for (let i = 1; i <= Math.ceil(filteredConflictos.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    // Componente para los números de página
    const renderPageNumbers = () => {
        const pages = [];
        for (let i = paginationStart; i <= paginationEnd; i++) {
            pages.push(
                <button onClick={() => setCurrentPage(i)}
                    className={`page-number ${i === currentPage ? 'active' : ''}`}>
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className='mx-2 mt-4'>
            <div className="relative px-4">
                <div className="flex items-center my-4">
                    <Link href="/dashboard/ciberintg/conflictoSocial/new">
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
                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-[1px] after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-kaitoke-green-200 peer-focus:before:!border-kaitoke-green-900 after:border-kaitoke-green-200 peer-focus:after:!border-kaitoke-green-900">Buscar evento
                        </label>
                    </div>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-[7px]">
                {/* Tabla existente */}
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
                            {currentItems.map((conflicto) => (
                                <ConflictoTable conflicto={conflicto} key={conflicto.id} />
                            ))}
                        </tbody>
                    </Suspense>
                </table>
            </div>
            {/* Navegación de paginación */}
            <div className="flex justify-center my-4">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    // className='bg-kaitoke-green-500 px-2 py-1 mr-2 rounded-[7px] text-white'
                    className={`bg-kaitoke-green-500 px-2 py-1 mr-2 rounded-[7px] text-white ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    Anterior
                </button>
                {currentPage > 1 + MAX_PAGES / 2 && (
                    <>
                        <button
                            onClick={() => setCurrentPage(1)}
                            className='bg-kaitoke-green-500 p-2 rounded-[7px] text-white mr-2'
                        >
                            1
                        </button>
                        <span className='bg-kaitoke-green-500 p-2 rounded-[7px] text-white mr-2'>...</span>
                    </>
                )}
                {renderPageNumbers()}
                {currentPage < (pageNumbers.length - MAX_PAGES / 2) && (
                    <>
                        <button
                            onClick={() => setCurrentPage(pageNumbers.length)}
                            className='bg-kaitoke-green-500 p-2 rounded-[7px] text-white mr-2'
                        >
                            {pageNumbers.length}
                        </button>
                    </>
                )}
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === pageNumbers.length}
                    className={`bg-kaitoke-green-500 px-2 py-1 mr-2 rounded-[7px] text-white ${currentPage === pageNumbers.length ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default conflictoPage;