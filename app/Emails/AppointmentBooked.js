import React from 'react';
import { Button, Html } from "@react-email/components";

export const AppointmentBooked = ({ cusomterInfo,  service,  addons,apointmentTime, apointmentDate }) => {
  console.log( cusomterInfo,  service,  addons,apointmentTime, apointmentDate)
  const totalPrice = service?.reduce((sum, service) => sum + service.price, 0) || 0 
  return(
    <Html>
      <Body style={main}>
        <Container style={container}>
          <Text style={paragraph}>Hi {cusomterInfo?.customerName},</Text>
          <Text style={paragraph}>
            Your appointment has been confirmed. Here are the details:
          </Text>
          <Text style={paragraph}><strong>Appointment Time:</strong> {apointmentTime} {apointmentDate}</Text>
          <Text style={paragraph}><strong>Services:</strong></Text>
          <ul style={listStyle}>
          {service.name} - ${service.price.toFixed(2)}
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
