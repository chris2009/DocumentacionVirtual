'use client'
import React, { useState } from 'react'
import Map from '../@map/page'
import { Dialog } from '@headlessui/react'

export default function page() {
  return (
    <div className='flex ml-52 mt-16'>
      <div><Map /></div>
    </div>
  )
}




// 'use client'
// import { Dialog, Transition } from '@headlessui/react'
// import { Fragment, useState } from 'react'
// import { XCircleIcon } from '@heroicons/react/24/outline'

// export default function MyModal() {
//   let [isOpen, setIsOpen] = useState(true)

//   function closeModal() {
//     setIsOpen(false)
//   }

//   function openModal() {
//     setIsOpen(true)
//   }

//   return (
//     <>
//       <div className="fixed inset-0 flex items-center justify-center">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="820"
//           height="1000"
//           fill="#22c563"
//           stroke="#fff"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="1"
//           version="1.2"
//         >
//           <button
//             type="button"
//             onClick={openModal}
//             className="rounded-md bg-black/20 p-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
//           >
//             <svg className="hover:fill-kaitoke-green-700"
//               name="tacna" href="/tacna"><path d="M687.1 926.6l.6-.9.8-1.5.3-.5.3-.3.5-.5 1.8-1.4 1.9-1.2 4.3-1.8.6-.2.9-.4.3-.4.3-.5.9-2.4.4-.6.5-.7 2-1.8.3-.4.4-.6.6-1 .3-.8.2-.7.5-2.3.2-.5 2.1-2.7.8-1.3.5-1.1.6-.9.3-.4.7-.5.9-.5 1.1-.3 2.4-1.1 3.9-4.5 1.5-2 .5-.8v-.7l.1-.6-.2-.7-.4-1v-.1l-.1-.1-.2-1.3.1-1 .3-.8.5-1.4.2-.7.1-.7.2-.6.4-.5 1.1-1.3 1.2-.7.7-.2h.9l1 .2 1.1.5.5.4.4.6 1.2 2.9.5.7.5.5.6.3.8.1.7.1 1.3-.9 1-2.7 1 2.3 3.1 4.7 2.7 5.1 1.1 1.6.4.2.4.1h.2l.1.1.2.1 1.1.8 1.7 1.6 1 .8.3.1.4.1h.2l.4.2.5.3 1.5 1 .4.2h.6l.7-.3.4-.1.2-.1h.8l.3.2.2.2.5 1 .1.3.9 1 .3.3.4.1.3.1.3-.1 1.7-.3.5-.2h.2l2.5.3.8.3 1.9 1.6 1 1 .7.9.6 1.5.1 1.8-.1 3.7-6.2 6.1-2.3 1.6-2.2.3-2.2-.3-2.1.1-1.6 1.7-.3 2.2.5 1.8.9 1.7.4 2.2.1 1.3.3.9 1 1.8.4 1 .2 1-.2 1-2.9 6.7-1.1 1.6-.9 1-1.9 1.7-2.3 2.8-.9.7-1.1.4h-1.4l-1.2.4-3.4 2-1.2.3-2.6.3-5.2-.5-2.5.2-1.2.6-1.3-1.1-2.4-1.5-3-2.2-1.5-1-1.8-.9-1.7-1-2.4-1.3-2.5-2.4-.1-.2-.3-.5-.3-.4-.2-.1-.5-.1-.3-.1-2.8-2.6-.8-.5-1.8-.5-.6-.6-.6-2-.5-1-.7-.5-.8-.3-2-1.6-1-.5-2.9-1-1-.1-2.5-2.5-1.1-.6-.6-.6-.2-.2z"></path></svg>
//           </button>
//         </svg>
//       </div>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black/25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className=" w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <div className='flex items-end justify-end'>
//                     <button
//                       type="button"
//                       className="inline-flex justify-center rounded-full border border-transparent bg-blue-100 p-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                       onClick={closeModal}
//                     >
//                       <XCircleIcon className='w-4' />
//                     </button>
//                   </div>
//                   <Dialog.Title
//                     as="h3"
//                     className="text-lg font-medium leading-6 text-gray-900"
//                   >
//                     Departamento:
//                   </Dialog.Title>
//                   <div className="mt-2">
//                     <p className="text-sm text-gray-500">
//                       datos del departamento
//                     </p>
//                   </div>


//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>

//           </div>
//         </Dialog>
//       </Transition>

//     </>
//   )
// }

