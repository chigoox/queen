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
    return (
        <div className='w-full z-50 h-24 bg-yellow-500 fixed bottom-0 left-0 center'>
            <div className='w-1/3'>{bookingInfo?.customer?.name}</div>
            <DotIcon />
            <div className='w1/3'>{bookingInfo?.service?.name}</div>
            <DotIcon />
            <div className='center gap-1 w-1/3'>
                {Object.values(bookingInfo?.addons || {}).map(()=>(<div className='h-5 w-5 rounded-full bg-black'></div>))}
                </div>
        </div>
    )
}

export default NavBar
