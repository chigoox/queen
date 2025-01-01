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
        stripeAccountID = '',
        siteDeposit= 0,
    } = data;
console.log(customer)
    if (customer === null) {
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
            payment_intent_data: {
                application_fee_amount: (Number(siteDeposit) * 100) * 0.10,
                on_behalf_of: stripeAccountID,
                transfer_data: {
                  destination: stripeAccountID,
                },
              },
            mode: 'payment',
            success_url: `https://${!isDev() ? 'booxy.vercel.app' : 'localhost:3000'}/Checkout/Success/${ownerID}`,
            cancel_url: `https://${!isDev() ? 'booxy.vercel.app' : 'localhost:3000'}/Checkout/Cancelled/${ownerID}`,
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

        console.log(session.url)
        return NextResponse.json(session.url)
        
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
            customer: customer,
            payment_intent_data: {
                application_fee_amount: (Number(siteDeposit) * 100) * 0.10,
                on_behalf_of: stripeAccountID,
                transfer_data: {
                  destination: stripeAccountID,
                },
              },
            mode: 'payment',
            success_url:  `${request.headers.get('origin')}/Checkout/Success/${ownerID}`,
            cancel_url: `${request.headers.get('origin')}/Checkout/Cancelled/${ownerID}`,
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

        console.log(session.url)
        return NextResponse.json(session.url)
    }
   
}



  