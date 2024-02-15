import axios from 'axios';
import Link from 'next/link';
import ConflictoTable from '@/components/ConflictoTable';
import Lugar from './Lugar';
import Factor from './Factor';
import Riesgo from './Riesgo';
import Buscar from './Buscar';

async function loadConflicto() {
    const { data } = await axios.get("http://localhost:3000/api/conflicto")
    return data
}

async function conflictoPage() {
    const conflictos = await loadConflicto()

    return (
            <div className='pl-56 pt-14'>
                <div className="relative px-4">
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
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-kaitoke-green-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-xs text-center">
                                        Evento
                                    </th>
                                    <th>

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

export default conflictoPage
