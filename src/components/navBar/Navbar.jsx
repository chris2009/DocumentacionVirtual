// 'use client'
// import React, { Fragment, useState, useEffect, useRef } from 'react'
// import { Disclosure, Menu, Transition } from '@headlessui/react'
// import {
//     BellIcon,
//     ChevronDownIcon,
//     ChevronRightIcon,
//     ArrowLeftStartOnRectangleIcon,

// } from '@heroicons/react/24/outline'
// import Link from 'next/link'
// import { signOut, } from 'next-auth/react'

// function Navbar({ props }) {

//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
//     const menuRef = useRef();

//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen);
//         // Si el menú principal se cierra, también cerramos los submenús
//         if (isMenuOpen) {
//             setIsSubMenuOpen(false);
//         }
//     };

//     const toggleSubMenu = () => {
//         setIsSubMenuOpen(!isSubMenuOpen);
//     };

//     useEffect(() => {
//         // Función para detectar clics fuera del menú
//         function handleClickOutside(event) {
//             if (menuRef.current && !menuRef.current.contains(event.target)) {
//                 setIsMenuOpen(false); // Cierra el menú principal
//                 setIsSubMenuOpen(false); // Cierra todos los submenús
//             }
//         }

//         // Agregar listener para clics fuera del menú
//         document.addEventListener('mousedown', handleClickOutside);

//         // Limpiar listener al desmontar el componente
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);


//     function classNames(...classes) {
//         return classes.filter(Boolean).join(' ')
//     }


//     const jsonString = JSON.stringify(props);
//     const parsedJson = JSON.parse(jsonString);
//     return (
//         <div>
//             <Disclosure as="nav" className="fixed top-0 z-50 w-full bg-white shadow-md border-kaitoke-green-400 dark:bg-gray-800 dark:border-gray-700">
//                 <div className="px-3 lg:px-5 lg:pl-3">
//                     <div className="relative flex h-16 items-center justify-between">
//                         <div className="flex flex-1 items-center justify-start sm:items-stretch">
//                             <Link href="/dashboard" className="flex ms-2 md:me-24">
//                                 <img
//                                     className="h-12 w-auto mr-2"
//                                     src="/CIAINF.png"
//                                     alt="CIA CIBER"
//                                 />
//                                 <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-400">DocVirtual</span>
//                             </Link>
//                             <div ref={menuRef} className="flex justify-start">
//                                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                                     <div className="flex justify-start space-x-4 py-4">
//                                         {/* Menú Principal */}
//                                         <div className="relative">
//                                             <button onClick={toggleMenu} className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center">
//                                                 CIBER Inteligencia
//                                                 <ChevronDownIcon className="ml-2 h-4 w-4" />
//                                             </button>

//                                             {/* Submenús del elemento 'UI Elements' */}
//                                             {isMenuOpen && (
//                                                 <div className="absolute z-10 left-0 mt-2 w-56 rounded-md shadow-lg bg-white">
//                                                     <div
//                                                         onClick={toggleSubMenu}
//                                                         className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
//                                                     >
//                                                         Forms & Tables
//                                                         <ChevronRightIcon className="h-4 w-4" />
//                                                     </div>
//                                                     {/* Submenú nivel 2 */}
//                                                     {isSubMenuOpen && (
//                                                         <div className="absolute left-full top-0 w-56 rounded-md shadow-lg bg-white translate-x-4">
//                                                             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Form Controls</a>
//                                                             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Advanced Forms</a>
//                                                             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Basic Tables</a>
//                                                             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Data Tables</a>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             )}
//                                         </div>
//                                         <div className="relative">
//                                             <button onClick={toggleMenu} className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center">
//                                                 CIBER Contra Inteligencia
//                                                 <ChevronDownIcon className="ml-2 h-4 w-4" />
//                                             </button>

