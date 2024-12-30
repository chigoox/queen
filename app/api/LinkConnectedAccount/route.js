import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function POST(request) {
  try {
    const { userName } = await request.json();

    const accountLink = await stripe.accountLinks.create({
      account,
      return_url: `${request.headers.get('origin')}/${userName}/Admin`,
      refresh_url: `${request.headers.get('origin')}/${userName}/Admin`,
      type: 'account_onboarding',
    });

    return NextResponse.json(accountLink);
  } catch (error) {
    console.error(
      'An error occurred when calling the Stripe API to create an account link:',
      error
    );
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
