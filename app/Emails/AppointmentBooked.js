import React from 'react';
import { Button, Html } from "@react-email/components";

export const AppointmentBooked = ({ cusomterInfo,  service,  addons,apointmentTime, apointmentDate }) => {

  return(
    <Html>
      <Button
        href="https://example.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me
      </Button>
    </Html>
  )
}
