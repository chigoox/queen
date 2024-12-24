import { Card } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { menu } from '../Menu/AdminMenu'
import { AdminHome } from './AdminHome'
import { AdminOrders } from './AdminOrders'
import { AdminProduct } from './AdminProduct'
import WebsiteEditor from './WebsiteEditor'

const AdminBody = ({ selectedMenu, owner, ownerData }) => {
const [WebsiteEditorData, setWebsiteEditorData] = useState({})



console.log(ownerData, owner)


    return (
        <div className={`Body p-10 left-4 md:left-0 trans relative h-screen overflow-hidden border-green-700 border w-full bg-white`}>
            <h1 className="font-bold  sm:left-0 lg:left-0 md:left-2 relative font-2xl text-black">{selectedMenu}</h1>
            <Card className="w-full max-h-full h-auto p-4 mt-5  min-h-32">
                {selectedMenu == menu[0] && <AdminHome />}
                {selectedMenu == menu[1].name && <AdminOrders />}
                {selectedMenu == menu[1].menus[0] && <AdminHome />}
                {selectedMenu == menu[1].menus[1] && <AdminHome />}
                {selectedMenu == menu[2].name && <AdminProduct />}
                {selectedMenu == menu[2].menus[0] && <AdminHome />}
                {selectedMenu == menu[2].menus[1] && <AdminHome />}
                {selectedMenu == menu[2].menus[2] && <AdminHome />}
                {selectedMenu == menu[2].menus[3] && <AdminHome />}
                {selectedMenu == menu[3].name && <AdminHome />}
                {selectedMenu == menu[3].menus[0] && <AdminHome />}
                {selectedMenu == menu[4] && <WebsiteEditor SITEINFO={ownerData?.siteInfo} />}
                {selectedMenu == menu[5] && <AdminHome />}

            </Card>
        </div>
    )
}

export default AdminBody