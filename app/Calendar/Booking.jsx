import { FetchTheseDocs, addToDatabase } from "@/app/myCodes/Database";
import {
    add,
    eachDayOfInterval,
    eachMinuteOfInterval,
    endOfDay,
    endOfMonth,
    endOfWeek,
    format,
    getDay,
    isAfter,
    isBefore,
    isEqual,
    isSameMonth,
    isThisMonth,
    isToday,
    parse,
    parseISO,
    set,
    startOfDay,
    startOfToday,
    startOfWeek,
    startOfYesterday
} from "date-fns"
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useMemo, useState } from 'react'
import { cn, dayNames } from "../../lib/utils"
import AvailableHours from "./AvailableHours"
import TimesBar from './TimesBar'
import { fetchDocument } from '@/UTIL/Database'
import Loading from "@/app/Loading"
import { Form, Input } from "@nextui-org/react"
import {getRandTN} from '@/app/myCodes/Util'
import {addToDoc} from '@/app/myCodes/Database'
import { serverTimestamp } from "firebase/firestore"




const Bookings = ({OWNER, bookingInfo, setBookingInfo}) => {
    const [adminDATA, setAdminDATA] = useState({})
    const reservations = adminDATA?.allRes ? adminDATA?.allRes : []

    const apointmentInterveral = Number(OWNER?.siteInfo?.apointmentInterveral )|| 60

    const [reload, setReload] = useState(false)
    // display div of availables times
    const [calendarTouched, setCalendarTouched] = useState(false)
    // handle dates
    let today = startOfToday()
    let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"))
    let [selectedDay, setSelectedDay] = useState(today)
    let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date())
    let days = useMemo(
        () =>
            eachDayOfInterval({
                start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
                end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 })
            }),
        [firstDayCurrentMonth]
    )

    // all days avaiilable times in this month until you change it
    const [availableTimesInThisMonth, setAvailableTimesInThisMonth] = useState([])
    const [
        availableTimesInThisMonthForEachDay,
        setAvailableTimesInThisMonthForEachDay
    ] = useState([])

    // next and prev month functions
    function prevMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
    }
    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
    }

    // get available times for the selected day
    const freeTimes = useMemo(() => {
        const StartOfToday = startOfDay(selectedDay)
        const endOfToday = endOfDay(selectedDay)
        // change your working hours here
        const startHour = set(StartOfToday, { hours: 9 })
        const endHour = set(endOfToday, { hours: 20, minutes: 0 })
        let hoursInDay = eachMinuteOfInterval(
            {
                start: startHour,
                end: endHour
            },
            { step: apointmentInterveral }
        )

        // filter the available hours
        let freeTimes = hoursInDay.filter(
            hour => !reservations.includes(parseISO(hour.toISOString()).toString())
        )

        return freeTimes
    }, [selectedDay])

    // calculate the number of available times for each day in this month
    useMemo(() => {
        let thisMonthTimesLength = []
        let thisMonthTimesEachDay = []
        days.map((day, dayIdx) => {
            // get times

            const StartOfToday = startOfDay(day)
            const endOfToday = endOfDay(day)
            // change your working hours here
            const startHour = set(StartOfToday, { hours: 9 })
            const endHour = set(endOfToday, { hours: 20, minutes: 0 })
            let hoursInDay = eachMinuteOfInterval(
                {
                    start: startHour,
                    end: endHour
                },
                { step: apointmentInterveral }
            )
            // filter the available hours
            let freeTimes = hoursInDay.filter(
                hour => !reservations.includes(parseISO(hour.toISOString()).toString())
            )
            thisMonthTimesLength.push(freeTimes.length)
            thisMonthTimesEachDay.push(freeTimes)
        })

        setAvailableTimesInThisMonth(thisMonthTimesLength)
        setAvailableTimesInThisMonthForEachDay(thisMonthTimesEachDay)
    }, [currentMonth])
    const bookingOptions = [
        'Yes',
        'No', //bg-[color:var(--BGColor)]



    ]

    //total is booking price + all addons filter for true and multiply by 30
    let total = bookingInfo?.price + (Object.values(bookingInfo?.addOns || {}).map((item) => { if (item == true) return item }).length) * 30
    console.log(total)
    total = (total * (bookingInfo?.bundle ? 1.0 : 0.50) * (bookingInfo?.bundle ? 4.0 : 1.0)) - (bookingInfo?.bundle ? 50 : 0), //if bundled( price * 4 - 50) else (price/2)
        console.log(total)
    useEffect(() => {
        fetchDocument('Admin', 'reservations', setAdminDATA)

    }, [reload, calendarTouched, selectedDay])





    const canBook = () => {
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        const validatePhone = (phone) => {
            return String(phone)
                .toLowerCase()
                .match(
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
                );
        };
        if (validateEmail(bookingInfo?.customer?.email) && bookingInfo?.customer?.name && validatePhone(bookingInfo?.customer?.phone)) {

            return true

        }

        return false
    }
    const [loading, setLoading] = useState(false)


    const bookNow = async () => {
        setLoading(true)
        console.log('asd')
        const customerData = await fetch('/api/FindCustomer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
             redirect: 'follow',
            body: JSON.stringify({
                name: bookingInfo?.customer.name,
                email: bookingInfo?.customer.email,
                phone: bookingInfo?.customer.phone,
                
            })
        })
