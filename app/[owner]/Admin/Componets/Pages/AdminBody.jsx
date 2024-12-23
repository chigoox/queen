import { Card } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { menu } from '../Menu/AdminMenu'
import { AdminHome } from './AdminHome'
import { AdminOrders } from './AdminOrders'
import { AdminProduct } from './AdminProduct'
import WebsiteEditor from './WebsiteEditor'
import { FetchTheseDocs } from '@/UTIL/Database'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore';
import { AUTH } from '@/Firebase'
const AdminBody = ({ selectedMenu }) => {
const [WebsiteEditorData, setWebsiteEditorData] = useState({})
const [owner, setOwner] = useState(null);
  const [ownerData, setOwnerData] = useState(null);
  const [loading, setLoading] = useState(false)

 const router = useRouter()

useEffect(() => {
    const unsubscribe = onAuthStateChanged(AUTH, async (currentUser) => {
        setOwner(currentUser);
      try {
        // Fetch user-specific data from Firestore
        const userDocRef = doc(db, 'Owner', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            setOwnerData(userDoc.data());
        } else {
          console.error('No user data found!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);





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
                {selectedMenu == menu[4] && <WebsiteEditor />}
                {selectedMenu == menu[5] && <AdminHome />}

            </Card>
        </div>
    )
}

export default AdminBody