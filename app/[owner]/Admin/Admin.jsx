'use client'
import React, { useEffect, useState } from 'react'
import { AdminMenu } from "./Componets/Menu/AdminMenu"
import AdminBody from "./Componets/Pages/AdminBody"
import AuthWrapper from '@/app/General/AuthWrapper'
import { useRouter } from 'next/navigation'

export const Admin = () => {
    const {push} = useRouter()
    const [selectedMenu, setSelectedMenu] = useState('Products')

    return (
        <AuthWrapper>
        <main className="flex" >
            <AdminMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
            <AdminBody selectedMenu={selectedMenu} />
        </main>
    </AuthWrapper>

    )
}