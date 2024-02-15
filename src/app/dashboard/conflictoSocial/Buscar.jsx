// 'use client'
// import React, { useState } from 'react';

// function Buscar({ onBuscar }) {
//     const [busqueda, setBusqueda] = useState('');

//     const handleBusquedaChange = (e) => {
//         setBusqueda(e.target.value);
//         onBuscar(e.target.value); // Llama a la función de búsqueda pasando el valor actual de búsqueda
//     };

//     return (
//         <input
//             type='text'
//             className="border border-kaitoke-green-100 outline-kaitoke-green-200 rounded p-2"
//             placeholder="Buscar"
//             value={busqueda}
//             onChange={handleBusquedaChange}
//         />
//     );
// }

// export default Buscar;

'use client'
// import React, { useState } from 'react';

// export default function Buscar({ onSearch }) {
//     const [query, setQuery] = useState('');

//     const handleInputChange = (event) => {
//         setQuery(event.target.value);
//         onSearch(event.target.value);
//     };

//     return (
//         <input
//             type='text'
//             placeholder='Buscar evento...'
//             value={query}
//             onChange={handleInputChange}
//             className="border border-kaitoke-green-100 outline-kaitoke-green-200  rounded p-2"
//         />
//     );
// }

// Buscar.jsx
import React, { useState } from 'react';

const Buscar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <input
            type='text'
            placeholder='Buscar evento...'
            value={query}
            onChange={handleInputChange}
            className="border border-kaitoke-green-100 outline-kaitoke-green-200 rounded p-2"
        />
    );
};

export default Buscar;
