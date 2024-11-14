'use client'
import Logo from '@/app/General/Logo';
import BookingInfo from '@/app/HomePage/BookingInfo';
import { Button } from '@nextui-org/react';

export default function Home() {
  //const [showMenu, setShowMenu] = useState(false)

  return (
    <div className=" border-yellow-400 border  min-h-screen bg-black w-screen overflow-hidden pb-10  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col  p-2">
        <div className=' w-full h-96'>
          <div className='center-col '>
            <Logo />
          </div>
          <div className='mt-4 center-col'>
            <h1 className='text-yellow-500 text-4xl font-bold text-center'>Crowned</h1>
            <p className='text-white text-xl'>Brows & Lashes</p>
          </div>
        </div>

        <div>
          <p className='text-white text-center mt-8'>
            Welcome to Crowned Brows & Lashes! Please read the following terms and conditions before booking.

          </p>
          <BookingInfo />
        </div>

        <Button className='bg-yellow-500 text-black font-bold'>Agree & Book</Button>

      </main>

    </div>
  );
}
