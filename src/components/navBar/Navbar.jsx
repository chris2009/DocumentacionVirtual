'use client'
import React, { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, HomeIcon, DocumentTextIcon, UserGroupIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, } from 'next-auth/react'

function Navbar({ props }) {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [open, setOpen] = useState(true)

    const links = [
        { name: 'Dashboard', href: '/dashboard', icon: <HomeIcon /> },
        { name: 'Rinfa', href: '/rinfa', icon: <DocumentTextIcon /> },
        { name: 'Conflicto social', href: '/conflictoSocial', icon: <UserGroupIcon /> }
    ]
    const jsonString = JSON.stringify(props);
    const parsedJson = JSON.parse(jsonString);

    const pathname = usePathname()
    return (
        <div>
            <Disclosure as="nav" className="fixed top-0 z-50 w-full bg-white border-b border-kaitoke-green-400 dark:bg-gray-800 dark:border-gray-700">
                {({ open }) => (
                    <>
                        <div className="px-3 lg:px-5 lg:pl-3">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-start sm:items-stretch">
                                    <Link href="/dashboard" className="flex ms-2 md:me-24">
                                        <img
                                            className="h-12 w-auto mr-2"
                                            src="/CIAINF.png"
                                            alt="Your Company"
                                        />
                                        <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-400">DocVirtual</span>
                                    </Link>

                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <button
                                        type="button"
                                        className="relative rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-full" aria-hidden="true" />
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-10 w-full rounded-full"
                                                    src="/47983599.jpeg"
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
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
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            {parsedJson.session.user.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>

                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={classNames(active ? 'bg-gray-100 w-full text-start' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            onClick={() => signOut()}
                                                        >
                                                            Cerrar sesión
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {links.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

              <aside className={`fixed top-0 left-0 z-40 h-screen pt-28 bg-kaitoke-green-400 transition-all duration-300 ${open ? 'w-52' : 'w-16'}`} aria-label="Sidebar">
                <ChevronLeftIcon className={`bg-white text-kaitoke-green-700 rounded-full w-6 border-2 p-[2px] border-kaitoke-green-400 absolute -right-3 top-[76px] cursor-pointer ${!open && "rotate-180"} duration-300`} onClick={() => setOpen(!open)} />
                <div className="h-full pb-4 overflow-y-auto bg-kaitoke-green-400">
                    <ul className="space-y-2 font-medium">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className={`flex items-center py-2  hover:bg-white transition-opacity duration-300 hover:text-gray-700 group ${pathname === link.href ? 'bg-white text-gray-700' : 'text-white'}`}>
                                    <span className="flex items-center ms-3">
                                        <div className="w-8 h-full" >{link.icon}</div>
                                    </span>
                                    <span className="flex items-center ms-3">
                                        <div className={`ml-2 w-full ${!open && "hidden"}`}>{link.name}</div>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>
            </aside >

        </div >

    )
}

export default Navbar
