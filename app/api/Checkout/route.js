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

       
        // Log successful session creation
        safeLog('Checkout session created:', '');

        return NextResponse.json('');
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
