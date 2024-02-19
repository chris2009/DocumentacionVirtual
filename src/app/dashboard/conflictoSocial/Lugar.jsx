// import executeQuery from "@/libs/mysql";

// export default async function  Lugar() {
//     const result = await executeQuery("SELECT lugar FROM tbl_lugar ORDER BY lugar", [])

//     return (
//         <select className="border border-kaitoke-green-100 outline-kaitoke-green-200  rounded p-2" defaultValue="">
//             <option value="" disabled hidden>Lugar...</option>
//             {result.map((lugar) => (
//                 <option key={lugar.id} value={lugar.lugar}>{lugar.lugar}</option>
//             ))}
//         </select>
//     )
// }

import React from 'react'

export default function Lugar() {
  return (
    <div>Lugar</div>
  )
}
