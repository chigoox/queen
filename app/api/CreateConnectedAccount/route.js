import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function POST() {
  try {
    const account = await stripe.accounts.create({});
    return NextResponse.json({ account: account.id });
  } catch (error) {
    console.error(
      'An error occurred when calling the Stripe API to create an account',
      error
    );
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}