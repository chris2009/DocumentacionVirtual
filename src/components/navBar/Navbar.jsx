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
// import { signOut } from 'next-auth/react'

// function Navbar({ props }) {
//     const [isCiberInteligenciaOpen, setIsCiberInteligenciaOpen] = useState(false);
//     const [isCiberContraInteligenciaOpen, setIsCiberContraInteligenciaOpen] = useState(false);
//     const [isSubMenuOpen, setIsSubMenuOpen] = useState({ ciberInteligencia: false, ciberContraInteligencia: false });
//     const menuRef = useRef();

//     const toggleMenu = (menu) => {
//         if (menu === 'ciberInteligencia') {
//             setIsCiberInteligenciaOpen(!isCiberInteligenciaOpen);
//             if (isCiberInteligenciaOpen) setIsSubMenuOpen(prev => ({ ...prev, ciberInteligencia: false }));
//         } else {
//             setIsCiberContraInteligenciaOpen(!isCiberContraInteligenciaOpen);
//             if (isCiberContraInteligenciaOpen) setIsSubMenuOpen(prev => ({ ...prev, ciberContraInteligencia: false }));
//         }
//     };

//     const toggleSubMenu = (menu) => {
//         setIsSubMenuOpen(prev => ({ ...prev, [menu]: !prev[menu] }));
//     };

//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (menuRef.current && !menuRef.current.contains(event.target)) {
//                 setIsCiberInteligenciaOpen(false);
//                 setIsCiberContraInteligenciaOpen(false);
//                 setIsSubMenuOpen({ ciberInteligencia: false, ciberContraInteligencia: false });
//             }
//         }

//         document.addEventListener('mousedown', handleClickOutside);

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     const classNames = (...classes) => {
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
//                             <div ref={menuRef} className="flex justify-start pt-2">
//                                 {/* Menús principales y submenús aquí */}
//                                 <div className='relative'>
//                                     <Link href="/dashboard">
//                                         <button className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center">
//                                             Dashboard
//                                         </button>
//                                     </Link>

//                                 </div>
//                                 <div className="relative">
//                                     {/* Botón y submenú para CIBER Inteligencia */}
//                                     <button onClick={() => toggleMenu('ciberInteligencia')} className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center">
//                                         CIBER Inteligencia
//                                         <ChevronDownIcon className="ml-2 h-4 w-4" />
//                                     </button>

//                                     {isCiberInteligenciaOpen && (
//                                         <div className="absolute z-10 left-0 mt-2 w-56 rounded-md shadow-lg bg-white">
//                                             {/* Elementos del submenú */}
//                                             <Link href="/dashboard/ciberintg/rinfa">
//                                                 <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
//                                                     RINFA
//                                                 </div>
//                                             </Link>
//                                             <div onClick={() => toggleSubMenu('ciberInteligencia')} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
//                                                 Conflictividad social
//                                                 <ChevronRightIcon className="h-4 w-4" />
//                                             </div>
//                                             {isSubMenuOpen.ciberInteligencia && (
//                                                 <div className="absolute left-full top-0 w-36 rounded-md shadow-lg bg-white translate-x-4 translate-y-8">
//                                                     {/* Elementos del submenú de CIBER Inteligencia */}
//                                                     <Link href="/dashboard/ciberintg/conflictoSocial/tabla" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tabla</Link>
//                                                     <Link href="/dashboard/ciberintg/conflictoSocial/estadistica" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Estadística</Link>
//                                                     <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Matrices</Link>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div className="relative">
//                                     {/* Botón y submenú para CIBER Contra Inteligencia */}
//                                     <button onClick={() => toggleMenu('ciberContraInteligencia')} className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center">
//                                         CIBER Contra Inteligencia
//                                         <ChevronDownIcon className="ml-2 h-4 w-4" />
//                                     </button>
//                                     {isCiberContraInteligenciaOpen && (
//                                         <div className="absolute z-10 left-0 mt-2 w-56 rounded-md shadow-lg bg-white">
//                                             {/* Elementos del submenú */}
//                                             <div onClick={() => toggleSubMenu('ciberContraInteligencia')} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
//                                                 Activos críticos
//                                                 <ChevronRightIcon className="h-4 w-4" />
//                                             </div>
//                                             {isSubMenuOpen.ciberContraInteligencia && (
//                                                 <div className="absolute left-full top-0 w-32 rounded-md shadow-lg bg-white translate-x-4">
//                                                     {/* Elementos del submenú de CIBER Contra Inteligencia */}
//                                                     <Link href="/dashboard/ciberci/ac/tabla" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tabla</Link>
//                                                     <Link href="/dashboard/ciberci/ac/nacional" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Nacional</Link>
//                                                     <Link href="/dashboard/ciberci/ac/institucional" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Institucional</Link>
//                                                     <Link href="/dashboard/ciberci/ac/matrices" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Matrices</Link>
//                                                 </div>
//                                             )}
//                                             <div onClick={() => toggleSubMenu('ciberContraInteligencia')} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
//                                                 Categorías
//                                                 <ChevronRightIcon className="h-4 w-4" />
//                                             </div>
//                                             {isSubMenuOpen.ciberContraInteligencia && (
//                                                 <div className="absolute left-full top-0 w-32 rounded-md shadow-lg bg-white translate-x-4">
//                                                     {/* Elementos del submenú de CIBER Contra Inteligencia */}
//                                                     <Link href="/dashboard/ciberci/ac/tabla" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tabla</Link>
//                                                     <Link href="/dashboard/ciberci/ac/nacional" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Estadística</Link>
//                                                     <Link href="/dashboard/ciberci/ac/nacional" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Matrices</Link>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                         </div >
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
//                     </div >
//                 </div>
//             </Disclosure >
//         </div >
//     )
// }

// export default Navbar;


'use client'
import React, { useState, Fragment } from "react";
import Link from "next/link";
// import Logo from "../../assets/Logo.png";
// import Button from "../Button";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import NavLinks from "./NavLinks";
const Navbar = ({ props }) => {
    const [open, setOpen] = useState(false);

    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
    }

    const jsonString = JSON.stringify(props);
    const parsedJson = JSON.parse(jsonString);

    return (
        <nav className="bg-white w-full shadow">
            <div className="flex items-center font-medium justify-around">
                <div className="z-50 md:w-auto w-full flex justify-between">
                    <img src="/CIAINF.png" alt="logo" className="md:cursor-pointer h-12" />
                    <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
                        <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
                    </div>
                    <span className="ml-2 my-auto">DocVirtual</span>
                </div>
                <ul className="md:flex hidden items-center gap-8 text-gray-700 text-sm">
                    <li>
                        <Link href="/" className="py-7 px-3 inline-block">
                            Home
                        </Link>
                    </li>
                    <NavLinks />
                </ul>
                {/* <div className="md:block hidden">
                    <Button />
                </div> */}
                {/* Mobile nav */}
                <ul
                    className={`
        md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
                >
                    <li>
                        <Link href="/" className="py-7 px-3 inline-block">
                            Home
                        </Link>
                    </li>
                    <NavLinks />
                    {/* <div className="py-5">
                        <Button />
                    </div> */}
                </ul>
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
        </nav >
    );
};

export default Navbar;