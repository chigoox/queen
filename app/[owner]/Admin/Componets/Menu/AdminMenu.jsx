import React, { useEffect, useState } from 'react'
import AdminMenuItem from './AdminMenuItem'
import { Button } from '@nextui-org/react'
import { EyeIcon, LogOutIcon, Menu } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { AUTH } from '@/Firebase'
import { useRouter } from 'next/navigation'
import useIsMobile from '../../../../Hooks/useIsMobile'

export const menu = ['Home', { name: 'Booking', menus: [] }, { name: 'Services', menus: [] }, { name: 'Customers', menus: [] }, 'WebsiteEditor', 'Discount','Settings']
export const AdminMenu = ({ setSelectedMenu, selectedMenu, ownerData }) => {
    const onMobile = useIsMobile()
    const [showMenu, setShowMenu] = useState(onMobile)
    const [initMenu, setInitMenu] = useState(false)
    useEffect(() => {
        setTimeout(() => {

            if (!initMenu) {
                setShowMenu(!onMobile)
                setInitMenu(true)
            }

        }, 1000)
    }, [onMobile])
    const {push} = useRouter()
    return (
        <div className={`Navigator ${showMenu ? 'w-[22rem] lg:w-64' : 'w-11 overflow-hidden'}  z-10 px-2  lg:relative absolute trans top-0 left-0 border-r bg-white h-screen`}>
           <br className='mb-8'/>
            {menu.map((item) => {
                return (
                    <AdminMenuItem key={item.name} setShowMenu={setShowMenu}  onMobile={onMobile} showMenu={showMenu} setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} menuItem={item} />
                )
            })}
            
            <Button onPress={() => { setShowMenu(!showMenu); }} className={` text-gray-600 font-semibold hover:bg-gray-200 bg-white ${showMenu ? 'p-4' : 'p-1'} w-full   flex justify-start  mt-2 h-7  group rounded-xl`}>
                <Menu />
                {!showMenu ? 'Open' : 'Close'}
            </Button>

            <Button onPress={async () => {  push(`/${ownerData?.userName}/Booking`) }} className={` text-gray-600 font-semibold hover:bg-gray-200 bg-white relative top-20 ${showMenu ? 'p-4' : 'p-1'} w-full   flex justify-start  mt-2 h-7  group rounded-xl`}>
                <EyeIcon className=' flex-shrink-0' size={24}  scale={24} />
                Website
            </Button>
            <Button onPress={async () => { await signOut(AUTH); push('/') }} className={` text-gray-600 font-semibold hover:bg-gray-200 bg-white relative top-20 ${showMenu ? 'p-4' : 'p-1'} w-full   flex justify-start  mt-2 h-7  group rounded-xl`}>
                <LogOutIcon className=' flex-shrink-0' scale={24}    />
                Logout
            </Button>
        </div>
    )
}
