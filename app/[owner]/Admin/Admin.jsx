'use client'
import React, { useEffect, useState } from 'react'
import { AdminMenu } from "./Componets/Menu/AdminMenu"
import AdminBody from "./Componets/Pages/AdminBody"
import AuthWrapper from '@/app/General/AuthWrapper'
import { FetchTheseDocs } from '@/UTIL/Database'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore';
import { AUTH, DATABASE } from '@/Firebase'
export const Admin = () => {
    const {push} = useRouter()
    const [selectedMenu, setSelectedMenu] = useState('Products')
    const [owner, setOwner] = useState(null);
    const [ownerData, setOwnerData] = useState(null);
    const [loading, setLoading] = useState(false)
  
   const router = useRouter()
  
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(AUTH, async (currentUser) => {
        setOwner(currentUser);
        try {
          // Fetch user-specific data from Firestore
          const userDocRef = doc(DATABASE, 'Owners', currentUser.uid);
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
        <AuthWrapper>
        <main className="flex" >
            <AdminMenu ownerData={ownerData}  selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
            <AdminBody owner={owner} ownerData={ownerData} selectedMenu={selectedMenu} />
        </main>
    </AuthWrapper>

    )
}