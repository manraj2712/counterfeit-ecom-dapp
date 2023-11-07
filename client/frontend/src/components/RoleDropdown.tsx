"use client";

import { useState } from "react";

export default function DropDown({ options }: { options: { title: string, onTap: (e: string) => void }[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(0);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <button
                type="button"
                className="px-4 py-2 font-medium rounded text-md inline-flex items-center border-2 border-yellow-400"
                onClick={() => {
                    options[selected].onTap(options[selected].title);
                    toggleDropdown();
                }}
            >{options[selected].title}
                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-yellow-400 ring-opacity-5">
                    <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {
                            options.map((option, index) => {
                                if (index != selected)
                                    return (
                                        <li key={option.title}>
                                            <p
                                                className="block px-4 py-2 text-md text-gray-700 hover:bg-blue-100 cursor-pointer"
                                                onClick={() => {
                                                    setSelected(index);
                                                    option.onTap(option.title);
                                                    closeDropdown();
                                                }}
                                            >
                                                {option.title}
                                            </p>
                                        </li>
                                    )
                            })
                        }

                    </ul>
                </div>
            )}
        </div>
    )

}
