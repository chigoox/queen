import { siteName } from "@/app/META"; 
import { isDev } from "@/app/myCodes/Util"; 
import { NextResponse } from "next/server"; 
import Stripe from "stripe"; 

// Add a global log function that always logs
function safeLog(...args) {
    try {
        console.log(...args);
        // Alternatively, you can use process.stdout.write for more reliable logging
        process.stdout.write(JSON.stringify(args) + '\n');
    } catch (error) {
        // Fallback logging
        console.error('Logging failed', error);
    }
}

export async function POST(request) { 
    // Log immediately when the route is entered
    safeLog('Checkout route entered');

    try {
        // Log request method and headers
        safeLog('Request method:', request.method);
        safeLog('Request headers:', Object.fromEntries(request.headers));

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 
        
        // Attempt to parse JSON, with explicit error handling
        let data;
        try {
            data = await request.json();
        } catch (parseError) {
            safeLog('JSON parsing error:', parseError);
            return NextResponse.json(
                { error: 'Invalid JSON', details: parseError.message }, 
                { status: 400 }
            );
        }

        // Log parsed data
        safeLog('Parsed data:', JSON.stringify(data, null, 2));

        // Defensive destructuring with default empty objects
        const { 
            customer = {}, 
            service = {}, 
            addons = [], 
            name = '', 
            phone = '', 
            email = '' 
        } = data;

        // Additional logging
        safeLog('Customer:', JSON.stringify(customer));
        safeLog('Service:', JSON.stringify(service));

        // Additional null checks
        const serviceName = service?.name || 'Unnamed Service';
        const servicePrice = service?.price || 0;
        const serviceTime = service?.time || '';
        const customerID = customer?.ID || null;

        // More logging
        safeLog('Service Name:', serviceName);
        safeLog('Service Price:', servicePrice);

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
    
        // Log successful session creation
        safeLog('Checkout session created:', session.id);

        return NextResponse.json(session.url);
    } catch (error) {
        // Comprehensive error logging
        safeLog('Error in Checkout route:', error);
        safeLog('Error name:', error.name);
        safeLog('Error message:', error.message);
        safeLog('Error stack:', error.stack);

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
