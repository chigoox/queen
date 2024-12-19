'use client'
import Logo from '@/app/General/Logo';
import BookingInfo from '@/app/HomePage/BookingInfo';
import { Button } from '@nextui-org/react';
import BookingOptions from '@/app/BookingOptions/BookingOptions'
import Booking from '@/app/Calendar/Booking'
import { useEffect, useState } from 'react';
import Addons from '@/app/BookingOptions/Addons'
import { useFetchDocsPresist } from '@/UTIL/Database';
import NavBar from './NavBar/NavBar';

export default function Home() {
  const [startBooking, setStartBooking] = useState(false)
  const [pickAddon, setPickAddon] = useState(false)
  const [selectDate, setSelectDate] = useState(false)

  const [bookingInfo, setBookingInfo] = useState({})

  console.log(bookingInfo)


  const [options, setOptions] = useState([])

  useEffect(() => {
    const getData = async () => {
      let FIREBS_PRODUCTS

      await useFetchDocsPresist('Services', 'active', '!=', false, 'created', (data) => {
        FIREBS_PRODUCTS = data.map(i => {
          const miliseconds = i.created.seconds * 1000 + i.created.nanoseconds / 1000000
          return ({ ...i, created: miliseconds })
        })
        console.log(FIREBS_PRODUCTS)
        setOptions([...FIREBS_PRODUCTS])
      })
    }

    getData()
  }, [window])
  return (
    <div className=" border-yellow-400 border  min-h-screen bg-black w-full overflow-hidden pb-10  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col  p-2">
       <NavBar bookingInfo={bookingInfo}/>

        {/* LOGO SECTION */}
        <div className=' w-full h-96'>
          <div className='center-col '>
            <Logo />
          </div>
          <div className='mt-4 center-col'>
            <h1 className='text-yellow-500 text-4xl font-bold text-center'>Crowned</h1>
            <p className='text-white text-xl'>Brows & Lashes</p>
          </div>
        </div>

        {/* Web Intro */}
        {!startBooking &&
          <div>
            <p className='text-white text-center mt-8'>
              Welcome to Crowned Brows & Lashes! Please read the following terms and conditions before booking.

            </p>
            {/* BOOKING RULES */}
            <BookingInfo />
          </div>}

        {/* ACCEPT AND BOOK */}
        {!startBooking && <Button onPress={() => { setStartBooking(!startBooking) }} className='bg-yellow-500 m-auto md:w-1/3 w-full my-4 text-black font-bold'>Agree & Book</Button>}


        {/* Booking Options */}
        {(startBooking && !selectDate) && <BookingOptions bookingInfo={bookingInfo} setBookingInfo={setBookingInfo} options={options} />}

        {/* Continue to booking addons */}
        {(startBooking && !selectDate && bookingInfo?.service) && <Button onPress={() => { setPickAddon(!pickAddon) }} on className='font-bold text-xl'>Continue</Button>}
        {(startBooking && !selectDate ) && <Button onPress={() => { setStartBooking(false) }} on className='font-bold text-xl mt-4 mb-12'>Back</Button>}
        <Addons setBookingInfo={setBookingInfo} options={options} contintue={setSelectDate} setIsOpened={setPickAddon} opened={pickAddon} />

        {selectDate && <Booking bookingInfo={bookingInfo} setBookingInfo={setBookingInfo}/>}
      </main>

    </div>
  );
}
