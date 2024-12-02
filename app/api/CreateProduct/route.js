import { addToDoc } from "@/app/myCodes/Database";
import { getRandTN } from "@/app/myCodes/Util";
import { serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";



export async function POST(request) {
    
    const data = await request.json();
    const { productData } = data
    console.log(productData)

        const id = getRandTN(10)

        await addToDoc('Services', `SRV_${id}`, {
            ...productData,
            created: serverTimestamp(),
            default_price: `PriceID_${getRandTN(10)}`,
            id: `SRV_${id}`
        })

        return NextResponse.json({ status: 'OK POSTED TO FIREBASE' })

}



/*  line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ], */