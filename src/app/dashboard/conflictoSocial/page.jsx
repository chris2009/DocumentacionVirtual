import axios from 'axios';
import Link from 'next/link';
import ConflictoTable from '@/components/ConflictoTable';
import FiltroConflicto from '@/components/FiltroConflicto';

async function loadConflicto() {
    const { data } = await axios.get("http://localhost:3000/api/conflicto")
    return data
}

async function conflictoPage() {
    const conflictos = await loadConflicto()

    return (
            <div className='pl-56 pt-14'>
                <div className="relative px-4">
                   <FiltroConflicto />
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
