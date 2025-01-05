import React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { Image } from '@nextui-org/react'
import { LucideMonitorDot, TimerIcon } from 'lucide-react'
import {getRand} from '@/app/myCodes/Util'

const CarouselWithView = ({ options, slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

console.log(slides)
  return (
    <section className="mt-20 h-52  w-full p-2">
      <h1 className='text-4xl my-4 text-center text-[color:var(--TextColorM)]'>{slides?.name}</h1>
      <div className="" ref={emblaRef}>
        <div className="flex  items-start gap-10">
          {slides?.images.map((item,index) => (
            <div className=" flex-shrink-0 relative center w-full h-40" key={index}>
            
              <Image className='w-full  h-40 m-auto object-cover' src={item} alt='as'/>
          
           
          
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CarouselWithView