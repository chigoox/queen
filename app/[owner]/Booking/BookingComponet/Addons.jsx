import { Button, Checkbox, Image } from '@nextui-org/react';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { IoIosCloseCircle } from "react-icons/io";

const Addons = ({ setIsOpened, contintue, opened, options, setBookingInfo, bookingInfo }) => {
    const [isModalOpen, setIsModalOpen] = useState(opened);

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsOpened(false)
        setIsModalOpen(false);
    };
    useEffect(() => {
        setIsModalOpen(opened)
    }, [opened])


    return (
        <>
            <Modal  classNames={'bg-black'} closeIcon={<IoIosCloseCircle size={24} color='black' />} open={isModalOpen} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }}  className='p-0' onOk={handleOk} onCancel={handleCancel}>
                <h1 className='font-bold text-3xl'>Select Addons</h1>
                {(options || []).map((item, index) => {
                   if (item.metadata.category == 'Addon') return (
                        <div key={index} className='h-24 w-full text-white  center gap-4 p-2'>
                            <div className=' w-full h-3/4 m-auto'>
                               <h1 className='text-3xl text-[color:var(--AccentColor)] font-bold'>{item.name}</h1>
                               <div className='text-gray-400 font-semibold'>${item.metadata.price} -  {(item.metadata.time)} Minutes</div>
                            </div>
                           <Checkbox isSelected={bookingInfo?.addons[index]} onValueChange={(v) => { setBookingInfo((old) => { return ({ ...old, addons: ({ ...old.addons, [index]: v ? { name: item.name, price: item.metadata.price, time: item.metadata.time } : v }) })})}} radius='none' size='lg' className='rounded-none h-24 w-24' />

                        </div>
                    )
                })}

                <Button onPress={() => { contintue(true); setIsModalOpen(false) }} className='w-full bg-black text-white font-bold text-xl'>Pick Date</Button>
            </Modal>
        </>
    );
};
export default Addons;