import React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { Image } from '@nextui-org/react'
import { LucideMonitorDot, TimerIcon } from 'lucide-react'
import {getRand} from '@/app/myCodes/Util'

const CarouselWithView = ({ options, slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  return (
    <section className="mt-10 h-52 overflow-hidden w-full p-2">
      <h1 className='text-2xl  font-font text-[color:var(--TextColorM)]'>{slides?.name?.toUpperCase()}</h1>
      <div className="" ref={emblaRef}>
        <div className="flex  items-start gap-4">
          {(slides?.images || []).map((item,index) => (
            <div className=" flex-shrink-0 relative center w-72 h-40" key={index}>
            
              <Image className='w-72  h-40 m-auto object-cover' src={item} alt='as'/>
          
           
          
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CarouselWithView