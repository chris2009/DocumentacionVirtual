'use client'

import { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Loading from '@/components/global/loading';
import RinfaTable from '@/components/RinfaTable';
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
        <div className='pl-56 pt-14'>
            <div className="relative px-4">
                <Link href="/dashboard/rinfa/new">
                    <button className="bg-kaitoke-green-400 hover:bg-kaitoke-green-600 py-2 px-3 rounded-md text-white font-bold my-2 mx-3">Agregar</button>
                </Link>
                <input
                    type="text"
                    placeholder="Buscar rinfa..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border border-gray-300 rounded-md px-3 py-1 my-4"
                />
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-kaitoke-green-50 dark:bg-gray-700 dark:text-gray-400">
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

