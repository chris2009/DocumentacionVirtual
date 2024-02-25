import React from 'react'
import Link from 'next/link'
import { format } from "@formkit/tempo"
import { EyeIcon } from '@heroicons/react/24/outline';

function getFileNameWithoutExtension(pathName) {
    // Obtener el nombre del archivo desde la última barra diagonal
    const fileNameWithExtension = pathName.substring(pathName.lastIndexOf('/') + 1);

    // Eliminar la extensión del archivo
    const fileNameWithoutExtension = fileNameWithExtension.substring(0, fileNameWithExtension.lastIndexOf('.'));

    return fileNameWithoutExtension;
}

function RinfaTable({ rinfa }) {

    return (

        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-2 text-justify text-xs">
                {getFileNameWithoutExtension(rinfa.pathName)}
            </td>
            <td className="px-6 py-2 text-justify text-xs">
                {format((rinfa.fecha), "full", "es")}
            </td>
            <td className="text-center text-xs px-2 py-1 flex justify-end">
                <Link key={rinfa.id} href={`/dashboard/rinfa/${rinfa.id}`}>
                <button className='bg-kaitoke-green-400 hover:bg-kaitoke-green-600 text-white px-5 py-2  rounded-full font-bold'><EyeIcon className='animate-pulse w-4 h-full'/></button>
                </Link>
            </td>
        </tr>

    )
}

export default RinfaTable