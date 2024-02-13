'use client';
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

function ConflictoForm() {



    const [conflicto, setConflicto] = useState({
        ano_fiscal: "",
        fecha: "",
        evento: "",
        lugar: "",
        riesgo: "",
        factor: "",
        tipo_conflicto_social: ""
    });

    const form = useRef(null)
    const router = useRouter()
    const params = useParams()


    const handleChange = (e) => {
        setConflicto({
            ...conflicto,
            [e.target.name]: e.target.value,
        })
    };

    useEffect(() => {
        if (params.id) {
            axios.get('/api/conflicto/' + params.id).then(res => {
                setConflicto({
                    ano_fiscal: res.data.ano_fiscal,
                    fecha: res.data.fecha,
                    evento: res.data.evento,
                    lugar: res.data.lugar,
                    riesgo: res.data.riesgo,
                    factor: res.data.factor,
                    tipo_conflicto_social: res.data.tipo_conflicto_social
                })
            })
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!params.id) {
            const res = await axios.post('/api/conflicto', conflicto);
        } else {
            const res = await axios.put('/api/conflicto/' + params.id, conflicto);

        }
        form.current.reset();
        router.refresh();
        router.push('/dashboard/conflictoSocial');
    };

    return (
        <form
            className="max-w-sm mx-auto"
            onSubmit={handleSubmit}
            ref={form}
        >
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Año fiscal</label>
                <input
                    autoFocus
                    type="text"
                    name="ano_fiscal"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    value={conflicto.ano_fiscal || ""}
                    required />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    value={conflicto.fecha || ""}
                    required />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Evento</label>
                <textarea
                    name="evento"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    value={conflicto.evento || ""}
                    required />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lugar</label>
                <input
                    type="text"
                    name="lugar"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    value={conflicto.lugar || ""}
                    required />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Riesgo</label>
                <input
                    type="text"
                    name="riesgo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    value={conflicto.riesgo || ""}
                    required />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Factor</label>
                <input
                    type="text"
                    name="factor"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    value={conflicto.factor || ""}
                    required />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">tipo de conflicto social </label>
                <input
                    type="text"
                    name="tipo_conflicto_social"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    value={conflicto.tipo_conflicto_social || ""}
                    required />
            </div>
            <div className="flex items-start mb-5">

            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{params.id ? "Actualizar" : "Guardar"}</button>
        </form>
    )
}

export default ConflictoForm