import React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { Image } from '@nextui-org/react'
import { LucideMonitorDot, TimerIcon } from 'lucide-react'
import {getRand} from '@/app/myCodes/Util'

const Carousel = (props) => {
  const {  options, slides } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])
  
  return (
    <section className="mt-20 h-52  w-[100vh] p-2">
      <div className="" ref={emblaRef}>
        <div className="flex  gap-10">
          {slides.map((item,index) => (
            <div className=" flex-shrink-0 relative center w-72 h-40" key={index}>
              <Image className='w-96  h-40 m-auto object-cover' src={item.image} alt='as'/>
            <div className='absolute top-2 left-2 z-10 center'>
              {getRand(12) + 1}:{getRand(60)} { getRand(24) >= 12 ?'am':'pm'}
              <TimerIcon />

            </div>
            <div className='absolute top-2 right-2 z-10 center'>
              {item?.bookType}
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Carousel