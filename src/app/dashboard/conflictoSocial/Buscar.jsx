'use client'
import React, { useState } from 'react';

function Buscar({ conflictos, setFilteredConflictos }) {
    const [searchTerm, setSearchTerm] = useState('');
    // const [filteredConflictos, setFilteredConflictos] = useState([]);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filtered = conflictos.filter(conflicto =>
            conflicto.evento.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredConflictos(filtered);
    };

    return (
        <input
            type='text'
            className="border border-kaitoke-green-100 outline-kaitoke-green-200 rounded p-2"
            placeholder="Buscar evento..."
            value={searchTerm}
            onChange={handleSearch}
        />
    );
}

export default Buscar;

