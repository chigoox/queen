import React from 'react';
import { Button, Html } from "@react-email/components";

export const AppointmentBooked = ({ cusomterInfo,  service,  addons,apointmentTime, apointmentDate }) => {
  
  console.log( cusomterInfo, service,  addons,apointmentTime, apointmentDate)
  const SERVICE = JSON.parse(service)
  let ADDONS = JSON.parse(addons)
  ADDONS = Object.values(ADDONS)
  let totalPrice = ADDONS?.reduce((sum, addon) => sum + addon.price, 0) || 0 
  totalPrice += SERVICE.price

  console.log(SERVICE, ADDONS, totalPrice)

  return(
    <Html>
      <Body style={main}>
        <Container style={container}>
          <Text style={paragraph}>Hi {cusomterInfo?.name},</Text>
          <Text style={paragraph}>
            Your appointment has been confirmed. Here are the details:
          </Text>
          <Text style={paragraph}><strong>Appointment:</strong>{apointmentDate}</Text>
          <Text style={paragraph}><strong>Services:</strong></Text>
          <ul style={listStyle}>
          {SERVICE.name} - ${SERVICE.price.toFixed(2)} - Time: {SERVICE.time}
          </ul>
          <Text style={paragraph}><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</Text>
          <Text style={paragraph}>
            Thank you for booking with us!
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
