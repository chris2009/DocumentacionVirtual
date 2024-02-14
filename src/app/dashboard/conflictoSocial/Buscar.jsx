'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Buscar = () => {
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [conflictos, setConflictos] = useState([]);

    useEffect(() => {
        const loadConflicto = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/api/conflicto");
                setConflictos(data);
            } catch (error) {
                console.error('Error al cargar conflictos:', error);
            }
        };
        loadConflicto();
    }, []);

    const handleBuscar = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setTerminoBusqueda(searchTerm);

        const filteredConflictos = conflictos.filter(conflicto =>
            conflicto.evento.toLowerCase().includes(searchTerm) 
        );

        // Llama a la función proporcionada por el componente padre para pasar los resultados de la búsqueda
        onBuscar(filteredConflictos);
    };

    return (
        <div>
            <input
                type="text"
                value={terminoBusqueda}
                onChange={handleBuscar}
               className="border border-kaitoke-green-100 outline-kaitoke-green-200 rounded p-2"
                placeholder="Buscar..."
            />
        </div>
    );
};

export default Buscar;