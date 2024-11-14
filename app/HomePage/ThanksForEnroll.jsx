import { Image } from '@nextui-org/react';
import { Modal } from 'antd';
import { useState } from 'react';
import { IoIosCloseCircle } from "react-icons/io";

const ThanksForEnroll = ({ opened }) => {
    const [isModalOpen, setIsModalOpen] = useState(opened);

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal closeIcon={<IoIosCloseCircle size={24} color='black' />} open={isModalOpen} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} ancelButtonProps className='p-0' onOk={handleOk} onCancel={handleCancel}>
                <Image src={'https://images.unsplash.com/photo-1491013516836-7db643ee125a?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt='cute baby' />
                <h1 className='text-2xl font-bold text-cented'>We recived your infomation!</h1>
                <h1 className='text-center text-lg'>someone will get back to you shortly!</h1>
            </Modal>
        </>
    );
};
export default ThanksForEnroll;