import { isDev } from "@/app/myCodes/Util";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let data = await request.json();
    let {
        ownerID = 0,
        bookID = 0,
        customer = {},
        service = {},
        addons,
        name = '',
        phone = '',
        email = '',
        apointmentDate = '',
        apointmentTime = '',
        OwnerUserName = ''
    } = data;

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Crowned Brows & Lashes Deposit"
                    },
                    unit_amount: 2500
                },
                quantity: 1
            }
        ],
        customer: customer || null,
        mode: 'payment',
        success_url: `https://${!isDev() ? 'crownedbl.vercel.app' : 'localhost:3000'}/Checkout/Success/${bookID}`,
        cancel_url: `https://${!isDev() ? 'crownedbl.vercel.app' : 'localhost:3000'}/Checkout/Cancelled/${bookID}`,
        metadata: {
            customerID: customer?.ID,
            customerName: name,
            customerEmail: email,
            customerPhone: phone,
            service: service,
            addons: addons,
            apointmentDate: apointmentDate,
            apointmentTime: apointmentTime,
            type: 'checkout',
            ownerID:ownerID,
            ownerUserName:OwnerUserName
        },

    })
    console.log(session.url)
    return NextResponse.json(session.url)
}



/*  line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ], */
