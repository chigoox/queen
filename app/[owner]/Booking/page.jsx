'use client'

import { useEffect, useState } from "react"
import { useFetchDocsPresist, watchDocument } from "../../myCodes/Database"
import BookingInfo from "../../HomePage/BookingInfo"
import Addons from "./BookingOptions/Addons"
import BookingOptions from "./BookingOptions/BookingOptions"
import NavBar from "../../NavBar/NavBar"
import Logo from "../../General/Logo"
import { Button } from '@nextui-org/react';
import Bookings from "@/app/Calendar/Booking"
import { usePathname } from "next/navigation"



export default function Home() {
  const [startBooking, setStartBooking] = useState(false)
  const [pickAddon, setPickAddon] = useState(false)
  const [selectDate, setSelectDate] = useState(false)
  const [theme, setTheme] = useState('')
const [ownerData, setOwnerData] = useState({})
const pathname = usePathname()
const owenerID = pathname.replace('/Booking','').replace('/','')
console.log(ownerData)

useEffect(() => {
  const getData = async () => {
watchDocument('Owner',owenerID, setOwnerData)
  }


getData()

}, [])

  const [bookingInfo, setBookingInfo] = useState({})



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

  useEffect(() => {
   // setCSSVariable('--BGColor', theme?.bgColor)
    // setCSSVariables('--TextColor', theme?.textColor)
    // setCSSVariables('--AccentColor', theme?.accentColor)

  }, [])
  return (
    <div className=" border-[color:var(--AccentColor)] border  min-h-screen bg-[color:var(--BGColor)] w-full overflow-hidden pb-10  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col  p-2">
        <NavBar bookingInfo={bookingInfo} />

        {/* LOGO SECTION */}
        <div className=' w-full h-96'>
          <div className='center-col '>
            <Logo />
          </div>
          <div className='mt-4 center-col'>
            <h1 className='text-[color:var(--AccentColor)] text-4xl font-bold text-center'>Crowned</h1>
            <p className='text-[color:var(--TextColorM)] text-xl'>Brows & Lashes</p>
          </div>
        </div>

        {/* Web Intro */}
        {!startBooking &&
          <div>
            <p className='text-[color:var(--TextColorM)] text-center mt-8'>
              Welcome to Crowned Brows & Lashes! Please read the following terms and conditions before booking.

            </p>
            {/* BOOKING RULES */}
            <BookingInfo />
          </div>}

        {/* ACCEPT AND BOOK */}
        {!startBooking && <Button onPress={() => { setStartBooking(!startBooking) }} className='bg-[color:var(--AccentColor)] text-[color:var(--TextColor)] m-auto md:w-1/3 w-full relative bottom-4 my-10 mb-10 font-bold'>Agree & Book</Button>}


        {/* Booking Options */}
        {(startBooking && !selectDate) && <BookingOptions bookingInfo={bookingInfo} setBookingInfo={setBookingInfo} options={options} />}

        {/* Continue to booking addons */}
        {(startBooking && !selectDate && bookingInfo?.service) && <Button onPress={() => { setPickAddon(!pickAddon) }} on className='font-bold text-xl bg-[color:var(--AccentColor)] text-[color:var(--TextColor)]'>Continue</Button>}
        {(startBooking && !selectDate) && <Button onPress={() => { setStartBooking(false) }} on className='font-bold text-xl mt-4 mb-12 bg-[color:var(--AccentColor)] text-[color:var(--TextColor)]'>Back</Button>}
        <Addons setBookingInfo={setBookingInfo} options={options} contintue={setSelectDate} setIsOpened={setPickAddon} opened={pickAddon} />

        {selectDate && <Bookings bookingInfo={bookingInfo} setBookingInfo={setBookingInfo} />}
      </main>

    </div>
  );
}
