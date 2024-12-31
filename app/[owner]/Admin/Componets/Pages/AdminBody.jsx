import { Card } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { menu } from '../Menu/AdminMenu'
import { AdminHome } from './AdminHome'
import { AdminOrders } from './AdminOrders'
import { AdminProduct } from './AdminProduct'
import WebsiteEditor from './WebsiteEditor'
import AdminSettings from './AdminSettings'

const AdminBody = ({ selectedMenu, owner, ownerData }) => {
const [WebsiteEditorData, setWebsiteEditorData] = useState({})





    return (
        <div className={`Body md: py-10  px-7 left-4 md:left-0 trans relative h-screen overflow-hidden border-green-700 border w-full bg-white`}>
            <h1 className="font-bold  sm:left-0 lg:left-0 md:left-2 relative font-2xl text-black">{selectedMenu}</h1>
            <Card className="w-full max-h-full h-auto  p-1 mt-5  min-h-32">
                {selectedMenu == menu[0] && <AdminHome OWNER={ownerData} SITEINFO={ownerData?.siteInfo} />}
                {selectedMenu == menu[1].name && <AdminOrders />}
                {selectedMenu == menu[1].menus[0] && <div>Coming Soon</div>}
                {selectedMenu == menu[1].menus[1] && <AdminHome />}
                {selectedMenu == menu[2].name && <AdminProduct SITEINFO={ownerData?.siteInfo}   />}
                {selectedMenu == menu[2].menus[0] && <div>Coming Soon</div>}
                {selectedMenu == menu[2].menus[1] &&<div>Coming Soon</div>}
                {selectedMenu == menu[2].menus[2] && <div>Coming Soon</div>}
                {selectedMenu == menu[2].menus[3] && <div>Coming Soon</div>}
                {selectedMenu == menu[3].name && <div>Coming Soon</div>}
                {selectedMenu == menu[3].menus[0] && <div>Coming Soon</div>}
                {selectedMenu == menu[4] && <WebsiteEditor SITEINFO={ownerData?.siteInfo} />}
                {selectedMenu == menu[5] && <div>Coming Soon</div>}
                {selectedMenu == menu[6] && <AdminSettings  OWNER={ownerData} />}

            </Card>
        </div>
    )
}

export default AdminBody