'use client'

import executeQuery from "@/libs/mysql";
import { useEffect } from "react";

export default function Factor() {
    useEffect(() => {
        // Realiza la consulta SQL
        executeQuery('SELECT factor FROM factor', (err, results) => {
            if (err) {
                console.error('Error al realizar la consulta:', err);
                return;
            }
            // Extrae los nombres de los resultados y los guarda en el estado
            const factores = results.map(result => result.factor);
            setNombres(nombres);
        });
    }, []);
    return (
        <select className="border border-gray-300 rounded p-2" defaultValue="">
            <option value="" disabled hidden>Selecciona un nombre</option>
            {/* Mapea los nombres y muéstralos en un select */}
            {nombres.map((nombre, index) => (
                <option key={index} value={nombre}>{nombre}</option>
            ))}
        </select>
    )
}
