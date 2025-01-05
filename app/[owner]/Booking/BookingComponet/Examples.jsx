import React from 'react'
import CarouselWithView from "@/app/General/Embla/CarouselWithView";
function Examples({portfolio}) {
  return (
    <div className='py-2 rounded bg-[color:var(--BGColorL)]'>
      {(portfolio || []).map((item)=>{
        return(
          <CarouselWithView slides={item} />
        )
      })}
    </div>
  )
}

export default Examples