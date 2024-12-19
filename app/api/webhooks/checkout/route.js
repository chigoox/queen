import { FetchTheseDocs, addToDatabase, addToDoc } from "@/app/myCodes/Database";
import { format } from "date-fns";
import { serverTimestamp } from "firebase/firestore";
import Cors from "micro-cors";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { OrderConfirmationMail } from "../../../myCodes/Email";
import { fetchDocument } from "../../../myCodes/Database";

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
     
      const data = event.data.object.metadata
      const { apointmentDate, apointmentTime, service, addons, customerName, customerEmail, customerPhone } = data
      
      
      let apointments = await FetchTheseDocs('Apointment', 'dateCreatedServerTime','==', true)
      const apointmentID = apointments?.length || 0
      console.log(apointments, apointmentID)
      
      const appointment = {
        id: apointmentID,
        apointmentDate: apointmentDate,
        apointmentTime: apointmentTime,
        service: service,
        addons: addons,
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone,
        dateCreatedServerTime: serverTimestamp(),
        dateCreatedRealTime: new Date().toLocaleString()
      }


      console.log( appointment)
      await addToDoc('Apointment', apointmentID, appointment,) 

      const cusomterInfo = {name:customerName, email:customerEmail, phone:customerPhone}
      await OrderConfirmationMail(cusomterInfo, service, addons, apointmentTime, apointmentDate)
    }

    console.log(apointments, apointmentID, appointment)

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
