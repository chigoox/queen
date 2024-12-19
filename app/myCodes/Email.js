import axios from "axios"




export const OrderConfirmationMail = async (cusomterInfo, service, addons, apointmentTime, apointmentDate) => {
   
    const { data } = await axios.post('https://crownedbl.vercel.app/api/Emails/bookingConfirmed', {
      cusomterInfo: cusomterInfo,
      service: service,
      addons: addons,
       apointmentTime:apointmentTime,
       apointmentDate:apointmentDate,
     
    },
      {
        headers: {
          "Content-Type": "application/json",
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      })
    
    return (data)
  }
