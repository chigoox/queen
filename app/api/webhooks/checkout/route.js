import { serverTimestamp } from "firebase/firestore";
import Cors from "micro-cors";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { addToDoc } from "../../../myCodes/Database";
import { OrderConfirmationMail } from "../../../myCodes/Email";

const stripe = require("stripe")(process.env.STRIPE_PRIVATE);

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const secret = process.env.STRIPE_WEBHOOK_KEY

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = headers().get("stripe-signature");
    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.type === "checkout.session.completed") {

      const data = event.data.object.metadata
      const {customerID ,OwnerUserName, apointmentDate, apointmentTime, service, addons, customerName, customerEmail, customerPhone, ownerID, apointmentID } = data


      

      const apointment = {
        ownerID:ownerID,
        apointmentID: apointmentID,
        apointmentDate: apointmentDate,
        apointmentTime: apointmentTime,
        service: JSON.parse(service),
        addons: JSON.parse(addons),
        customerID: customerID,
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone,
        dateCreatedServerTime: serverTimestamp(),
        dateCreatedRealTime: new Date().toLocaleString(),
        OwnerUserName: OwnerUserName,
      }
//
      console.log('Appointment Data:', apointment);
      await addToDoc('Apointment', apointmentID, apointment);

// Log Firestore response
console.log('Firestore Response:', res);


      const cusomterInfo = { name: customerName, email: customerEmail, phone: customerPhone }
      await OrderConfirmationMail(cusomterInfo, service, addons, apointmentTime, apointmentDate)
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
