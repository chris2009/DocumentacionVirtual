import React from 'react'
import executeQuery from '@/libs/mysql'

function loadRinfa(rinfaId){
    console.log(rinfaId)
}

const rinfaDetail = async ({ params }) => {
    loadRinfa(params.id)
    const result = await executeQuery("SELECT * FROM tbl_escalafon", [])
    return (
        <div className="relative overflow-x-auto px-6">

            <h1 className='text-center'> RESUMEN DE INFORMACIÓN DE FUENTE ABIERTA</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            N°
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fecha
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Evento
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Lugar
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Riesgo
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Factor
                        </th>
                    </tr>
                </thead>
                <tbody >
                    {/* {result.map((rinfa) => ( */}
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white text-center">
                                {params.id}
                            </th>
                            <td className="px-6 py-4 text-center">
                                {params.fecha}
                            </td>
                            <td className="px-6 py-4 text-center">
                                {params.evento}
                            </td>
                            <td className="px-6 py-4 text-center">
                                {params.lugar}
                            </td>
                            <td className="px-6 py-4 text-center">
                                {params.riesgo}
                            </td>
                            <td className="px-6 py-4 text-center">
                                {params.factor}
                            </td>
                            <td className="px-6 py-4 text-center">
                            </td>
                        </tr>
                    {/* ))} */}
                </tbody>
            </table>
        </div>
    )
}
export default rinfaDetail;
