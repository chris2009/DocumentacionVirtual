'use client'
import React, { useState } from 'react';

function Buscar({ onBuscar }) {
    const [busqueda, setBusqueda] = useState('');

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
        onBuscar(e.target.value); // Llama a la función de búsqueda pasando el valor actual de búsqueda
    };

    return (
        <input
            type='text'
            className="border border-kaitoke-green-100 outline-kaitoke-green-200 rounded p-2"
            placeholder="Buscar"
            value={busqueda}
            onChange={handleBusquedaChange}
        />
    );
}

export default Buscar;
