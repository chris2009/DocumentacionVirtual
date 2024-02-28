'use client'
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Buttons({ rinfaId }) {
    const router = useRouter()
    return (
        <div className='flex gap-2 justify-end mr-2 mb-2'>
            <button
                className='bg-gray-500 hover:bg-gray-700 text-white rounded-full py-2 px-4'
                onClick={() =>
                    router.push(`/rinfa/edit/${rinfaId}`)}
            >

                Editar
            </button>
            <button
                className='bg-red-500 hover:bg-red-700 text-white rounded-full py-2 px-4'
                onClick={async () => {
                    if (confirm('Estás seguro de eliminar el rinfa?')) {
                        const res = await axios.delete('/api/rinfa/' + rinfaId)
                        if (res.status === 204) {
                            router.push(('/rinfa'))
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
