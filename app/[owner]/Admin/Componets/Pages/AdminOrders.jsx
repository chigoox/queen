import React, { useEffect, useState } from 'react';
import { Card, Button, Text, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure } from '@nextui-org/react';
import { useFetchDocsPresist } from '@/app/myCodes/Database';

const BookingCard = ({ booking, onView }) => {
  return (
    <Card className="p-4 shadow-md">
      <h2 className="font-bold text-lg">{booking.service.name}</h2>
      <p className="text-sm text-gray-600">Date: {booking.apointmentDate}</p>
      <p className="text-sm text-gray-600">Duration: {booking.service.time} min</p>
      <p className="text-sm text-gray-600">Price: ${booking.service.price}</p>
      <div className="mt-2">
        <h3 className="font-semibold">Customer</h3>
        <p>Name: {booking.customerName}</p>
        <p>Email: {booking.customerEmail}</p>
        <p>Phone: {booking.customerPhone}</p>
      </div>
      <Button className="mt-4" onPress={() => onView(booking)}>
        View Details
      </Button>
    </Card>
  );
};

export const AdminOrders = ({ OWNER }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookings, setBookings] = useState([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

  useEffect(() => {
    async function fetchBookings() {
      if (!OWNER) return;
      await useFetchDocsPresist('Apointment', 'ownerID', '==', OWNER?.uid, 'apointmentDate', setBookings);
    }
    fetchBookings();
  }, [OWNER]);

  const handleOpenOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
    onOpen()
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCancel = () => {
    // Add cancel logic here
    handleCloseModal();
  };

  const handleComplete = () => {
    // Add complete logic here
    handleCloseModal();
  };
  return (
    <div className="hidescroll m-auto h-full overflow-hidden overflow-y-scroll  w-full items-center  p-4">
      <Card className="w-full max-w-4xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Appointments</h1>
        <div className="grid  h-3/4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, index) => (
            <BookingCard key={index} booking={booking} onView={handleOpenOrder} />
          ))}
        </div>
      </Card>

      {isModalOpen && selectedOrder && (
        <Modal closeButton  isOpen={isOpen} >
          <ModalContent>
          <ModalHeader>
            <Text id="modal-title" className="text-lg font-bold">
              Appointment Details
            </Text>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <p>
                <strong>Customer Name:</strong> {selectedOrder.customerName}
              </p>
              <p>
                <strong>Email:</strong> {selectedOrder.customerEmail}
              </p>
              <p>
                <strong>Phone:</strong> {selectedOrder.customerPhone}
              </p>
              <p>
                <strong>Service:</strong> {selectedOrder.service.name}
              </p>
              <p>
                <strong>Duration:</strong> {selectedOrder.service.time} min
              </p>
              <p>
                <strong>Price:</strong> ${selectedOrder.service.price}
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button auto flat color="error" onClick={handleCancel}>
              Cancel Appointment
            </Button>
            <Button auto onClick={handleComplete}>
              Complete Appointment
            </Button>
          </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};
