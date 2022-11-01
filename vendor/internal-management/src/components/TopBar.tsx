import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { tw } from "twind";
import SideBar from "./SideBar";

export default function TopBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={tw`z-10 flex h-[60px] w-full flex-shrink-0 border-b bg-white px-2 shadow lg:hidden`}>
        <div className={tw`my-auto flex items-center space-x-4`}>
          <button
            onClick={() => {
              setOpen(prev => !prev);
            }}
            className={tw`flex h-12 w-12 items-center justify-center rounded hover:bg-gray-200 focus:outline-none focus-visible:ring lg:hidden`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={tw`h-8 w-8`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          <span className={tw`font-bold text-[#292949]`}>Platform Management</span>
        </div>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className={tw`relative z-10`}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter={tw`ease-out duration-300`}
            enterFrom={tw`opacity-0`}
            enterTo={tw`opacity-100`}
            leave={tw`ease-in duration-200`}
            leaveFrom={tw`opacity-100`}
            leaveTo={tw`opacity-0`}
          >
            <Dialog.Backdrop
              className={tw`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}
              aria-hidden="true"
            />
          </Transition.Child>

          <div className={tw`fixed inset-0 z-10 overflow-y-auto`}>
            <Transition.Child
              as={Fragment}
              enter={tw`ease-out duration-300`}
              enterFrom={tw`-translate-x-[300px]`}
              enterTo={tw`translate-x-0`}
              leave={tw`ease-in duration-200`}
              leaveFrom={tw`translate-x-0`}
              leaveTo={tw`-translate-x-[300px]`}
            >
              <Dialog.Panel className={tw`flex h-full`}>
                <SideBar />
                <button
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={tw`w-0 flex-1 focus:outline-none`}
                >
                  <span className={tw`sr-only`}>Sluiten</span>
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
