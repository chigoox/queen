import { useFetchDocsPresist } from '@/UTIL/Database'
import { Button, Checkbox, Image } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

const BookingOptions = (categories,{ options, setBookingInfo, bookingInfo }) => {
    const [selectedCategory, setSelectedCategory] = useState('false')

    // == 'Lashes' ? 'https://stacylash.com/cdn/shop/articles/The_Ultimate_Guide_to_Mega_Volume_Lashes_720x.jpg?v=1706891084' : 'https://microbeautybar.com/cdn/shop/files/OmbreBrow2_750x.jpg?v=1712873330'} />

    return (
        <div>

            {/* Brows or lashes */}
            <div className='center gap-2 mt-8  h-32 my-2'>
                {(categories || []).map((item, index) => {
                    return (<Button key={index} onPress={() => { setSelectedCategory(item) }} radius='none' className={`p-0 trans  relative text-3xl bg-yellow-600 text-white font-semibold  ${selectedCategory == item ? 'w-[60%] h-full' : selectedCategory == false ? 'w-1/2 h-full' : 'w-[40%] h-24'}`}>
                        <h1 className='absolute z-20 '>
                            {item?.name}
                        </h1>
                        <Image className='w-full object-cover' alt='categoryImage' src={item?.Image}/> 
                    </Button>
                    )
                })}
            </div>

            {/* Options */}
            <div className='md:w-2/3 w-full m-auto grid grid-cols-1 p-6 md:grid-cols-4 my-8 '>
                {options.map((item, index) => {

                    if (item.metadata.category?.toLowerCase() == selectedCategory?.toLowerCase())
                        return (
                            <div key={index} className='h-24 w-full text-white  center gap-4 p-2'>
                                <div className=' w-full h-3/4 m-auto'>
                                    <h1 className='text-3xl text-[color:var(--AccentColor)] font-bold'>{item.name}</h1>
                                    <div className='text-[color:var(--TextMColor)] font-semibold'>${item.metadata.price} -  {(item.metadata.time)} Minutes</div>
                                </div>
                                <Checkbox isSelected={bookingInfo.service} onValueChange={(v) => { setBookingInfo((old) => { return ({ ...old, service: { name: item.name, price: item.metadata.price, time: item.metadata.time } })}) }} radius='none' size='lg' className='rounded-none h-24 w-24' />

                            </div>
                        )
                })}

            </div>
        </div>
    )
}

export default BookingOptions
