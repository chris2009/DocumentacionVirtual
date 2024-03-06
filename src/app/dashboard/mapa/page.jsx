'use client';

import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import axios from 'axios';

export default function Grafico() {
  const [lugares, setLugares] = useState([]);
  const [selected, setSelected] = useState({ name: 'Seleccione un lugar' }); // Inicializa con un valor por defecto o el primer elemento después de obtener los datos

  useEffect(() => {
    const getLugares = async () => {
      try {
        const response = await axios.get('/api/lugar');
        setLugares(response.data); // Asumiendo que la respuesta es un arreglo de lugares
        if (response.data.length > 0) {
          setSelected(response.data[0]); // Establece el lugar seleccionado por defecto al primer elemento, si existe
        }
      } catch (error) {
        console.error('Error al obtener los lugares:', error);
      }
    };
    getLugares();
  }, []); // Asegúrate de incluir un array vacío para que useEffect se ejecute solo una vez al montar el componente

  return (
    <div className="fixed top-16 ml-64 w-44">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-full bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-kaitoke-green-500 focus-visible:ring-2 focus-visible:ring-kaitoke-green-100/75 focus-visible:ring-offset-2 focus-visible:ring-offset-kaitoke-green-300 sm:text-sm">
            <span className="block truncate">{selected.lugar}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-kaitoke-green-100/5 focus:outline-none sm:text-sm">
              {lugares.map((lugar, id) => (
                <Listbox.Option
                  key={id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-kaitoke-green-100 text-kaitoke-green-900' : 'text-gray-900'}`
                  }
                  value={lugar}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {lugar.lugar}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-kaitoke-green-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}