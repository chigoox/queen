'use client'
// pages/index.js
import Head from 'next/head';
import { Button, Card, Input, Spacer } from '@nextui-org/react';
import { motion } from 'motion/react';
import Carousel from '@/app/General/Embla/Carousel'
import { BookType, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation'
import OwnerSearch from '@/app/General/OwnerSearch';



export default function Home() {
  const features = ['Client self-scheduling',
    'Unlimited services and appointments',
    'Payments processing and deposits through Stripe',
    'Confirmation, reminder, and follow-up emails'
    ]
  const siteName = 'BooX'

  const {push} = useRouter()
  const [showSearch, setShowSearch] = useState(false)
  const toggleSearch = () => {setShowSearch(!showSearch)}

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.pricing-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen  overflow-hidden bg-gray-100 ">
      <Head>
        <title>{siteName}</title>
        <meta name="description" content="Schedule your appointments seamlessly" />
      </Head>

      {/* Header Section */}

      <header className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md">
        <div className="container mx-auto  py-4 px-6 flex justify-between items-center text-white">
          <h1 className="text-3xl font-bold">{siteName}</h1>
          <nav>
            <Button onPress={()=>{push('/Login')}} auto ghost size="sm" color="white">
              Login
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-cover bg-center h-[90vh] object-cover flex flex-col items-center justify-center text-center text-white"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1545185043-78ab5b7e0af2?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', backgroundSize: 'cover' }}
        cl
      >
        <div className="lg:bg-black bg-opacity-50 p-10 rounded-lg">
          <h2 className="text-5xl font-bold mb-4">Seamless Scheduling Made Easy</h2>
          <p className="text-xl mb-6">
            Manage your appointments effortlessly with our intuitive booking platform.
          </p>
          <Button onPress={()=>{push('/Signup')}} auto shadow color="gradient" className="px-8 bg-black">
            Get Started
          </Button>
          <Button onPress={toggleSearch} auto shadow color="gradient" className="px-8 underline">
            Book Now with
          </Button>
        </div>
      <Carousel slides={[
        {bookType:'Consultant',
           image:'https://images.unsplash.com/file-1722962830841-dea897b5811bimage?w=416&dpr=2&auto=format&fit=crop&q=60'
          },
          {bookType:'lash',
            image:'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
           },
           {bookType:'Mechanic',
            image:'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
           },
           {bookType:'Gym',
            image:'https://images.unsplash.com/photo-1550259979-ed79b48d2a30?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
           },
           {bookType:'Makeup-Artist',
            image:'https://images.unsplash.com/photo-1657563920440-0ac6d8932f20?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
           },
           {bookType:'Lawn Care',
            image:'https://images.unsplash.com/photo-1731082686849-d2e0a4d2c70c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
           },

        ]} />
      </motion.section>

      

      {/* Main Content Section */}
      <main className="flex-grow  container mx-auto py-10 px-6">
      {showSearch && <OwnerSearch toggleSearch={()=>{setShowSearch(!showSearch)}} />}
{/* Information Section */}
<section className="mb-10 grid gap-4 md:grid-cols-2 lg:p-52 md:p-20" >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r m-auto col-span-2 flex flex-col lg:flex-row justify-between lg:items-center from-gray-200 to-gray-100 rounded-lg shadow-lg p-8 text-center"
          >
           <div className='lg:w-1/2'>
           <h3 className="text-3xl font-bold text-gray-800 mb-4 text-left">Automated Booking Software Built to Save You Time</h3>
            <p className="text-gray-700 mb-4 text-left">
              Get a branded scheduling page that showcases your services and real-time availability. With easy payment and intake forms, your scheduler is everything your clients need to self-schedule appointments.
            </p>
           </div>
            <img src={"https://plus.unsplash.com/premium_photo-1663076518116-0f0637626edf?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Automated Booking" className="lg:w-64 w-full lg:h-64 object-cover rounded-xl overflow-hidden" />
          </motion.div>
         
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r m-auto from-gray-200 col-span-2 lg:col-span-1 to-gray-100 rounded-lg shadow-lg  text-center"
          >
            <div className='w-3/4 p-4 m-auto'>
            <h3 className="text-3xl lg:text-left font-bold text-gray-800 mb-4">Control your availability with online appointments</h3>
            <p className="text-gray-700 lg:text-left mb-4">
            Tools to help you schedule and earn on your own terms–customize exactly how and when clients can book with you, host virtual appointments or classes, and block off personal time. Grow your business with scheduling automation.
            </p>
            </div>
            <img src={"https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Automated Booking" className="w-full h-60 object-cover rounded-md" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r m-auto  from-gray-200 col-span-2 lg:col-span-1 to-gray-100 rounded-lg shadow-lg p-8 text-center"
          >
           <div className='w-3/4 text-center m-auto'>
           <h3 className="text-3xl  font-bold text-gray-800 mb-4">Nail the first impression (and the next)</h3>
            <p className="text-gray-700 mb-4 ">
            Deliver a personalized experience that keeps clients coming back with custom intake forms, email marketing engagements, and easy access to details from past appointments.
            </p>
           </div>
            <img src={"https://images.unsplash.com/photo-1562714529-94d65989df68?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Automated Booking" className="w-full h-60 object-cover rounded-md" />
          </motion.div>
        </section>

        {/* Features Section */}
        <section ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="pricing-card opacity-0 transform translate-y-8 transition-all duration-700 ease-out hover:scale-105">
            <div className="h-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={'https://images.unsplash.com/photo-1490902931801-d6f80ca94fe4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                  alt="Free Plan"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-50/90"></div>
              </div>
              
              <div className="bg-emerald-50 p-8">
                <h3 className="text-2xl font-bold text-emerald-600">Free</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">20%</span>
                  <span className="text-gray-600 ml-2">deposit fee</span>
                </div>
              </div>
              
              <div className="p-8">
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <Check size={20} className="text-emerald-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button onPress={()=>{push('/Signup')}} className="mt-8 w-full py-3 px-6 rounded-lg bg-emerald-50 text-emerald-600 font-semibold hover:bg-emerald-100 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Paid Plan */}
          <div className="pricing-card opacity-0 transform translate-y-8 transition-all duration-700 delay-200 ease-out hover:scale-105">
            <div className="h-full bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-500">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={'https://plus.unsplash.com/premium_photo-1679830513869-cd3648acb1db?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                  alt="Premium Plan"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/90"></div>
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm z-10">
                  Popular
                </div>
              </div>

              <div className="bg-blue-50 p-8">
                <h3 className="text-2xl font-bold text-blue-600">Premium</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$50</span>
                  <span className="text-gray-600 ml-2">one-time</span>
                </div>
              </div>
              
              <div className="p-8">
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <Check size={20} className="text-blue-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button onPress={()=>{push('/Signup')}} className="mt-8 w-full py-3 px-6 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors">
                  Get Premium
                </button>
              </div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="pricing-card opacity-0 transform translate-y-8 transition-all duration-700 delay-400 ease-out hover:scale-105">
            <div className="h-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={'https://plus.unsplash.com/premium_photo-1734407274561-7d8e477cc5a6?q=80&w=1962&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                  alt="Enterprise Plan"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-50/90"></div>
              </div>

              <div className="bg-purple-50 p-8">
                <h3 className="text-2xl font-bold text-purple-600">Enterprise</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">Custom</span>
                  <span className="text-gray-600 ml-2">pricing</span>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-gray-600 mb-8">
                  Get access to our latest features and priority support with regular updates.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-600">
                    <Check size={20} className="text-purple-500 mr-3" />
                    Priority Support
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check size={20} className="text-purple-500 mr-3" />
                    Custom Features
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check size={20} className="text-purple-500 mr-3" />
                    Early Access
                  </li>
                </ul>
                
                <button onPress={()=>{push('/ContactUs')}} className="mt-8 w-full py-3 px-6 rounded-lg bg-purple-50 text-purple-600 font-semibold hover:bg-purple-100 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>

        

     
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-900 py-6 text-white mt-12">
        <div className="container mx-auto text-center">
          <p className="mb-2 font-semibold">Follow us on:</p>
          <div className="flex justify-center gap-4 mb-4">
            <a href="#" className="hover:text-blue-400">Facebook</a>
            <a href="#" className="hover:text-blue-400">Twitter</a>
            <a href="#" className="hover:text-blue-400">Instagram</a>
          </div>
          &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}