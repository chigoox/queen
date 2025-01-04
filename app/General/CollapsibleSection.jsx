import { useState } from "react";

export const CollapsibleSection = ({ size, title, children  }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="my-6" >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-20 border  text-left ${size == 'small' ? 'text-2xl' : 'text-2xl'} font-bold text-gold-500  py-2 px-4 rounded-md flex justify-between items-center`}
            >
                <h1 className='w-[80%]'>{title}</h1>
                <span className="ml-4 text-2xl  center w-[20%] ">
                    {isOpen ? '-' : '+'}
                </span>
            </button>
            {isOpen && (
                <div className="mt-4 pl-4 border-l text-gray-300">
                    {children}
                </div>
            )}
        </div>
    );
};