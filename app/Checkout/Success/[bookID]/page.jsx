'use client'
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { addToDoc, deleteDocument, fetchDocument, useFetchDocsPresist } from "../../../myCodes/Database"


export default function ThankYou() {

        const [bookingData, setBookingData] = useState([])
        const APPOINTMENT = bookingData.length > 0 ? bookingData[0] : null
        const [ownerData, setOwnerData] = useState(false)
        const pathname = usePathname()
        const search = pathname.replace('/Checkout/Success/', '').replace('/', '')
        const [loading, setLoading] = useState(false)
        //fetch Data for user in current page
        useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const data = await fetchDocument('Temp', search, setBookingData);
           
            await fetchDocument('Owner', data?.ownerID, setOwnerData)
           
           
            if (data?.service) {
              await  addToDoc('Apointment', `AP_${data.bookID}`, {...data, apointmentID: `AP_${data.bookID}`})
              await deleteDocument('Temp', data.bookID)
            }
            setLoading(false)
        }
        getData()
        }, [])




        console.log(ownerData)
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
            <div className="text-center max-w-xl p-8 border-2 border-gold rounded-lg shadow-lg ">
                <h1 className="text-6xl font-extrabold text-gold mb-6 animate-pulse">
                    Thank You!
                </h1>
                <p className="text-lg text-gold mb-4">
                    Your booking has been successfully confirmed.
                </p>
                <p className="text-md text-gray-300">
                    We look forward to serving you. If you have any questions, please
                    don't hesitate to contact us.
                </p>
                <div className="mt-8">
                    <a
                        href="/"
                        className="px-6 py-3 bg-gold text-black font-semibold rounded-full shadow-md hover:bg-yellow-400 transition-transform transform hover:scale-105"
                    >
                        Book Again
                    </a>
                </div>
            </div>
        </div>
    );
}
