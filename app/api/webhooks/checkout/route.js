import { FetchTheseDocs, addToDatabase, addToDoc } from "@/app/myCodes/Database";
import { format } from "date-fns";
import { serverTimestamp } from "firebase/firestore";
import Cors from "micro-cors";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { OrderConfirmationMail } from "../../../myCodes/Email";

const stripe = require("stripe")(process.env.STRIPE_PRIVATE);

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const secret = process.env.STRIPE_WEBHOOK_KEY

export async function POST(request) {
  console.log('webhook working')
  try {
    const body = await request.text();
    const signature = headers().get("stripe-signature");
    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.type === "checkout.session.completed") {
      console.log(event.data.object.metadata)
      const data = JSON.parse(event.data.object.metadata)
      const { appointmentDate, appointmentTime, service, addons, customerName, customerEmail, customerPhone } = data
      //OrderConfirmationMail()
      console.log(appointmentDate, appointmentTime, service, addons, customerName, customerEmail, customerPhone)



      const appointment = {


        dateServer: serverTimestamp(),
        dateReal: new Date().toLocaleString()
      }


      const ORDERID = 0
      await addToDoc('Orders', ORDERID, 'order')

      const ORDERS = await FetchTheseDocs('Orders', 'id', '==', ORDERID, 'id') //Object.values(JSON.parse(fullCart))

      if (ORDERS[0]?.id == ORDERID) {

        await updateDatabaseItem('Admin', 'Orders', 'orderID', orderID + 1)
      }

      await addToDatabase('User', 'uid', 'currentOrder', ORDERID)
    }


    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
}
