'use client';

import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

function RinfaForm() {


    const [file, setFile] = useState(null)
    const [rinfa, setRinfa] = useState({
        fecha: "",
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
                    pathName: res.data.pathName
                });
            });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('fecha', rinfa.fecha)

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

            const res = await axios.put('/api/rinfa/' + params.id, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(res)
        }

        form.current.reset();
        router.refresh();
        router.push('/rinfa');
    };


    function getFileNameWithoutExtension(pathName) {
        // Obtener el nombre del archivo desde la última barra diagonal
        const fileNameWithExtension = pathName.substring(pathName.lastIndexOf('/') + 1);

        // Eliminar la extensión del archivo
        const fileNameWithoutExtension = fileNameWithExtension.substring(0, fileNameWithExtension.lastIndexOf('.'));

        return fileNameWithoutExtension;
    }

    return (
        <div className="mx-4 pt-2">
            <form className="flex my-2 items-center" onSubmit={handleSubmit} ref={form}>


                <input
                    type="date"
                    name="fecha"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-kaitoke-green-500 focus:border-kaitoke-green-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/6 mr-2"
                    onChange={handleChange}
                    value={rinfa.fecha || ""}
                    required
                />

                <input
                    className="file:bg-kaitoke-green-700 file:hover:bg-kaitoke-green-800 file:text-white file:h-10 file:cursor-pointer block text-sm text-gray-900 border border-gray-300 rounded-full cursor-pointer bg-gray-50 focus:outline-none file:border-none h-10 w-5/6 mr-2"
                    type="file"
                    name="file"
                    accept="application/pdf"
                    required
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                    }}
                />

                <button
                    type="submit"
                    className="text-white bg-kaitoke-green-700 hover:bg-kaitoke-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-1/6"
                >
                    {params.id ? "Actualizar" : "Guardar"}
                </button>

            </form>
            <div>
                <embed src={file ? URL.createObjectURL(file) : rinfa.pathName} type="application/pdf" className="w-full h-[85vh] rounded-xl" />
            </div>
        </div>
    );
}

export default RinfaForm;