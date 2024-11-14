import { Image } from '@nextui-org/react'
import React from 'react'
import { AiFillCaretRight } from "react-icons/ai";

function HealthAndSafety() {
    return (
        <div className='relative md:px-20 flex items-center flex-col overflow-y-scroll hidescroll'>
            <h1 className='text-2xl font-bold h-12'>Here’s How
                We’ll Earn Your
                Confidence:</h1>
            <Image src='https://www.kindercare.com/-/media/kindercare/images/school-readiness/school-readiness-bts-2022/kclc_bts-hacks-lp-hp-tile_909182836_desktop_r1v4-3.png?h=450&w=500&la=en&hash=BC8378C2DA9B4B04183D05F4EF62E69F' alt='handshake' />
            <div className='md:w-[35rem] gap-2 md:grid grid-cols-2'>
                <div className='mt-2   border-black col-span-1 p-2 border-dotted'>
                    <div className='flex items-center'>
                        <AiFillCaretRight size={32} className='flex-shrink-0' />
                        <h1 className='font-semibold text-xl'>Health and Safety</h1>
                    </div>
                    <h1 className=''>You can breathe easier knowing your child is in a squeaky-clean environment with proven protocols protecting them.</h1>
                    <h1>emergency physicians advise us on all the things we do to keep your entire family—and our staff—safer from germs, infections, and even natural disasters.</h1>
                </div>



                <div className='mt-2  border-black p-2 border-dotted col-span-1'>

                    <div className='flex items-center'>
                        <AiFillCaretRight size={32} className='flex-shrink-0' />
                        <h1 className='font-semibold text-xl'>Convenience and Flexibility </h1>
                    </div>
                    <h1 className=''>You can breathe easier knowing your child is in a squeaky-clean environment with proven protocols protecting them.</h1>
                    <h1>Your child care provider is only as helpful as it is convenient!</h1>
                    <h1>We’re ready to welcome your child early in the morning, and we extend past most other daycares’ hours to make drop-off and pick-up times fit with your schedule.</h1>
                </div>

                <div className='col-span-2 mt-2  border-black p-2 border-dotted'>
                    <div className='flex items-center'>
                        <AiFillCaretRight size={32} className='flex-shrink-0' />
                        <h1 className='font-semibold text-xl'>Talent and Trust</h1>
                    </div>
                    <h1>We hire people who love and understand children and are eager to be your partner in parenting.</h1>
                </div>


            </div>
            <div className='center gap-3'>
                <Image className='rounded-l-3xl mt-2 w-32 h-96 object-cover rounded-none md:h-[40rem]' src='https://plus.unsplash.com/premium_photo-1710024587933-60607c28de10?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFieXNpdHRlcnxlbnwwfHwwfHx8MA%3D%3D' alt='boy running?' />
                <Image className='mt-2 w-20 h-96 object-cover rounded-none md:h-[40rem]' src='https://plus.unsplash.com/premium_photo-1711381023188-fc8b77b23f06?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFieXNpdHRlcnxlbnwwfHwwfHx8MA%3D%3D' alt='boy running?' />
                <Image className='mt-2 w-20 h-96 object-cover rounded-none md:h-[40rem]' src='https://plus.unsplash.com/premium_photo-1711381020556-b273f3cd0435?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='boy running?' />
                <Image className='rounded-r-3xl mt-2 w-64 h-96 object-cover rounded-none md:h-[40rem]' src='https://plus.unsplash.com/premium_photo-1711381022575-33abef8db642?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='boy running?' />
            </div>


        </div>
    )
}

export default HealthAndSafety