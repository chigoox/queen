'use client'
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { addToDoc, deleteDocument, fetchDocument, useFetchDocsPresist } from "../../../myCodes/Database"
import { setCSSVariables } from "@/app/myCodes/Util"


export default function ThankYou() {

        const [ownerData, setOwnerData] = useState(false)
        const pathname = usePathname()
        const search = pathname.replace('/Checkout/Success/', '').replace('/', '')
        const [loading, setLoading] = useState(false)
        
        
        const {
            colors = {
              background: '#ffffff',
              accent: '#000000',
              text: '#333333',
              text2: '#333333',
              text3: '#333333',
            },
          } = ownerData?.siteInfo || {} 
        
        
        //fetch Data for user in current page
        useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const data = await fetchDocument('Owners', search, setOwnerData);
           
            setLoading(false)
        }
        getData()
        }, [])

       
          
            useEffect(() => {
              setCSSVariables('--BGColor',colors.background)
               setCSSVariables('--TextColorM', colors.text)
               setCSSVariables('--TextColor', colors.text2)
               setCSSVariables('--TextColor2', colors.text3)
              setCSSVariables('--AccentColor', colors.accent)
          
          
            }, [colors])



        console.log(ownerData)
    return (
        <div className="min-h-screen bg-gradient-to-t from-[color:var(--BGColor)] to-[color:var(--BGColorL)] flex items-center justify-center">
            <div className="text-center max-w-xl p-8 border-2 border-[color:var(--AccentColor)] rounded-lg shadow-lg ">
                <h1 className="text-6xl font-extrabold text-[color:var(--AccentColor)] mb-6 animate-pulse">
                    Thank You!
                </h1>
                <p className="text-lg text-[color:var(--AccentColor)] mb-4">
                    Your booking has been successfully confirmed.
                </p>
                <p className="text-md text-[color:var(--TextColorM)]">
                    We look forward to serving you. If you have any questions, please
                    don't hesitate to contact us.
                </p>
                <div className="mt-8">
                    <a
                        href={`/${ownerData?.userName}/Booking`}
                        className="px-6 py-3 bg-[color:var(--AccentColor)] text-[color:var(--TextColor)] font-semibold rounded-full shadow-md hover:bg-yellow-400 transition-transform transform hover:scale-105"
                    >
                        Book Again
                    </a>
                </div>
            </div>
        </div>
    );
}
