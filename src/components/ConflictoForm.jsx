'use client';
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

function ConflictoForm() {



    const [conflicto, setConflicto] = useState({
        ano_fiscal: "2024",
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
                    fecha: res.data.fecha.split('T')[0],
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
            <div className="mb-5 flex justify-around  items-center">
                {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Año fiscal</label>
                <input
                    autoFocus
                    type="text"
                    name="ano_fiscal"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    value={conflicto.ano_fiscal || ""}
                    required /> */}
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    value={conflicto.fecha || ""}
                    required />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lugar</label>
                <select
                    name="lugar"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    value={conflicto.lugar || ""}
                    required
                >
                    <option disabled value="">Lugar...</option>
                    <option value="Amazonas">Amazonas</option>
                    <option value="Ancash">Ancash</option>
                    <option value="Apurimac">Apurimac</option>
                    <option value="Arequipa">Arequipa</option>
                    <option value="Ayacucho">Ayacucho</option>
                    <option value="Cajamarca">Cajamarca</option>
                    <option value="Callao">Callao</option>
                    <option value="Cusco">Cusco</option>
                    <option value="Huancavelica">Huancavelica</option>
                    <option value="Huanuco">Huanuco</option>
                    <option value="Ica">Ica</option>
                    <option value="Junín">Junín</option>
                    <option value="La_Libertad">La Libertad</option>
                    <option value="Lambayeque">Lambayeque</option>
                    <option value="Lima">Lima</option>
                    <option value="Loreto">Loreto</option>
                    <option value="Madre_de_Dios">Madre de Dios</option>
                    <option value="Moquegua">Moquegua</option>
                    <option value="Pasco">Pasco</option>
                    <option value="Piura">Piura</option>
                    <option value="Puno">Puno</option>
                    <option value="San_Martín">San Martín</option>
                    <option value="Tacna">Tacna</option>
                    <option value="Tumbes">Tumbes</option>
                    <option value="Ucayali">Ucayali</option>
                </select>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Evento</label>
                <textarea
                    rows={6}
                    name="evento"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-justify"
                    onChange={handleChange}
                    value={conflicto.evento || ""}
                    required />
            </div>
            <div className="mb-5 flex justify-around items-center">


                {/* <input
                    type="text"
                    name="lugar"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    value={conflicto.lugar || ""}
                    required /> */}
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Riesgo</label>
                <select
                    type="text"
                    name="riesgo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    value={conflicto.riesgo || ""}
                    required>
                    <option disabled value="">Riesgo...</option>
                    <option value="Alto">Alto</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Bajo">Bajo</option>
                </select>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Factor</label>
                <select

                    name="factor"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    value={conflicto.factor || ""}
                    required>
                    <option disabled value="">Factor...</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Minería">Minería</option>
                    <option value="Salud">Salud</option>
                    <option value="Viviendda">Vivienda</option>
                    <option value="Ambiental">Ambiental</option>
                    <option value="Población">Población</option>
                    <option value="Campesinado">Campesinado</option>
                    <option value="Educación">Educación</option>
                </select>
            </div>

            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">tipo de conflicto social </label>
                <select
                    type="text"
                    name="tipo_conflicto_social"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    value={conflicto.tipo_conflicto_social || ""}
                    required>
                    <option value="AGL">Asuntos de Gobierno Local</option>
                    <option value="AGR">Asuntos de Gobierno Regional</option>
                    <option value="AGN">Asuntos de Gobierno Nacional</option>
                    <option value="SA">Socioambiental</option>
                    <option value="PDT">Por demarcación territorial</option>
                    <option value="PCIHC">Por cultivo ilegal de hoja de coca</option>
                    <option value="Laborales">Laborales</option>
                    <option value="Comunales">Comunales</option>
                    <option value="Electorales">Electorales</option>
                    <option value="OA">Otros Asuntos</option>
                </select>
            </div>
            <div className="flex items-start mb-5">

            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{params.id ? "Actualizar" : "Guardar"}</button>
        </form>
    )
}

export default ConflictoForm