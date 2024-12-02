import { Button, Checkbox, Image } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

const BookingOptions = () => {
    const [selectedCategory, setSelectedCategory] = useState('false')
    const [options, setOptions] = useState({})

    useEffect(() => {
        const getData = async () => {
            let FIREBS_PRODUCTS

            await useFetchDocsPresist('Services', 'active', '!=', false, 'created', (data) => {
                FIREBS_PRODUCTS = data.map(i => {
                    const miliseconds = i.created.seconds * 1000 + i.created.nanoseconds / 1000000
                    return ({ ...i, created: miliseconds })
                })
                console.log(FIREBS_PRODUCTS)
                setOptions([...FIREBS_PRODUCTS])
            })
        }

        getData()
    }, [window])

    const Options = [
        {
            Name: 'Lashes',
            desc: 'Get your lashes done',
            price: 140,
            category: 'lashes',
            time: 60,
            images: [
                'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://plus.unsplash.com/premium_photo-1661502931069-1d0078d82f4d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ]
        },

        {
            Name: 'Brows',
            desc: 'Get your lashes done',
            price: 140,
            category: 'brows',
            time: 30,
            images: [
                'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://plus.unsplash.com/premium_photo-1661502931069-1d0078d82f4d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ]
        }
    ]
    return (
        <div>

            {/* Brows or lashes */}
            <div className='center gap-2 mt-8  h-32 my-2'>
                {['Brows', 'Lashes'].map((item, index) => {
                    return (<Button key={index} onPress={() => { setSelectedCategory(item) }} radius='none' className={`p-0 trans  relative text-3xl bg-yellow-600 text-white font-semibold  ${selectedCategory == item ? 'w-[60%] h-full' : selectedCategory == false ? 'w-1/2 h-full' : 'w-[40%] h-24'}`}>
                        <h1 className='absolute z-20 '>
                            {item}
                        </h1>
                        <Image className='w-full object-cover' src={item == 'Lashes' ? 'https://stacylash.com/cdn/shop/articles/The_Ultimate_Guide_to_Mega_Volume_Lashes_720x.jpg?v=1706891084' : 'https://microbeautybar.com/cdn/shop/files/OmbreBrow2_750x.jpg?v=1712873330'} />
                    </Button>
                    )
                })}
            </div>

            {/* Options */}
            <div className='md:w-2/3 w-full m-auto grid grid-cols-1 p-6 md:grid-cols-4 my-8 '>
                {options.map((item, index) => {

                    if (item.metadata.category == selectedCategory?.toLowerCase())
                        return (
                            <div key={index} className='h-24 w-full text-white  center gap-4 p-2'>
                                <div className=' w-full h-3/4 m-auto'>
                                    <h1 className='text-3xl text-yellow-600 font-bold'>{item.Name}</h1>
                                    <div className='text-gray-400 font-semibold'>{item.price} -  {(item.time)} Minutes</div>
                                </div>
                                <Checkbox radius='none' size='lg' className='rounded-none h-24 w-24' />

                            </div>
                        )
                })}

            </div>
        </div>
    )
}

export default BookingOptions