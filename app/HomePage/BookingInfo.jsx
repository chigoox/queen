import React, { useState } from 'react';

const CollapsibleSection = ({ size, title, children }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="m-6" >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-20 border border-yellow-600 text-left ${size == 'small' ? 'text-2xl' : 'text-2xl'} font-bold text-gold-500 bg-black hover:bg-gray-900 py-2 px-4 rounded-md flex justify-between items-center`}
            >
                <h1 className='w-[80%]'>{title}</h1>
                <span className="ml-4 text-2xl  center w-[20%] text-white">
                    {isOpen ? '-' : '+'}
                </span>
            </button>
            {isOpen && (
                <div className="mt-4 pl-4 border-l border-gray-700 text-gray-300">
                    {children}
                </div>
            )}
        </div>
    );
};

const CollapsibleSectionMain = ({ title, children }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-6 ">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full md:w-2/3 m-auto text-center text-2xl font-bold bg-black-800 hover:bg-gray-900 py-2 px-4 rounded-md flex justify-between items-center"
            >
                <p className='tex-center text-white w-full' >{title}</p>
                <span className="ml-4 text-white">
                    {isOpen ? '-' : 'O'}
                </span>
            </button>
            {isOpen && (
                <div className="mt-4 pl-4 border-l border-gray-700 ">
                    {children}
                </div>
            )}
        </div>
    );
};

const BookingInfo = () => {
    const [isOpenMain, setIsOpenMain] = useState(false);

    return (
        <CollapsibleSectionMain title={'Read Terms'}>
            <div className="p-8 max-w-lg mx-auto bg-black rounded-lg shadow-lg text-white">
                <CollapsibleSection title="Deposit">
                    <ul className="space-y-4">
                        <li>$20 deposit is required to book, and it is non-refundable.</li>
                        <li>Remaining balance can be paid through Cashapp, Zelle, or cash.</li>
                        <li>
                            Cashapp: <span className="text-gold-500 font-semibold">$imqueenieebee2</span>
                        </li>
                        <li>
                            Zelle: <span className="text-gold-500 font-semibold">862-402-9005</span>
                        </li>
                        <li>
                            Deposit will go towards your remaining balance for your service but will
                            not be refunded if canceled or missed.
                        </li>
                    </ul>
                </CollapsibleSection>

                <CollapsibleSection title="COVID-19 Rules">
                    <ul className="space-y-4">
                        <li>A mask is required!</li>
                        <li>
                            Please do not come to your appointment if you are feeling sick or have any
                            symptoms; let me know and we will reschedule.
                        </li>
                        <li>
                            If you have traveled or been in contact with anyone who has, please do not
                            come and let me know in advance for a cancellation.
                        </li>
                    </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Bookings">
                    <ul className="space-y-4">
                        <li>All appointments require a $20 deposit which is non-refundable!</li>
                        <li>
                            Any squeeze-ins or appointments outside of availability are an additional $45.
                        </li>
                    </ul>
                </CollapsibleSection>

                <CollapsibleSection size={'small'} title="Rescheduling & Cancelations">
                    <ul className="space-y-4">
                        <li>You must notify me 24 hours in advance to reschedule an appointment.</li>
                        <li>NO SHOWS will result in cancellation.</li>
                        <li>
                            Example of "no show" - no text or call 24 hours in advance if you are unable
                            to come.
                        </li>
                    </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Lateness Policy">
                    <ul className="space-y-4">
                        <li>A 10-minute late grace period is given.</li>
                        <li>After 10 minutes late = $10 fee is added.</li>
                        <li>15 minutes late = canceled appointment.</li>
                    </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Fill-ins">
                    <ul className="space-y-4">
                        <li>You MUST have 50% of your lashes remaining for a fill-in.</li>
                        <li>I recommend fills every 2 weeks, a maximum of 3 weeks is allowed.</li>
                    </ul>
                </CollapsibleSection>

                <CollapsibleSection title="After Care">
                    <ul className="space-y-4">
                        <li>DO NOT wet lashes for the first 24 hours.</li>
                        <li>Brush daily.</li>
                        <li>Clean with an oil-free cleanser.</li>
                        <li>Stay away from oil-based makeup/skin products.</li>
                    </ul>
                </CollapsibleSection>
            </div>

        </CollapsibleSectionMain>
    )
};

export default BookingInfo;
