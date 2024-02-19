'use client';

// import axios from "axios";
// import { useRef, useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";

// function RinfaForm() {
//     const [rinfa, setRinfa] = useState({
//         fecha: "",
//         evento: "",
//         pathName: ""
//     });

//     const form = useRef(null);
//     const router = useRouter();
//     const params = useParams();

//     const handleChange = (e) => {
//         setRinfa({
//             ...rinfa,
//             [e.target.name]: e.target.value,
//         });
//     };

//     useEffect(() => {

//         if (params.id) {
//             axios.get('/api/rinfa/' + params.id).then(res => {
//                 setRinfa({
//                     fecha: res.data.fecha.split('T')[0],
//                     evento: res.data.evento,
//                     pathName: res.data.pathName
//                 });
//             });
//         }
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!params.id) {
//             await axios.post('/api/rinfa', rinfa);
//         } else {
//             await axios.put('/api/rinfa/' + params.id, rinfa);
//         }
//         form.current.reset();
//         router.refresh();
//         router.push('/dashboard/rinfa');
//     };

//     return (
//         <div className="pl-64 flex justify-start items-center pr-6">
//             <div className="w-3/5">
//                 <embed src={rinfa.pathName} type="application/pdf" width="100%" height="500px" />
//             </div>
//             <form
//                 className="w-2/5"
//                 onSubmit={handleSubmit}
//                 ref={form}
//             >
//                 <div className="mb-5 ml-6 ">
//                     <div className="mb-5 flex flex-col">
//                         <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha:</label>
//                         <input
//                             type="date"
//                             name="fecha"
//                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             onChange={handleChange}
//                             value={rinfa.fecha || ""}
//                             required
//                         />
//                         <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Evento:</label>
//                         <textarea
//                             rows={12}
//                             name="evento"
//                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-justify"
//                             onChange={handleChange}
//                             value={rinfa.evento || ""}
//                             required
//                         />
//                     </div>
//                 </div>
//                 <div className="flex justify-end items-center">
//                     <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{params.id ? "Actualizar" : "Guardar"}</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default RinfaForm;


import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

function RinfaForm() {
    const [rinfa, setRinfa] = useState({
        fecha: "",
        evento: "",
        pathName: ""
    });

    const [file, setFile] = useState(null); // Estado para almacenar el archivo seleccionado

    const form = useRef(null);
    const router = useRouter();
    const params = useParams();

    const handleChange = (e) => {
        setRinfa({
            ...rinfa,
            [e.target.name]: e.target.value,
        });
    };

    // Manejar el cambio en el input de archivo
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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

        // Crear un FormData para enviar datos y archivo
        const formData = new FormData();
        formData.append('file', file); // Agregar el archivo al FormData
        formData.append('rinfa', JSON.stringify(rinfa)); // Agregar otros datos al FormData

        if (!params.id) {
            await axios.post('/api/rinfa', formData, {
                headers: {
                    'Content-Type': 'application/pdf' // Asegurarse de establecer el tipo de contenido adecuado
                }
            });
        } else {
            await axios.put('/api/rinfa/' + params.id, formData, {
                headers: {
                    'Content-Type': 'application/pdf' // Asegurarse de establecer el tipo de contenido adecuado
                }
            });
        }
        form.current.reset();
        router.refresh();
        router.push('/dashboard/rinfa');
    };

    return (
        <div className="pl-64 flex justify-start items-center pr-6">
            <div className="w-3/5">
                <embed src={rinfa.pathName} type="application/pdf" width="100%" height="500px" />
            </div>
            <form
                className="w-2/5"
                onSubmit={handleSubmit}
                ref={form}
            >
                <div className="mb-5 ml-6 ">
                    {/* Agregar input de archivo */}
                    <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        className="mb-2"
                    />
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
                    </div>
                </div>
                <div className="flex justify-end items-center">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{params.id ? "Actualizar" : "Guardar"}</button>
                </div>
            </form>
        </div>
    );
}

export default RinfaForm;
