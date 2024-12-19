import { AppointmentBooked} from '@/app/Emails/AppointmentBooked';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {

  let data = await request.json();
  console.log(data)
    let { 
        cusomterInfo, 
        service, 
        addons, 
        apointmentTime = '', 
        apointmentDate = '', 
    } = data;
  
  try {
    const { data, error } =await resend.emails.send({
  from: 'Acme <onboarding@resend.dev>',
  to: ['dikeemmanuel54@gmail.com'],
  subject: 'hello world',
   react: AppointmentBooked({cusomterInfo, 
        service,  addons,apointmentTime, apointmentDate });

    if (error) {
      console.log("error")
      return Response.json({ error }, { status: 500 });
    }
console.log('retunred')
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
