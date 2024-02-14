import React from 'react'
import Link from 'next/link'

async function ConflictoTable({ conflicto }) {

    return (

        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-2 text-justify text-xs">
                {conflicto.evento}
            </td>
            <td className="text-center text-xs px-2">
                <Link key={conflicto.id} href={`/dashboard/conflictoSocial/${conflicto.id}`}>
                    <button className='bg-kaitoke-green-400 hover:bg-kaitoke-green-600 text-white px-5 py-2  rounded-md font-bold'>ver</button>
                </Link>
            </td>
        </tr>

    )
}

export default ConflictoTable