// 'use client'
import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { EyeIcon, ChevronDownIcon, TrashIcon, PencilIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

function ConflictoTable({ conflicto }) {

    return (

        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-2 text-justify text-xs">
                {conflicto.evento}
            </td>
            <td className="text-center text-xs px-2 pr-6">
                <Link key={conflicto.id} href={`/dashboard/conflictoSocial/${conflicto.id}`}>
                    <div className="text-right">
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-kaitoke-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-kaitoke-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                    <Cog6ToothIcon className='w-5 h-5'/>
                                    <ChevronDownIcon
                                        className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                                        aria-hidden="true"
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
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                    <div className="px-1 py-1 ">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${active ? 'bg-kaitoke-green-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    <EyeIcon
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                    Ver
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${active ? 'bg-kaitoke-green-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >

                                                    <PencilIcon
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />

                                                    Editar
                                                </button>
                                            )}
                                        </Menu.Item>

                                    </div>
                                    <div className="px-1 py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${active ? 'bg-red-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    <TrashIcon
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                    Delete
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </Link>
            </td>
        </tr>

    )
}

export default ConflictoTable
