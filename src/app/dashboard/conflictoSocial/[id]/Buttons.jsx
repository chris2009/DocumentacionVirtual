'use client'
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Buttons({ conflictoId }) {
    const router = useRouter()
    return (
        <div className='flex gap-2 justify-end mr-2 mb-2'>
            <button
                className='bg-gray-500 hover:bg-gray-700 text-white rounded py-2 px-3'
                onClick={() =>
                    router.push(`/dashboard/conflictoSocial/edit/${conflictoId}`)}
            >

                Editar
            </button>
            <button
                className='bg-red-500 hover:bg-red-700 text-white rounded py-2 px-3'
                onClick={async () => {
                    if (confirm('Estás seguro de eliminar el conflicto?')) {
                        const res = await axios.delete('/api/conflicto/' + conflictoId)
                        if (res.status === 204) {
                            router.push(('/dashboard/conflictoSocial'))
                            router.refresh()
                        }
                    }
                }}
            >

                Eliminar
            </button>
        </div>
    )
}
