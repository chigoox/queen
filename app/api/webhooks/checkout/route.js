import { FetchTheseDocs, addToDatabase } from "@/app/myCodes/Database";
import { FetchTheseDocs, addToDatabase } from "@/app/myCodes/Database";
import { format } from "date-fns";
import { serverTimestamp } from "firebase/firestore";
import Cors from "micro-cors";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { OrderConfirmationMail } from "../../../myCodes/Email";
import { addToDoc, fetchDocument } from "../../../myCodes/Database";
import { db } from "@/firebaseAdmin";

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
      const { OwnerUserName, apointmentDate, apointmentTime, service, addons, customerName, customerEmail, customerPhone, ownerID } = data


      let apointments = await FetchTheseDocs('Apointment', 'dateCreatedServerTime', '==', true)
      const apointmentID = (apointments?.length || 0) + 1

      const apointment = {
        ownerID:ownerID,
        OwnerUserName:OwnerUserName,
        apointmentID: apointmentID,
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
//

      await addToDoc('Apointment', apointmentID, apointment)
      const ref = db.collection('Apointment').doc(apointmentID);
      const res = await ref.set(apointment, { merge: true });

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
