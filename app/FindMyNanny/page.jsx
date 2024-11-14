'use client'
import { addToDoc, watchDocument } from '@/UTIL/Database';
import Loading from '@/app/Loading';
import { Button, Card, Image, Input, Textarea } from '@nextui-org/react';
import { message, Select } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function FindFamilyForm() {
    const [IDs, setIDs] = useState()
    const clientID = IDs?.clientID ? IDs?.clientID : 1
    const [FormData, setFormData] = useState({ clientID: clientID, contacted: false, paymentAmount: 0, paymentDue: '12/12/9999' })
    const [Submit, setSubmit] = useState(false)
    const { push } = useRouter()
    useEffect(() => {
        watchDocument('Admin', 'IDs', setIDs)
    }, [])
    const [messageApi, contextHolder] = message.useMessage();
    console.log(FormData)
    return (
        <main className='h-screen mb-20'>
            {contextHolder}
            {Submit && <Loading />}
            <div className='h-full relative'>
                <h1 className='font-bold text-center top-12 text-white bg-black w-fit absolute z-20  m-auto p-1'>
                    Chloe's Baby sitting services
                </h1>
                <Image className='rounded-t-none h-screen w-screen object-cover' src={'https://images.unsplash.com/photo-1561567131-f7d83083aee0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt='cute baby' />
            </div>
            <Card

                xs
                className='md:w-1/3 bg-black m-auto p-4 relative fadeIn  md:absolute bottom-60 md:bottom-12 md:right-12 z-30 bg-opacity-75'
            >
                <h1 className={'text-4xl text-white my-4 font-semibold text-center'}>Find Your Nanny</h1>

                <form onChange={({ target }) => { setFormData((old) => ({ ...old, [target.name]: target.value })) }} className='flex flex-col gap-4 '>

                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        required
                        name='fullName'
                    />


                    <Input
                        type="email"
                        label="Email Address"
                        placeholder="Enter your email"
                        required
                        name='email'
                    />

                    <Input
                        type="tel"
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        required
                        name='phone'
                    />


                    <Input
                        label="Availability"
                        placeholder="e.g., Weekends, Weekdays, Specific times"
                        name='availability'
                    />

                    <Textarea
                        label="Additional Comments"
                        placeholder="Let us know any other details..."
                        rows={4}
                        name='comments'
                    />
                    <Card className='p-4 font-bold text-2xl w-fit m-auto gap-2 center bg-opacity-75'>
                        Add Maid Services
                        <p className='text-sm text-center font-light w-64'>
                            Chloe's Maid Services delivers reliable,
                            thorough cleaning for homes and offices,
                            ensuring a spotless space you can enjoy
                            stress-free.
                        </p>
                        <Select
                            defaultValue="No"
                            style={{ width: 120 }}
                            onChange={''}
                            options={[
                                { value: 'No', label: 'No' },
                                { value: 'Yes', label: 'Yes' },

                            ]}
                        />
                    </Card>
                    <Button onPress={async () => {
                        setSubmit(true)
                        if (!FormData.fullName || !FormData.phone || !FormData.availability) {
                            if (!FormData.fullName) messageApi.error('Name required!')
                            if (!FormData.email) messageApi.error('Email required!')
                            if (!FormData.phone) messageApi.error('Phone required!')
                            if (!FormData.availability) messageApi.error('Availability required!')
                            setSubmit(false)
                            return
                        }
                        await addToDoc('Clients', `${clientID}`, FormData)
                        await addToDoc('Admin', 'IDs', { clientID: clientID + 1 })
                        push('/?enrolled=true')
                    }} className='w-full mb-20'  >
                        Submit
                    </Button>

                </form>
            </Card>
        </main>
    );
}