const bookID = getRandTN(10)
        const StripeCustomer = await customerData?.json()
        const customerID = StripeCustomer[0]?.id
       
        let apointments = await FetchTheseDocs('Apointment', 'dateCreatedServerTime', '==', true)
        const apointmentID = `AP_${getRandTN(10)}`
        
        
        const data = await fetch('/api/CheckoutConnected', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
             redirect: 'follow',
            body: JSON.stringify({
                price: bookingInfo?.metadata?.price || 0,// ORIGINAL (bookingInfo?.price * (bookingInfo.bundle ? 1 : 0.50) * bookingInfo.bundle ? 4 : 1) - bookingInfo.bundle ? 50 : 0, //if bundled( price * 4 - 50) else (price/2)
                name: bookingInfo?.customer.name || null,
                email: bookingInfo?.customer.email || null,
                phone: bookingInfo?.customer.phone || null,
                addons: JSON.stringify(bookingInfo.addons || []),
                customer: customerID || null,
                service: JSON.stringify(bookingInfo.service || {}),
                apointmentDate: bookingInfo?.apointment || null,
                apointmentTime: bookingInfo?.time12 || null,
                ownerID: OWNER?.uid || null,
                OwnerUserName: OWNER?.userName || null,
                bookID: bookID || null,
                apointmentID: apointmentID || null,
                siteName: OWNER?.siteInfo?.name || null,
                siteDeposit: OWNER?.siteInfo?.depositFee || null,
                stripeAccountID: OWNER?.stripeAccountID || null
            })
        })
        
        let URL = await data.json()
       // await addToDoc('Temp', bookID, apointment)
        window.location.href = URL

    }

    return (
        <div className='z-30 bg-[color:var(--BGColor)] mt-8  m-auto w-full text-[color:var(--TextColorM)] h-full hidescroll overflow-scroll'>
            {loading && <Loading />}

            {
                <div className={`mt-10  trans flex flex-col  md:flex-row   md:items-start  lg:justify-center   bg-[color:var(--BGColor)] mb-10 md:mb-24`}>


                    {/* calendar implementation */}
                    <div className="flex flex-col gap-2 h-[450px] w-[380px] md:h-fit md:w-fit mb-10 fadeInZoom m-auto my-0">
                        {/* calendar header */}
                        <div className="grid grid-cols-3 md:w-[40rem] px-8">
                            <button
                                type="button"
                                onClick={prevMonth}
                                disabled={isThisMonth(new Date(currentMonth))}
                            >
                                <ChevronLeft
                                    size={20}
                                    aria-hidden="true"
                                    className={cn(
                                        isThisMonth(new Date(currentMonth)) && "text-[color:var(--AccentColor)]"
                                    )}
                                />
                            </button>
                            <h2 className="font-semibold text-[color:var(--AccentColor)] justify-center flex text-center">
                                {format(firstDayCurrentMonth, " MMMM yyyy")}
                            </h2>
                            <button
                                type="button"
                                className="flex justify-end"
                                onClick={nextMonth}
                            >
                                <ChevronRight size={20} aria-hidden="true" className="text-[color:var(--AccentColor)]" />
                            </button>
                        </div>

                        {/* calendar body */}
                        <div className='p-2'>
                            <div className="grid grid-cols-7 mt-4 md:w-[40rem]">
                                {dayNames.map((day, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className={cn(
                                                "flex justify-center items-center text-sm text-[color:var(--AccentColor)] w-full py-2",
                                                {
                                                    "text-[color:var(--AccentColorLight)] ":
                                                        day === "Sun" || day === "Sat"
                                                }
                                            )}
                                        >
                                            {day}
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="grid grid-cols-7 text-sm gap-2 md:w-[40rem]">
                                {days.map((day, dayIdx) => {
                                    return (
                                        <div
                                            key={day.toString()}
                                            className={cn(
                                                dayIdx === 0 && colStartClasses[getDay(day) - 1],
                                                " justify-center flex items-center",
                                                (getDay(day) === 0 || getDay(day) === 6) &&
                                                "style for sat and sun bg"
                                            )}
                                        >
                                            <button
                                                onClick={() => {
                                                    setCalendarTouched(true)
                                                    setSelectedDay(day)
                                                }}
                                                className={cn(
                                                    "w-12 h-12 md:h-24 md:w-24 flex flex-col p-2 justify-center items-center rounded-xl gap-0 group bg-[color:var(--AccentColor)] relative group",
                                                    isEqual(day, selectedDay) &&
                                                    "bg-[color:var(--AccentColorLight)] text-[color:var(--TextColor)] text-lg",
                                                    isEqual(today, day) && "text-[color:var(--TextColor)] bg-[color:var(--AccentColorLight)]",
                                                    isBefore(day, today) &&
                                                    "bg-[color:var(--AccentColorDark2)]  cursor-not-allowed",
                                                    isEqual(today, day) && "text-[color:var(--TextColorM)] bg-[color:var(--AccentColorLight2)]",
                                                    isBefore(day, today) && "cursor-not-allowed",
                                                    isEqual(day, selectedDay) &&
                                                    isToday(day) &&
                                                    "text-[color:var(--TextColor)]",
                                                    !isEqual(day, selectedDay) &&
                                                    !isToday(day) &&
                                                    !isSameMonth(day, firstDayCurrentMonth) &&
                                                    "text-[color:var(--TextColorM)]",
                                                    !isEqual(day, selectedDay) &&
                                                    !isToday(day) &&
                                                    isSameMonth(day, firstDayCurrentMonth) &&
                                                    "text-[color:var(--TextColorM)]"
                                                )}
                                                disabled={isBefore(day, today)}
                                            >
                                                {isAfter(day, startOfYesterday()) && (
                                                    <span className="hidden group-hover:flex absolute top-0 -translate-x-.5 -translate-y-4 z-10 text-[11px] bg-slate-900 text-[color:var(--TextColorM)] px-1 rounded-md gap-1">
                                                        <span>{availableTimesInThisMonth[dayIdx]}</span>
                                                        <span>Available</span>
                                                    </span>
                                                )}

                                                <time
                                                    dateTime={format(day, "yyyy-MM-dd")}
                                                    className={cn(
                                                        "group-hover:text-lg trans ",
                                                        (isEqual(day, selectedDay) || isToday(day)) &&
                                                        "font-semibold"
                                                    )}
                                                >
                                                    {format(day, "d")}
                                                </time>

                                                <CheckCircle2
                                                    className={cn(
                                                        "hidden",
                                                        isEqual(day, selectedDay) &&
                                                        "absolute block top-0 right-0 h-[18px] w-[18px] translate-x-1 -translate-y-1 text-[color:var(--AccentColor)]",
                                                        isEqual(day, today) && "text-[color:var(--AccentColorLight)]"
                                                    )}
                                                />

                                                {isAfter(day, startOfYesterday()) && (
                                                    <TimesBar
                                                        times={availableTimesInThisMonthForEachDay[dayIdx]}
                                                    />
                                                )}
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className={cn(`hidden mx-auto fadeInZoom`, calendarTouched && "block")}>
                        <span className="flex items-center w-full justify-center gap-1">
                            <span>
                                <h1 className='text-center'>Select reservation time</h1>
                                <h1 className="text-center text-[color:var(--AccentColor)] font-semibold pl-1">
                                    {format(selectedDay, "dd MMMM yyyy").toString()}
                                </h1>
                            </span>
                        </span>

                        <AvailableHours freeTimes={freeTimes} setBookingInfo={setBookingInfo} reload={reload} setReload={setReload} />
                    </div>
                </div>

            }
            {bookingInfo?.apointment && <div id="checkout" className=' mb-96  center flex-col text-[color:var(--TextColorM)] p-2'>
                <h1 className='text-xl text-center text-[color:var(--TextColor)]'>{`Your reservation is on:`}</h1>
                <h1 className="font-bold text-2xl text-[color:var(--TextColor)]">{bookingInfo?.apointment}</h1>
                <h1 className='text-center text-[color:var(--AccentColor)]'>depoit $25 to comfirm booking</h1>
                <div className=" flex md:flex-row flex-col items-start justify-center gap-4 mb-8">
                    <h1 className="font-bold mt-4  text-[color:var(--TextColorM)]">Contact Info:</h1>
                    <input className="h-10 mb-2 p-2 rounded-lg text-black" placeholder="Full name" type="text" onChange={({ target }) => { setBookingInfo(old => { return ({ ...old, customer:{...old.customer, name: target.value} }) }) }} />
                    <input className="h-10 my-2 p-2 rounded-lg text-black" placeholder="Email" type="email" onChange={({ target }) => { setBookingInfo(old => { return ({ ...old, customer:{...old.customer, email: target.value} }) }) }} />
                    <input className="h-10 my-2 p-2 rounded-lg text-black" placeholder="Phone" type="tel" onChange={({ target }) => { setBookingInfo(old => { return ({ ...old, customer:{...old.customer, phone: target.value} })}) }} />
                </div>



                {!canBook() && <button disabled className={`h-12 w-32 cursor-not-allowed rounded-full ${canBook() ? ' bg-[color:var(--AccentColor)]' : 'bg-[color:var(--AccentColorDark2)] text-[color:var(--TextColorM)]'} `}>Book Now</button>}
                {canBook() && <button onClick={bookNow} className={`h-12 w-32 rounded-full ${canBook() ? 'text-[color:var(--TextColorM)] bg-[color:var(--AccentColor)]' : 'bg-[color:var(--AccentColorDark2)] text-[color:var(--TextColorM)]'} `}>Book Now</button>}
            </div>}

        </div>
    )
}

export default Bookings












let colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7"
]
