import { AppointmentBooked} from '@/app/Emails/AppointmentBooked';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {

  let data = await request.json();
  console.log(data)
    let { 
       
         
        service = {}, 
        addons, 
        name = '', 
        phone = '', 
        email = '' 
    } = data;
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Crowned Brows & Lashes <onboarding@resend.dev>',
      to: [email],
      subject: toAdmin ?  'Booking Confirmed' : 'New Appointment Booked',
      react: AppointmentBooked({ name: name, phone: phone, addons:addons, service:service }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
