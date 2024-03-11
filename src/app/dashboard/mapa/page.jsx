import React from 'react'
import RiesgoMes from './riesgoMes/page'
import LugarMes from './lugarMes/page'

export default function page() {
  return (
    <div className='ml-56 mt-24 mr-6'>
      <div className='overflow-x-hidden grid grid-cols-1 gap-x-4 gap-y-10'>
        <RiesgoMes />
        <LugarMes />
      </div>
    </div>

  )
}
