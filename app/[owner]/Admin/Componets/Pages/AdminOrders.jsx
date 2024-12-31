import { useFetchDocsPresist } from '@/app/myCodes/Database';
import { Card, Button, Text, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';

export const AdminOrders = ({OWNER}) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookings, setBookings] = useState([])
    console.log(bookings)
    
useEffect(() => {
    async function fetchBookings() {
        if (!OWNER) return
            console.log('OWNER', OWNER)
            await useFetchDocsPresist('Apointment', 'ownerID', '==', OWNER?.uid, 'apointmentDate' ,setBookings);
           
           
        }
        fetchBookings()
    },[OWNER])


console.log(isModalOpen)

    const handleOpenOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const handleCancel = () => {
        // Add logic to cancel the appointment
        handleCloseModal();
    };

    const handleComplete = () => {
        // Add logic to complete the appointment
        handleCloseModal();
    };

    return (
        <div className='center-col p-2'>
            <Card className='w-full p-4'>
                <h1>Appointments</h1>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {bookings.map((item, index) => (
                        <Card key={index} className='p-2 ' >
                            <h1>Order {index + 1}</h1>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <h1>Customer</h1>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <div>
                                            <h1>{item?.customerName}</h1>
                                            <h1>{item?.customerEmail}</h1>
                                            <h1>{item?.customerPhone}</h1>
                                        </div>
                                        <div>
                                            <h1>John Doe</h1>
                                            <h1>john.doe@example.com</h1>
                                            <h1>{item.apointmentID}</h1>
                                        </div>
                                    </div>
                                    <Button onPress={() => handleOpenOrder(item)}>View</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>

            <Modal onClose={handleCloseModal} open={isModalOpen}>
            <h1 className='text-3xl font-bold'>
                        Order Details
                    </h1>
               
                    <p>Customer Name: John Doe</p>
                    <p>Email: john.doe@example.com</p>
                    <p>Phone: +1234567890</p>
                    {/* Add more order details here */}
                
                    <Button auto flat color="error" onClick={handleCancel}>
                        Cancel Appointment
                    </Button>
                    <Button auto onClick={handleComplete}>
                        Complete Appointment
                    </Button>
                 
               
            </Modal>
        </div>
    );
};