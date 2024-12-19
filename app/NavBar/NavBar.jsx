'use client'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaBabyCarriage } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { LuMenuSquare } from "react-icons/lu";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
function NavBar() {
    const [showMenu, setShowMenu] = useState(false)
    const menuItem = ['About Us', 'Contact Us', 'Find My Nanny', 'Find My Family']
    const { push } = useRouter()
    return (
        <div className='w-full h-40 bg-yellow-500'>
            
        </div>
    )
}

export default NavBar
