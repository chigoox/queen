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
        <div>
            <Navbar shouldHideOnScroll>
                <NavbarBrand className='flex-col'>
                    <Link href='/' className="center-col text-black">
                        <div className='flex gap-2'>
                            <FaBabyCarriage />
                            <p className="font-bold text-inherit">Nannies by chloe</p>
                        </div>
                        <div className='text-xs flex items-center font-bold'>
                            <h1>(646) 749-1688</h1>
                            <GoDotFill />
                            <h1>(973) 816-3073</h1>
                        </div>
                    </Link>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link color="foreground" href="/">
                            Home
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link href="/AboutUs" aria-current="page">
                            About
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="/ContactUs">
                            Contact Us
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">

                    <NavbarItem>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button as={Link} color="primary" href="#" variant="flat">
                                    Sign Up
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="new">
                                    <Link href='/FindMyNanny'>Find A Nanny</Link>
                                </DropdownItem>
                                <DropdownItem key="copy">
                                    <Link href='/FindMyFamily'>Find A Family</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            < Modal isOpen={showMenu} backdrop={'transprent'} onOpenChange={() => { setShowMenu(false) }
            } placement='auto' scrollBehavior='inside' className={`h-auto  text-white w-auto overflow-x-hidden md:px-20 lg:px-40 xl:px-32 py-4 bg-[#ffcfa7]   ${{
                backdrop: "bg-black bg-opacity-100"
            }}`}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="center-col gap-1   md:scroll-px-20 ">
                                <Link href='/' className='text-white'>
                                    Chloe's Nanny Services
                                </Link>
                            </ModalHeader>
                            <ModalBody className='hidescroll  overflow-hidden    p-2'>
                                <ResponsiveMasonry
                                    className={'w-full  overflow-hidden'}
                                    columnsCountBreakPoints={{ 300: 2, 500: 2, 700: 2, }}
                                >
                                    <Masonry gutter="10px">
                                        <div className=' m-auto fadeInZoom'>
                                            <Button className='h-40 w-20 p-0 shadow' onPress={() => { setShowMenu(false); push(`/${menuItem[0].replace(/\s/g, "")}`) }}>
                                                <Image className='w-full h-40 object-cover' src='https://images.unsplash.com/photo-1475178278683-8c225ae5ec3e?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='' />
                                            </Button>
                                            <p className='font-light text-sm text-center text-black'>{menuItem[0]}</p>
                                        </div>
                                        <div className=' m-auto fadeInZoom'>
                                            <Button className='h-20 w-20 p-0 shadow m-auto' onPress={() => { setShowMenu(false); push(`/${menuItem[1].replace(/\s/g, "")}`) }}>
                                                <Image className='w-20 h-20  object-cover' src='https://plus.unsplash.com/premium_photo-1689620817504-2f77cbddf142?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='' />

                                            </Button>
                                            <p className='font-light text-sm text-center text-black'>{menuItem[1]}</p>

                                        </div>
                                        <div className=' m-auto fadeInZoom'>
                                            <Button onPress={() => { setShowMenu(false); push(`/${menuItem[2].replace(/\s/g, "")}`) }} className='h-20 w-20 p-0 m-auto shadow'>
                                                <Image className='w-20 h-20  object-cover' src='https://www.kindercare.com/-/media/kindercare/images/personalization/kclchomepagepersonalizationimagehs.jpg?h=800&w=1200&la=en&hash=AD1E88ADE8FD9DD27945CC7E372A0FAF' alt='' />

                                            </Button>
                                            <p className='font-light text-sm text-center text-black'>{menuItem[2]}</p>

                                        </div>
                                        <div className=' m-auto fadeInZoom'>
                                            <Button className='h-40 w-20 p-0 shadow  m-auto ' onPress={() => { setShowMenu(false); push(`/${menuItem[3].replace(/\s/g, "")}`) }}>
                                                <Image className='w-full h-40 object-cover' src='https://plus.unsplash.com/premium_photo-1661281211518-7bc99840fe64?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='' />

                                            </Button>
                                            <p className='font-light text-sm text-center text-black'>{menuItem[3]}</p>

                                        </div>
                                    </Masonry>
                                </ResponsiveMasonry>

                            </ModalBody>
                            <ModalFooter>
                                <Button className='w-full' onPress={() => { setShowMenu(false) }} color="danger" variant="light">
                                    Close
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
            <Button onPress={() => { setShowMenu(true) }} className='h-20 w-16 rounded-t-full min-w-0 bg-[#f26d5c] p-0 fixed bottom-1 right-[40%] z-50'>
                <LuMenuSquare size={32} />
            </Button>
        </div>
    )
}

export default NavBar
