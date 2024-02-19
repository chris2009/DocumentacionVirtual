'use client'
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Buttons({ rinfaId }) {
    const router = useRouter()
    return (
        <div className='flex gap-2 justify-end mr-2 mb-2'>
            <button
                className='bg-gray-500 hover:bg-gray-700 text-white rounded py-2 px-3'
                onClick={() =>
                    router.push(`/dashboard/rinfa/edit/${rinfaId}`)}
            >

                Editar
            </button>
            <button
                className='bg-red-500 hover:bg-red-700 text-white rounded py-2 px-3'
                onClick={async () => {
                    if (confirm('Estás seguro de eliminar el conflicto?')) {
                        const res = await axios.delete('/api/conflicto/' + rinfaId)
                        if (res.status === 204) {
                            router.push(('/dashboard/rinfa'))
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
