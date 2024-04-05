import React from 'react';

const Paginacion = ({ paginaActual, totalPaginas, irAPaginaAnterior, irAPaginaSiguiente, irAPagina }) => {
    // Array de todas las páginas: [1, 2, ..., totalPaginas]
    const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center space-x-1">
            <button
                className={`px-3 py-1 rounded-lg ${paginaActual === 1
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-gray-200'} transition-colors`}
                onClick={irAPaginaAnterior}
                disabled={paginaActual === 1}
                aria-label="Página anterior"
            >
                Anterior
            </button>

            {paginas.map((numero) => (
                <button
                    key={numero}
                    className={`px-3 py-1 rounded-lg ${paginaActual === numero
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-200'} transition-colors`}
                    onClick={() => irAPagina(numero)}
                    aria-label={`Ir a la página ${numero}`}
                >
                    {numero}
                </button>
            ))}

            <button
                className={`px-3 py-1 rounded-lg ${paginaActual === totalPaginas
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-gray-200'} transition-colors`}
                onClick={irAPaginaSiguiente}
                disabled={paginaActual === totalPaginas}
                aria-label="Página siguiente"
            >
                Siguiente
            </button>
        </div>
    );
};

export default Paginacion;
