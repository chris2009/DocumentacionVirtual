import React from 'react'
import Link from 'next/link'

async function RinfaTable({ rinfa }) {

    return (

        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-2 text-justify text-xs">
                {rinfa.evento}
            </td>
            <td className="text-center text-xs px-2">
                <Link key={rinfa.id} href={`/dashboard/rinfa/${rinfa.id}`}>
                    <button className='bg-kaitoke-green-400 hover:bg-kaitoke-green-600 text-white px-5 py-2  rounded-md font-bold'>ver</button>
                </Link>
            </td>
        </tr>

    )
}

export default RinfaTable