import React from 'react';
import { Body, Button, Container, Html, Text } from "@react-email/components";

export const AppointmentBooked = ({ cusomterInfo,  service,  addons,apointmentTime, apointmentDate }) => {
  
  
  const SERVICE = JSON.parse(service)
  let ADDONS = JSON.parse(addons)
  ADDONS = Object.values(ADDONS)
  let totalPrice = ADDONS?.reduce((sum, addon) => Number(sum) + Number(addon.price), 0) || 0 
  totalPrice +=  Number(SERVICE.price)
  let totalTime = ADDONS?.reduce((sum, addon) => Number(sum) + Number(addon.time), 0) || 0 
  totalTime += Number(SERVICE.time)

  console.log(totalTime, totalPrice)

  return(
    <Html>
      <Body style={main}>
        <Container style={container}>
          <Text style={paragraph}>Hi {cusomterInfo?.name},</Text>
          <Text style={paragraph}>
            Your appointment has been confirmed. Here are the details:
          </Text>
          <Text style={paragraph}><strong>Appointment:</strong>{apointmentDate}</Text>
          <Text style={paragraph}><strong>Services:</strong>{{SERVICE.name} - ${SERVICE.price.toFixed(2)} - Time: {SERVICE.time}</Text>

         
              <ul style={listStyle}>
                {ADDONS.map((addon, index) => (
                  <li key={index} style={paragraph}>
                    {addon.name} - ${addon.price.toFixed(2)}
                  </li>
                 ))}
              </ul>
            
          
          <Text style={paragraph}><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</Text>
          <Text style={paragraph}><strong>Total Time:</strong> {totalTime} mins</Text>
          <Text style={paragraph}>
            Thank you for booking with us!
          </Text>
        </Container>
      </Body>
    </Html>
  )
}


const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const listStyle = {
  paddingLeft: "20px",
  margin: "10px 0",
};