//                                             {/* Submenús del elemento 'UI Elements' */}
//                                             {isMenuOpen && (
//                                                 <div className="absolute z-10 left-0 mt-2 w-56 rounded-md shadow-lg bg-white">
//                                                     <div
//                                                         onClick={toggleSubMenu}
//                                                         className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
//                                                     >
//                                                         Forms & Tables
//                                                         <ChevronRightIcon className="h-4 w-4" />
//                                                     </div>
//                                                     {/* Submenú nivel 2 */}
//                                                     {isSubMenuOpen && (
//                                                         <div className="absolute left-full top-0 w-56 rounded-md shadow-lg bg-white translate-x-4">
//                                                             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">primero</a>
//                                                             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">seguno</a>
//                                                             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">tercero</a>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                         </div>

//                         <div className="absolute inset-y-0 right-0 flex items-center px-2 sm:static sm:inset-auto sm:mx-6 sm:px-0">
//                             <button
//                                 type="button"
//                                 className="relative rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                             >
//                                 <BellIcon className="h-6 w-full" aria-hidden="true" />
//                             </button>

//                             {/* Profile dropdown */}
//                             <Menu as="div" className="relative ml-3">
//                                 <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                                     <img
//                                         className="h-10 w-full rounded-full"
//                                         src="/47983599.jpeg"
//                                         alt=""
//                                     />
//                                 </Menu.Button>
//                                 <Transition
//                                     as={Fragment}
//                                     enter="transition ease-out duration-100"
//                                     enterFrom="transform opacity-0 scale-95"
//                                     enterTo="transform opacity-100 scale-100"
//                                     leave="transition ease-in duration-75"
//                                     leaveFrom="transform opacity-100 scale-100"
//                                     leaveTo="transform opacity-0 scale-95"
//                                 >
//                                     <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                                         <Menu.Item>
//                                             <label
//                                                 className={classNames('block px-4 py-2 text-sm text-gray-700 border-b-[1px]')}
//                                             >
//                                                 {parsedJson.session.user.name}
//                                             </label>
//                                         </Menu.Item>

//                                         <Menu.Item>
//                                             {({ active }) => (
//                                                 <button
//                                                     className={classNames(active ? 'bg-gray-100' : '', 'px-4 py-1 text-sm text-gray-700 w-full flex items-center justify-end')}
//                                                     onClick={() => signOut()}
//                                                 >
//                                                     <ArrowLeftStartOnRectangleIcon className='w-6' />  Cerrar sesión
//                                                 </button>
//                                             )}
//                                         </Menu.Item>
//                                     </Menu.Items>
//                                 </Transition>
//                             </Menu>
//                         </div>
//                     </div>
//                 </div>
//             </Disclosure>



//         </div >


//     )
// }

// export default Navbar


'use client'
import React, { Fragment, useState, useEffect, useRef } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
    BellIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

