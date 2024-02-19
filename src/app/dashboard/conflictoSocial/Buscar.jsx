// 'use client'
// import axios from 'axios'
// import { useState } from 'react'
// import React from 'react'

// export default function SearchConflictos() {
//   const [query, setQuery] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const response = await axios.get(`/api/conflicto/search?query=${query}`)
//     getSearchResults(response.data)

//   }
//   const getSearchResults = (data) => {
//     // Realiza las operaciones necesarias con los datos de búsqueda y devuelve el resultado
//     return data;
//   }
//   return (
//     <div className='my-2'>
//       <form onSubmit={handleSubmit}>
//         <input className="border border-kaitoke-green-100 outline-kaitoke-green-200  rounded p-2" type="text" placeholder="Buscar conflicto..." value={query} onChange={(e) => setQuery(e.target.value)}>
//         </input>
//         <button className="bg-gray-400 hover:bg-gray-600  text-white py-2 px-3 rounded-md ml-2" type="submit">
//           Buscar
//         </button>
//       </form>
//     </div>
//   )
// }


// 'use client'
// import axios from 'axios'
// import { useState } from 'react'

// export default function SearchConflictos({ getSearchResults }) {
//   const [query, setQuery] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const response = await axios.get(`/api/conflicto`, {
//         params: {
//           query: query
//         }
//       })
//       console.log(query)
//       getSearchResults(response.data)
//     } catch (error) {
//       console.error("Error al realizar la búsqueda:", error)
//     }
//   }

//   return (
//     <div className='my-2'>
//       <form onSubmit={handleSubmit}>
//         <input className="border border-kaitoke-green-100 outline-kaitoke-green-200 rounded p-2" type="text" placeholder="Buscar conflicto..." value={query} onChange={(query) => setQuery(query.evento.)} />
//         <button className="bg-gray-400 hover:bg-gray-600 text-white py-2 px-3 rounded-md ml-2" type="submit">Buscar</button>
//       </form>
//     </div>
//   )
// }

import React from 'react'

export default function Buscar() {
  return (
    <div>Buscar</div>
  )
}
