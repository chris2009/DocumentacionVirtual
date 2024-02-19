'use client'
import React, { useState } from 'react';
import axios from 'axios';

const SearchConflictos = ({ getSearchResults }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get('/api/conflicto', {
                params: {
                    query: searchQuery
                }
            });
            getSearchResults(response.data);
        } catch (error) {
            console.error("Error al obtener resultados de búsqueda:", error);
        }
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                className="border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Buscar conflicto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
                className="ml-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={handleSearch}
            >
                Buscar
            </button>
        </div>
    );
};

export default SearchConflictos;
