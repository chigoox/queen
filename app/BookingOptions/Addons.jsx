import { Button, Checkbox, Image } from '@nextui-org/react';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { IoIosCloseCircle } from "react-icons/io";

const Addons = ({ contintue, opened }) => {
    const [isModalOpen, setIsModalOpen] = useState(opened);

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        setIsModalOpen(opened)
    }, [opened])

    const addOns = [
        { name: 'Test addon', price: 30, time: 25, desc: 'what add on does' },
        { name: 'Test addon 2', price: 45, time: 10, desc: 'what add on does' },
        { name: 'Test addon 3', price: 15, time: 25, desc: 'what add on does' },
        { name: 'Test addon 4', price: 10, time: 5, desc: 'what add on does' },
    ]

    return (
        <>
            <Modal closeIcon={<IoIosCloseCircle size={24} color='black' />} open={isModalOpen} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} ancelButtonProps className='p-0' onOk={handleOk} onCancel={handleCancel}>
                <h1 className='font-bold text-3xl'>Select Addons</h1>
                {addOns.map((item, index) => {
                    return (
                        <div key={index} className='h-24 w-full text-white  center gap-4 p-2'>
                            <div className=' w-full h-3/4 m-auto'>
                                <h1 className='text-3xl text-yellow-600 font-bold'>{item.name}</h1>
                                <div className='text-gray-400 font-semibold'>${item.price} -  {(item.time)} Minutes</div>
                            </div>
                            <Checkbox radius='none' size='lg' className='rounded-none h-24 w-24' />

                        </div>
                    )
                })}

                <Button onPress={() => { contintue(true); setIsModalOpen(false) }} className='w-full bg-black text-white font-bold text-xl'>Pick Date</Button>
            </Modal>
        </>
    );
};
export default Addons;