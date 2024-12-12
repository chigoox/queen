import { siteName } from "@/app/META"; 
import { isDev } from "@/app/myCodes/Util"; 
import { NextResponse } from "next/server"; 
import Stripe from "stripe"; 
 
export async function POST(request) { 
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 
        let data = await request.json(); 

        // Log the entire incoming data for debugging
        console.log('Incoming data:', JSON.stringify(data, null, 2));

        // Defensive destructuring with default empty objects
        const { 
            customer = {}, 
            service = {}, 
            addons = [], 
            name = '', 
            phone = '', 
            email = '' 
        } = data;

        // Additional null checks
        const serviceName = service?.name || 'Unnamed Service';
        const servicePrice = service?.price || 0;
        const serviceTime = service?.time || '';
        const customerID = customer?.ID || null;

        const session = await stripe.checkout.sessions.create({ 
            line_items: [{ 
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Crowned Brows & Lashes Deposit',
                    },
                    unit_amount: 2500, // Stripe expects amount in cents
                },
                quantity: 1,
            }], 
            mode: 'payment', 
            success_url: `http://${!isDev() ? siteName?.replace(/\s/g, '').replace(/\'/g, '') + '.com' : 'localhost:3000'}/Checkout/success`, 
            cancel_url: `http://${!isDev() ? siteName?.replace(/\s/g, '').replace(/\'/g, '') + '.com' : 'localhost:3000'}/Checkout/canceled`, 
            metadata: { 
                customerID: customerID, 
                customerName: name, 
                customerEmail: email, 
                customerPhone: phone, 
                serviceName: serviceName, 
                servicePrice: servicePrice, 
                serviceTime: serviceTime, 
                type: 'checkout' 
            }, 
        });
    
        return NextResponse.json(session.url);
    } catch (error) {
        // Comprehensive error logging
        console.error('Error in Checkout route:', error);

        // Return a more informative error response
        return NextResponse.json(
            { 
                error: 'Failed to create checkout session', 
                details: error.message 
            }, 
            { status: 500 }
        );
    }
}
