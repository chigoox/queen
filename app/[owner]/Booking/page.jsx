'use client'

import Bookings from "@/app/Calendar/Booking"
import { Button } from '@nextui-org/react'
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Logo from "../../General/Logo"
import BookingInfo from "../../HomePage/BookingInfo"
import { useFetchDocsPresist } from "../../myCodes/Database"
import NavBar from "../../NavBar/NavBar"
import Addons from "./BookingOptions/Addons"
import BookingOptions from "./BookingOptions/BookingOptions"
import { setCSSVariables } from "@/app/myCodes/Util"



export default function Home() {
  const [startBooking, setStartBooking] = useState(false)
  const [pickAddon, setPickAddon] = useState(false)
  const [selectDate, setSelectDate] = useState(false)
  const [theme, setTheme] = useState('')
  const [ownerData, setOwnerData] = useState([])
  const OWNER = ownerData[0]
const pathname = usePathname()
const pageOwnerUserName = pathname.replace('/Booking','').replace('/','')
const {
  name= '',
  heading= '',
  subHeading= '',
  colors = {
    background: '#ffffff',
    accent: '#000000',
    text: '#333333',
    text2: '#333333',
    text3: '#333333',
  },
  terms= [{ title: '', body: '' }],
  categories= [{ name: '', image: null }],
  logo= null,
  depositFee= 25
} = OWNER?.siteInfo || {} 
//
useEffect(() => {
  const getData = async () => {
    console.log(pageOwnerUserName)
    await useFetchDocsPresist('Owners', 'userName', '==', pageOwnerUserName, 'userName', setOwnerData);
  }
getData()
}, [])


  const [bookingInfo, setBookingInfo] = useState({})


  const [options, setOptions] = useState([])
  console.log(options)
console.log(OWNER)
  useEffect(() => {
    const getData = async () => {
      let FIREBS_PRODUCTS

      await useFetchDocsPresist('Services', 'owner', '==', pageOwnerUserName, 'created', (data) => {
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
    setCSSVariables('--BGColor',colors.background)
     setCSSVariables('--TextColorM', colors.text)
     setCSSVariables('--TextColor', colors.text2)
     setCSSVariables('--TextColor2', colors.text3)
    setCSSVariables('--AccentColor', colors.accent)


  }, [])
  return (
    <div className=" border-[color:var(--AccentColor)] border  min-h-screen bg-[color:var(--BGColor)] w-full overflow-hidden pb-10  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col  p-2">
        <NavBar bookingInfo={bookingInfo} />

        {/* LOGO SECTION */}
        <div className=' w-full h-96'>
          <div className='center-col '>
            <Logo url={logo} />
          </div>
          <div className='mt-4 center-col'>
            <h1 className='text-[color:var(--AccentColor)] text-4xl font-bold text-center'>{heading}</h1>
            <p className='text-[color:var(--TextColorM)] text-xl'>{subHeading}</p>
          </div>
        </div>

        {/* Web Intro */}
        {!startBooking &&
          <div>
            <p className='text-[color:var(--TextColorM)] text-center mt-8'>
              Welcome to {name}! Please read the following terms and conditions before booking.

            </p>
            {/* BOOKING RULES */}
            <BookingInfo termsData={terms} />
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
