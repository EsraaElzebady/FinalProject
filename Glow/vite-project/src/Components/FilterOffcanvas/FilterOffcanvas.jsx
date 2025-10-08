// FilterOffcanvas.jsx
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function FilterOffcanvas({ colors = [], onColorSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="py-2 px-3 bg-white rounded-l flex gap-2 items-center border"
      >
        <span className="text-[16px] font-semibold text-black">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512">
           <path d="M264 40C277.3 40 288 50.75 288 64C288 77.25 277.3 88 264 88H24C10.75 88 0 77.25 0 64C0 50.75 10.75 40 24 40H264zM424 168C437.3 168 448 178.7 448 192C448 205.3 437.3 216 424 216H24C10.75 216 0 205.3 0 192C0 178.7 10.75 168 24 168H424zM0 320C0 306.7 10.75 296 24 296H264C277.3 296 288 306.7 288 320C288 333.3 277.3 344 264 344H24C10.75 344 0 333.3 0 320zM424 424C437.3 424 448 434.7 448 448C448 461.3 437.3 472 424 472H24C10.75 472 0 461.3 0 448C0 434.7 10.75 424 24 424H424z">
            </path> 
            </svg> </span>
            <span className="text-[16px] font-semibold capitalize text-black">filter</span>
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="w-80 h-full bg-white shadow-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-lg font-semibold">
                    
                    Filters
                    </Dialog.Title>
                  <button onClick={() => setIsOpen(false)} className="text-gray-600">✕</button>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-medium">Colors</p>
                  <div className="flex flex-wrap gap-2">
                    {colors.length === 0 && <p className="text-xs text-gray-500">No colors found</p>}
                    {colors.map((c, i) => {
                      const label = typeof c === "string" ? c : c.label;
                      const value = typeof c === "string" ? c.trim().toLowerCase() : c.value;
                      return (
                        <div key={i} className="flex flex-col w-full h-fit gap-2">
                          <button
                            onClick={() => {
                              onColorSelect(value);
                              setIsOpen(false);
                            }}
                            className="flex items-center gap-5 px-3 w-full py-1 rounded-full text-sm"
                          >
                            <span
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: label || "transparent" }}
                            />
                            <span>{label}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => {
                      onColorSelect(null);
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 w-full rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 text-sm"
                  >
                    Clear Filter
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