function Navbar({ props }) {
    const [isCiberInteligenciaOpen, setIsCiberInteligenciaOpen] = useState(false);
    const [isCiberContraInteligenciaOpen, setIsCiberContraInteligenciaOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState({ ciberInteligencia: false, ciberContraInteligencia: false });
    const menuRef = useRef();

    const toggleMenu = (menu) => {
        if (menu === 'ciberInteligencia') {
            setIsCiberInteligenciaOpen(!isCiberInteligenciaOpen);
            if (isCiberInteligenciaOpen) setIsSubMenuOpen(prev => ({ ...prev, ciberInteligencia: false }));
        } else {
            setIsCiberContraInteligenciaOpen(!isCiberContraInteligenciaOpen);
            if (isCiberContraInteligenciaOpen) setIsSubMenuOpen(prev => ({ ...prev, ciberContraInteligencia: false }));
        }
    };

    const toggleSubMenu = (menu) => {
        setIsSubMenuOpen(prev => ({ ...prev, [menu]: !prev[menu] }));
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsCiberInteligenciaOpen(false);
                setIsCiberContraInteligenciaOpen(false);
                setIsSubMenuOpen({ ciberInteligencia: false, ciberContraInteligencia: false });
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
    }

    const jsonString = JSON.stringify(props);
    const parsedJson = JSON.parse(jsonString);

    return (
        <div>
            <Disclosure as="nav" className="fixed top-0 z-50 w-full bg-white shadow-md border-kaitoke-green-400 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 lg:px-5 lg:pl-3">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-start sm:items-stretch">
                            <Link href="/dashboard" className="flex ms-2 md:me-24">
                                <img
                                    className="h-12 w-auto mr-2"
                                    src="/CIAINF.png"
                                    alt="CIA CIBER"
                                />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-400">DocVirtual</span>
                            </Link>
                            <div ref={menuRef} className="flex justify-start pt-2">
                                {/* Menús principales y submenús aquí */}
                                <div className='relative'>
                                    <Link href="/">
                                        <button className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                                            Dashboard
                                        </button>
                                    </Link>

                                </div>
                                <div className="relative">
                                    {/* Botón y submenú para CIBER Inteligencia */}
                                    <button onClick={() => toggleMenu('ciberInteligencia')} className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                                        CIBER Inteligencia
                                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                                    </button>

                                    {isCiberInteligenciaOpen && (
                                        <div className="absolute z-10 left-0 mt-2 w-56 rounded-md shadow-lg bg-white">
                                            {/* Elementos del submenú */}
                                            <Link href="/dashboard/ciberintg/rinfa">
                                                <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                                                    RINFA
                                                </div>
                                            </Link>
                                            <div onClick={() => toggleSubMenu('ciberInteligencia')} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                                                Forms & Tables
                                                <ChevronRightIcon className="h-4 w-4" />
                                            </div>
                                            {isSubMenuOpen.ciberInteligencia && (
                                                <div className="absolute left-full top-0 w-56 rounded-md shadow-lg bg-white translate-x-4 translate-y-8">
                                                    {/* Elementos del submenú de CIBER Inteligencia */}
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Form Controls</a>
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Advanced Forms</a>
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Basic Tables</a>
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Data Tables</a>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="relative">
                                    {/* Botón y submenú para CIBER Contra Inteligencia */}
                                    <button onClick={() => toggleMenu('ciberContraInteligencia')} className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                                        CIBER Contra Inteligencia
                                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                                    </button>
                                    {isCiberContraInteligenciaOpen && (
                                        <div className="absolute z-10 left-0 mt-2 w-56 rounded-md shadow-lg bg-white">
                                            {/* Elementos del submenú */}
                                            <div onClick={() => toggleSubMenu('ciberContraInteligencia')} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                                                Forms & Tables
                                                <ChevronRightIcon className="h-4 w-4" />
                                            </div>
                                            {isSubMenuOpen.ciberContraInteligencia && (
                                                <div className="absolute left-full top-0 w-56 rounded-md shadow-lg bg-white translate-x-4">
                                                    {/* Elementos del submenú de CIBER Contra Inteligencia */}
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">primero</a>
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">segundo</a>
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">tercero</a>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div >
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 sm:static sm:inset-auto sm:mx-6 sm:px-0">
                            <button
                                type="button"
                                className="relative rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <BellIcon className="h-6 w-full" aria-hidden="true" />
                            </button>

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <img
                                        className="h-10 w-full rounded-full"
                                        src="/47983599.jpeg"
                                        alt=""
                                    />
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            <label
                                                className={classNames('block px-4 py-2 text-sm text-gray-700 border-b-[1px]')}
                                            >
                                                {parsedJson.session.user.name}
                                            </label>
                                        </Menu.Item>

                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={classNames(active ? 'bg-gray-100' : '', 'px-4 py-1 text-sm text-gray-700 w-full flex items-center justify-end')}
                                                    onClick={() => signOut()}
                                                >
                                                    <ArrowLeftStartOnRectangleIcon className='w-6' />  Cerrar sesión
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div >
                </div>
            </Disclosure >
        </div >
    )
}

export default Navbar;
