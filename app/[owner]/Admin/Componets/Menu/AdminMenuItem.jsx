import { Button } from "@nextui-org/react"
import { ArrowDownRightIcon, BookAIcon, CornerDownRight, DivideIcon, Edit2Icon, MoveDown, Settings, Tally1 } from "lucide-react"
import { useState } from "react"
import { AiFillHome, AiFillPicture, AiOutlineContainer, AiOutlineDollar, AiOutlineUser } from "react-icons/ai"
import { ImPriceTag } from "react-icons/im"

const AdminMenuItem = ({ showMenu, menuItem, setSelectedMenu, selectedMenu, setShowMenu, onMobile }) => {
    
    console.log(showMenu, onMobile)

    
    const mainMenuName = menuItem.name || menuItem
    const [mainMenuOpened, setMainMenuOpened] = useState(false)
    const menuIcon = {
        Home: <AiFillHome size={24} />,
        Booking: <AiOutlineContainer size={24} />,
        Services: <BookAIcon size={24} />,
        Customers: <AiOutlineUser size={24} />,
        WebsiteEditor: <Edit2Icon size={24} />,
        Discount: <AiOutlineDollar size={24} />,
        Settings: <Settings size={24}/>,

    }
    const SubMenu = ({ menuItem }) => {

        return (
            <Button onPress={() => {setSelectedMenu( menuItem); if (onMobile && showMenu) setShowMenu(false) }} className={`${selectedMenu == menuItem ? 'bg-red-600 text-white font-bold' : 'text-gray-600 font-semibold hover:bg-gray-200 bg-white'} } w-full ${showMenu ? 'p-4' : 'p-2'}   flex justify-start  mt-2 h-7  group rounded-xl`}>
                {selectedMenu == menuItem ? <CornerDownRight /> : <Tally1 />}
                {showMenu && menuItem}
            </Button>
        )
    }



    const checkSubMenu = () => {
        if (menuItem.menus && (selectedMenu == mainMenuName) && mainMenuOpened) {
            setMainMenuOpened(!mainMenuOpened)
        } else if (menuItem.menus && (selectedMenu != mainMenuName) && mainMenuOpened) {
            setMainMenuOpened(true)
        } else {
            setMainMenuOpened(!mainMenuOpened)

        }
        if ((selectedMenu != mainMenuName) && !mainMenuOpened) {
            setSelectedMenu(mainMenuName)

        } else if ((selectedMenu != mainMenuName) && mainMenuOpened) {
            setSelectedMenu(mainMenuName)

        }
    }

    return (

        <div>
            <Button onPress={()=>{checkSubMenu(); if (onMobile && showMenu) setShowMenu(false)}} className={`${selectedMenu == mainMenuName ? 'bg-red-600 text-white font-bold' : 'text-gray-600 font-semibold hover:bg-gray-200 bg-white'} } ${showMenu ? 'p-4' : 'p-1'} w-full   flex justify-start  mt-2 h-7  group rounded-xl`}>
                {menuIcon[mainMenuName]}
                {showMenu && mainMenuName}
            </Button>
            <div className={`trans overflow-hidden ${mainMenuOpened ? 'max-h-96' : 'max-h-0'} h-auto`}>
                {menuItem.menus?.map((item) => {
                    return (
                        <SubMenu menuItem={item} />
                    )
                })}
            </div>
        </div>
    )
}



export default AdminMenuItem