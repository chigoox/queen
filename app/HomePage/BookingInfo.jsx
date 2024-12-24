import React, { useState } from 'react';

export const CollapsibleSection = ({ size, title, children }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="my-6" >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-20 border border-[color:var(--AccentColor)] text-left ${size == 'small' ? 'text-2xl' : 'text-2xl'} font-bold text-gold-500 bg-black hover:bg-gray-900 py-2 px-4 rounded-md flex justify-between items-center`}
            >
                <h1 className='w-[80%]'>{title}</h1>
                <span className="ml-4 text-2xl  center w-[20%] text-[color:var(--TextColorM)]">
                    {isOpen ? '-' : '+'}
                </span>
            </button>
            {isOpen && (
                <div className="mt-4 pl-4 border-l border-[color:var(--AccentColor)] text-gray-300">
                    {children}
                </div>
            )}
        </div>
    );
};

export const CollapsibleSectionMain = ({ title, children }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-6 ">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full md:w-2/3 m-auto text-center text-2xl font-bold bg-black-800 hover:bg-gray-900 py-2 px-4 rounded-md flex justify-between items-center"
            >
                <p className='tex-center text-[color:var(--TextColorM)] w-full' >{title}</p>
                <span className="ml-4 text-[color:var(--TextColorM)]">
                    {isOpen ? '-' : 'O'}
                </span>
            </button>
            {isOpen && (
                <div className="mt-4 pl-4 border-l border-[color:var(--AccentColor)] ">
                    {children}
                </div>
            )}
        </div>
    );
};

const BookingInfo = ({termsData}) => {
    const [isOpenMain, setIsOpenMain] = useState(false);
console.log(termsData)
    return (
        <CollapsibleSectionMain title={'Read Terms'}>
            <div className="p-8 max-w-lg mx-auto  rounded-lg shadow-lg text-[color:var(--TextColorM)]">
                {termsData.map((term, index)=>{
                    return(
                        <CollapsibleSection key={index} title={term.title}>
                    <ul className="space-y-4">
                        {(term?.body || []).map((item)=>{
                            return(
                                <li>{item}</li>
                            )
                        })}
                       
                    </ul>
                </CollapsibleSection>
                    )
                })}

              
            </div>

        </CollapsibleSectionMain>
    )
};

export default BookingInfo;
