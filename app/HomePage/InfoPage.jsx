'use client'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import HowToEnroll from '@/app/HomePage/HowToEnroll'
import HealthAndSafety from '@/app/HomePage/HealthAndSafety'
function InfoPage({ showMenu, setShowMenu }) {


    const menuName = showMenu.currentMenu
    return (
        < Modal isOpen={showMenu} backdrop={'transprent'} onOpenChange={() => { setShowMenu(false) }
        } placement='auto' size='full' scrollBehavior='inside' className={`h-auto  text-black w-full overflow-x-hidden bg-white   ${{
            backdrop: "bg-black bg-opacity-100"
        }}`}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="center-col gap-1   md:scroll-px-20 ">
                            {menuName}
                        </ModalHeader>
                        <ModalBody className='hidescroll  overflow-hidden    p-2'>
                            {menuName == 'How To Enroll' ? <HowToEnroll /> :
                                menuName == 'Health & Safety' ? <HealthAndSafety /> : <div></div>}
                        </ModalBody>
                        <ModalFooter>
                            <Button className='w-full' onPress={() => { setShowMenu(false) }} color="danger" variant="light">
                                Close
                            </Button>

                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal >
    )
}

export default InfoPage