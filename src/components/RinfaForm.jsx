'use client';

import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

function RinfaForm() {

    const [file, setFile] = useState(null)
    const [rinfa, setRinfa] = useState({
        fecha: "",
        evento: "",
        pathName: ""
    });

    const form = useRef(null);
    const router = useRouter();
    const params = useParams();

    const handleChange = (e) => {
        setRinfa({
            ...rinfa,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {

        if (params.id) {
            axios.get('/api/rinfa/' + params.id).then(res => {
                setRinfa({
                    fecha: res.data.fecha.split('T')[0],
                    evento: res.data.evento,
                    pathName: res.data.pathName
                });
            });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('fecha', rinfa.fecha)
        formData.append('evento', rinfa.evento)

        if (file) {
            formData.append('file', file)
        }

        if (!params.id) {

            const res = await axios.post('/api/rinfa', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res)
        } else {

            const res = await axios.put('/api/rinfa/' + params.id, rinfa, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(res)
        }
        form.current.reset();
        router.refresh();
        router.push('/dashboard/rinfa');
    };

    return (
        <div className="pl-64 flex justify-start items-center pr-6">
            <div className="w-3/5">
                {/* <embed src={rinfa.pathName} type="application/pdf" className="w-full h-[85vh]" /> */}
                {/* {file && <embed src={URL.createObjectURL(file)} type="application/pdf" className="w-full h-[85vh]" />} */}
                <embed src={file ? URL.createObjectURL(file) : rinfa.pathName} type="application/pdf" className="w-full h-[85vh]" />


            </div>
            <form
                className="w-2/5"
                onSubmit={handleSubmit}
                ref={form}
            >
                <div className="mb-5 ml-6 ">
                    <div className="mb-5 flex flex-col">

                        <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha:</label>
                        <input
                            type="date"
                            name="fecha"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handleChange}
                            value={rinfa.fecha || ""}
                            required
                        />
                        
                        <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Evento:</label>
                        <textarea
                            rows={12}
                            name="evento"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-justify"
                            onChange={handleChange}
                            value={rinfa.evento || ""}
                            required
                        />

                        <label className="block mb-2 text-sm font-medium text-gray-900">Subir archivo:</label>
                        <input
                            className="file:bg-kaitoke-green-700 file:hover:bg-kaitoke-green-800 file:text-white file:h-10 file:cursor-pointer block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:border-none h-10"
                            type="file"
                            name="file"
                            accept="application/pdf"
                            required
                            onChange={(e) => {
                                setFile(e.target.files[0])
                            }}
                        />
                    </div>
                </div>
                <div className="flex justify-end items-center">
                    <button type="submit" className="text-white bg-kaitoke-green-700 hover:bg-kaitoke-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{params.id ? "Actualizar" : "Guardar"}</button>
                </div>
            </form>
        </div>
    );
}

export default RinfaForm;