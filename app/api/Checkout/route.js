import { siteName } from "@/app/META";
import { isDev } from "@/app/myCodes/Util";
import { NextResponse } from "next/server";
import Stripe from "stripe";



export async function POST(request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let data = await request.json();
    let { 
        customer = {}, 
        service = {}, 
        addons, 
        name = '', 
        phone = '', 
        email = '' 
    } = data;

    console.log( customer, service, addons,  name, phone, email)
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
        success_url: `http://${!isDev() ? siteName?.replace(/\s/g, '').replace(/\'/g, '') + '.com' : 'localhost:3000'}/Checkout/success`,
        cancel_url: `http://${!isDev() ? siteName?.replace(/\s/g, '').replace(/\'/g, '') + '.com' : 'localhost:3000'}/Checkout/canceled`,
        metadata: {
            customerID: customer?.ID,
            customerName: name,
            customerEmail: email,
            customerPhone: phone,
            serviceName: service?.name,
            servicePrice: service?.price,
            serviceTime: service?.time,
            type: 'checkout'
        },

    })
console.log(session)
    return NextResponse.json(session.url)
}



/*  line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ], */
