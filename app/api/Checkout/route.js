import { isDev } from "@/app/myCodes/Util";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let data = await request.json();
    let {
        ownerID = 0,
        bookID = 0,
        apointmentID = 0,
        customer = 0,
        service = {},
        addons,
        name = '',
        phone = '',
        email = '',
        apointmentDate = '',
        apointmentTime = '',
        OwnerUserName = '',
        siteName= '',
        siteDeposit= 0,
    } = data;
console.log(customer)
    if (customer === '') {
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
            mode: 'payment',
            success_url: `https://${!isDev() ? 'crownedbl.vercel.app' : 'localhost:3000'}/Checkout/Success/${ownerID}`,
            cancel_url: `https://${!isDev() ? 'crownedbl.vercel.app' : 'localhost:3000'}/Checkout/Cancelled/${ownerID}`,
            metadata: {
                customerID: customer,
                customerName: name,
                customerEmail: email,
                customerPhone: phone,
                service: service,
                addons: addons,
                apointmentDate: apointmentDate,
                apointmentTime: apointmentTime,
                type: 'checkout',
                ownerID:ownerID,
                OwnerUserName:OwnerUserName,
                apointmentID: apointmentID,
            },
    
        })
    }else{
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: siteName? siteName + ' Deposit' :  'Deposit'
                        },
                        unit_amount: Number(siteDeposit) * 100 || 2500
                    },
                    quantity: 1
                }
            ],
            customer: customer || null,
            mode: 'payment',
            success_url: `https://${!isDev() ? 'crownedbl.vercel.app' : 'localhost:3000'}/Checkout/Success/${ownerID}`,
            cancel_url: `https://${!isDev() ? 'crownedbl.vercel.app' : 'localhost:3000'}/Checkout/Cancelled/${ownerID}`,
            metadata: {
                siteName: siteName,
                siteDeposit: siteName,
                customerID: customer,
                customerName: name,
                customerEmail: email,
                customerPhone: phone,
                service: service,
                addons: addons,
                apointmentDate: apointmentDate,
                apointmentTime: apointmentTime,
                type: 'checkout',
                ownerID:ownerID,
                OwnerUserName:OwnerUserName,
                apointmentID: apointmentID,
            },
    
        })
    }
    console.log(session.url)
    return NextResponse.json(session.url)
}



/*  line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ], */
