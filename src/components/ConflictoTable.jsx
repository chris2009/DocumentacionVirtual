import React from 'react'
import Link from 'next/link'
import { EyeIcon } from '@heroicons/react/24/outline'

function ConflictoTable({ conflicto }) {

    return (

        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-2 text-justify text-xs">
                {conflicto.evento}
            </td>
            <td className="text-center text-xs px-2 justify-center pr-6">
                <Link key={conflicto.id} href={`/dashboard/conflictoSocial/${conflicto.id}`}>
                    <button><EyeIcon className='animate-pulse w-4 h-full'/></button>
                </Link>
            </td>
        </tr>

    )
}

export default ConflictoTable
