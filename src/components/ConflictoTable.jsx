import React from 'react'
import Link from 'next/link'

async function ConflictoTable({ conflicto }) {

    return (

        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            {/* <td scope="row" className="text-center px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xs">
                {conflicto.id}
            </td>
            <td className="px-2 py-4 text-xs">
                {new Date(conflicto.fecha).toLocaleDateString()}
            </td> */}
            <td className="p-2 text-justify text-xs">
                {conflicto.evento}
            </td>
            {/* <td className="px-2 py-4 text-center text-xs">
                {conflicto.lugar}
            </td>
            <td className="px-2 py-4 text-center text-xs">
                {conflicto.riesgo}
            </td>
            <td className="px-2 py-4 text-center text-xs">
                {conflicto.factor}
            </td> */}
            <td className="text-center text-xs ">
                <Link key={conflicto.id} href={`/dashboard/conflictoSocial/${conflicto.id}`}>
                    <button className='bg-kaitoke-green-400 hover:bg-kaitoke-green-600 text-white px-5 py-2  rounded-md font-bold'>ver</button>
                </Link>
            </td>
        </tr>

    )
}

export default ConflictoTable