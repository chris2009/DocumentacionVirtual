import React from 'react'
import axios from 'axios';
import ConflictoForm from '@/components/ConflictoForm';

async function loadConflicto(conflictoId) {
    const { data } = await axios.get('http://localhost:3000/api/conflicto/' + conflictoId)
    return data
}
const conflictoDetail = async ({ params }, { conflicto }) => {

    const conflicto = await loadConflicto(params.id)
    console.log(conflicto)

    return (
        <div className='flex justify-center items-center h-screen'>
            <ConflictoForm conflicto={conflicto} key={conflicto.id} />
        </div>
    )
}
export default conflictoDetail;