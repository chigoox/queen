import Stripe from "stripe";
import { NextResponse } from "next/server";

export const revalidate = 60

export async function POST(request) {
  let data = await request.json();
  const { email, name, phone } = data
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  console.log(email)
  const customers = await stripe.customers.search( query: `name:"${name}" AND email:"${email}" AND phone:"${phone}"`);
  return NextResponse.json(customers.data.reverse())
}




