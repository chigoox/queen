import { Image, Link } from '@nextui-org/react'
import React from 'react'

function HowToEnroll() {
    return (
        <div className=' w-full h-full md:px-20 overflow-x-scroll hidescroll'>
            <div className="flex md:flex-row flex-col items-center justify-center">
                <Image className='w-96 h-96 md:h-64 md:w-64 flex-shrink-0  m-auto object-cover' src='https://www.kindercare.com/-/media/kindercare/images/how-to-enroll/kclc_enrollment-landing-page_homepage-tile_final-contentblock1-600x690.png?h=690&w=600&la=en&hash=16E166BDCFF85E24BCE28D58CCA84747' alt='monkey' />
                <h1 className='font-bold text-3xl md:w-1/2 lg:w-64 text-center md:text-left'>Make the best choice for your family.</h1>
            </div>
            <div className='mt-10'>
                <h1 className='text-2xl font-bold text-center'>Enrolling is as easy as 1-2-3! </h1>
                <div className='p-4'>
                    <Image src='https://www.kindercare.com/-/media/kindercare/images/how-to-enroll/kclc_enrollment-landing-page_homepage-tile_final-feature10;-100x200.png?h=200&w=100&la=en&hash=5DE6DB4A3DE011CEC941DB6173D30186' alt='number1' />
                    <h1 className='mt-4 md:w-96 m-auto'>
                        Reach out directly to the center director. You’ll find their contact information
                        on the center location page. They'd love to hear from you. Your first conversation
                        is just the beginning of a relationship that’ll grow for years to come.
                    </h1>

                    <div className="center mt-4 md:text-xl gap-1">
                        <h1 className='flex-shrink-0'>We can also reach out to you, click</h1>
                        <Link className='font-bold' href='/Enroll'>here</Link>
                        <h1 className='flex-shrink-0'>to enroll</h1>
                    </div>

                </div>
            </div>

            <div className=' m-auto'>
                <Image src='https://www.kindercare.com/-/media/kindercare/pages/enrollment-page/enrollment-lp_asset-enrollingiseasyas123.png?h=624&w=724&la=en&hash=195240EB6355257A99FDC6114882051D' alt='bear?' />
            </div>
        </div>
    )
}

export default HowToEnroll