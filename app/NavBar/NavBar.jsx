'use client'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { DotIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaBabyCarriage } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { LuMenuSquare } from "react-icons/lu";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
function NavBar({bookingInfo}) {
    console.log(bookingInfo)
    const [showMenu, setShowMenu] = useState(false)
    const menuItem = ['About Us', 'Contact Us', 'Find My Nanny', 'Find My Family']
    const { push } = useRouter()
    const price = bookingInfo?.service ? '$' + bookingInfo?.service?.price : ''
    const time = bookingInfo?.service ? bookingInfo?.service?.price + 'mins' : ''
    return (
        <div className='w-full p-2 z-50 h-24 bg-yellow-500 fixed bottom-0 left-0 center'>
            <div className='w-1/3'>
                <div className=''>{bookingInfo?.customer?.name}</div>
                <div className='text-xs font-bold'>{bookingInfo?.apointment}</div>
            </div>
            <DotIcon />
            <div className='w-[40%] text-center center-col'>
                <p className='font-bold'>{bookingInfo?.service?.name}</p>
                <p>{price}</p>
                <p>{time}</p>
            </div>
            <DotIcon />
            <div className='grid items-center justify-center grid-cols-3 gap-1 w-[20%]'>
                {Object.values(bookingInfo?.addons || {}).map((item)=>{return item.name ? (<div className='text-white rounded-lg center text-xs bg-black w-3 h-3 p-2'>{item.name.charAt(0)}</div>) : null})}
            </div>
        </div>
    )
}

export default NavBar
