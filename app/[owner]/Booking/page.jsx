'use client'

import Bookings from "@/app/Calendar/Booking"
import { setCSSVariables } from "@/app/myCodes/Util"
import { Button } from '@nextui-org/react'
import { getAuth } from "firebase/auth"
import { Settings2 } from "lucide-react"
import { Bebas_Neue, Inter, Josefin_Sans, Lato, Merriweather, Montserrat, Open_Sans, Oswald, Poppins, PT_Sans, Quicksand, Raleway, Roboto, Rubik, Slabo_27px, Source_Code_Pro, Space_Mono, Syne_Mono } from "next/font/google"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Logo from "../../General/Logo"
import BookingInfo from "../../HomePage/BookingInfo"
import { useFetchDocsPresist } from "../../myCodes/Database"
import NavBar from "../../NavBar/NavBar"
import Addons from "./BookingOptions/Addons"
import BookingOptions from "./BookingOptions/BookingOptions"



[
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Oswald',
  'Source Sans Pro',
  'Slabo 27px',
  'Raleway',
  'PT Sans',
  'Merriweather'
];


//FONTS 
const syne_Mono = Syne_Mono({
  weight: '400',
  subsets: ['latin'],
})
const space_Mono = Space_Mono({
  weight: '400',
  subsets: ['latin'],
})
const bebas_Neue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
})
const josefin_Sans = Josefin_Sans({
  weight: '400',
  subsets: ['latin'],
})
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
const open_Sans = Open_Sans({
  weight: '400',
  subsets: ['latin'],
})
const lato = Lato({
  weight: '400',
  subsets: ['latin'],
})
const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
})
const oswald = Oswald({
  weight: '400',
  subsets: ['latin'],
})
const source_Code_Pro = Source_Code_Pro({
  weight: '400',
  subsets: ['latin'],
})
const slabo_27px = Slabo_27px({
  weight: '400',
  subsets: ['latin'],
})
const raleway = Raleway({
  weight: '400',
  subsets: ['latin'],
})
const pt_Sans = PT_Sans({
  weight: '400',
  subsets: ['latin'],
})
const merriweather = Merriweather({
  weight: '400',
  subsets: ['latin'],
})
const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})
const inter = Inter({
  weight: '400',
  subsets: ['latin'],
})
const quicksand = Quicksand({
  weight: '400',
  subsets: ['latin'],
})
const rubik = Rubik({
  weight: '400',
  subsets: ['latin'],
})
//END FONTS





export default function Home() {
  const [startBooking, setStartBooking] = useState(false)
  const [pickAddon, setPickAddon] = useState(false)
  const [selectDate, setSelectDate] = useState(false)
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
    font = '',
    categories= [{ name: '', image: null }],
    logo= null,
    depositFee= 25
  } = OWNER?.siteInfo || {} 

  const siteInfo = OWNER?.siteInfo

  const pageFont = siteInfo?.font == 'Roboto' ? roboto :
  siteInfo?.font == 'Open Sans' ? open_Sans :
  siteInfo?.font == 'Lato' ? lato : 
  siteInfo?.font == 'Montserrat' ? montserrat : 
  siteInfo?.font == 'Oswald' ? oswald : 
  siteInfo?.font == 'Source Code Pro' ? source_Code_Pro : 
  siteInfo?.font == 'Slabo 27px' ? slabo_27px : 
  siteInfo?.font == 'Raleway' ? raleway : 
  siteInfo?.font == 'PT Sans' ? pt_Sans : 
  siteInfo?.font == 'Merriweather' ? merriweather :
  siteInfo?.font == 'Poppins' ? poppins :
  siteInfo?.font == 'Inter' ? inter :
  siteInfo?.font == 'Quicksand' ? quicksand :
  siteInfo?.font == 'Rubik' ? rubik :
  siteInfo?.font == 'Bebas Neue' ? bebas_Neue :
  siteInfo?.font == 'Josefin Sans' ? josefin_Sans :
  siteInfo?.font == 'Syne Mono' ? syne_Mono : space_Mono
  console.log(pageFont.className)

const ownerUID = OWNER?.uid
const userID = getAuth()?.currentUser?.uid
const isAdmin = ownerUID === userID
//
useEffect(() => {
  const getData = async () => {
    await useFetchDocsPresist('Owners', 'userName', '==', pageOwnerUserName, 'userName', setOwnerData);
  }
getData()
}, [])


  const [bookingInfo, setBookingInfo] = useState({})


  const [options, setOptions] = useState([])

  useEffect(() => {
    const getData = async () => {
      let FIREBS_PRODUCTS
      await useFetchDocsPresist('Services', 'owner', '==', OWNER?.uid, 'created', (data) => {
        FIREBS_PRODUCTS = data.map(i => {
          const miliseconds = i.created.seconds * 1000 + i.created.nanoseconds / 1000000
          return ({ ...i, created: miliseconds })
        })
        setOptions([...FIREBS_PRODUCTS])
      })
    }

    getData()
  }, [OWNER])

  useEffect(() => {
    setCSSVariables('--BGColor',colors.background)
     setCSSVariables('--TextColorM', colors.text)
     setCSSVariables('--TextColor', colors.text2)
     setCSSVariables('--TextColor2', colors.text3)
    setCSSVariables('--AccentColor', colors.accent)


  }, [colors])

  const {push} = useRouter()
  return (
    <div className={`${pageFont.className} border-[color:var(--AccentColor)] border  min-h-screen bg-[color:var(--BGColor)] w-full overflow-hidden pb-10 md:px-40 `}>
      <main className="flex flex-col  p-2">
        <NavBar bookingInfo={bookingInfo} />

        {/* LOGO SECTION */}
        <div className=' w-full h-96'>
          <div className='center-col'>
            {isAdmin && <Button  onPress={() => { push(`/${pageOwnerUserName}/Admin`) }} className='absolute z-50 bg-opacity-0 top-4 right-4 bg-[color:var(--AccentColor)] text-[color:var(--TextColor)]'>

            <Settings2  size={'32'} className=""/>
            </Button>}
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
        {(startBooking && !selectDate) && <BookingOptions categories={categories} bookingInfo={bookingInfo} setBookingInfo={setBookingInfo} options={options} />}

        {/* Continue to booking addons */}
        {(startBooking && !selectDate && bookingInfo?.service) && <Button onPress={() => { setPickAddon(!pickAddon) }} on className='font-bold text-xl bg-[color:var(--AccentColor)] text-[color:var(--TextColor)]'>Continue</Button>}
        {(startBooking && !selectDate) && <Button onPress={() => { setStartBooking(false) }} on className='font-bold text-xl mt-4 mb-12 bg-[color:var(--AccentColor)] text-[color:var(--TextColor)]'>Back</Button>}
        <Addons setBookingInfo={setBookingInfo} options={options} contintue={setSelectDate} setIsOpened={setPickAddon} opened={pickAddon} />

        {selectDate && <Bookings OWNER={OWNER} bookingInfo={bookingInfo} setBookingInfo={setBookingInfo} />}
      </main>

    </div>
  );
}
