import React, { useEffect, useRef, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Card, CardHeader, CardBody, Input, Textarea, Switch, Checkbox, Select, SelectItem } from "@nextui-org/react";
import { Upload } from 'antd';
import { Uploader } from './Uploader';
//import Masonry from 'masonry-layout';
import { createArray } from '@/app/myCodes/Util';
import dynamic from "next/dynamic";
import { useCreateProductUtil, useUpdateProductUtil } from '../../AdminUtil';
const TextEditor = dynamic(() => import("./BundledEditor"), {
    ssr: false,
});
const Masonry = dynamic(() => import("masonry-layout"), {
    ssr: false,
});



export const ProductAddEdit = ({SITEINFO, openType, setWindow, defualt }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
const category = ([...SITEINFO?.categories, 'Addon'] || []).map((item)=>{return(item.name)})
console.log(SITEINFO)
    useEffect(() => {
        var grid = document.querySelector('.grid');
        var msnry = new Masonry(grid, {
            // options...
            itemSelector: '.grid-item',
            columnWidth: 200
        })
    }, [])

    const [product, setProuduct] = useState({
        active: true,
        description: 'null',
        images: [],
        metadata: {
            category: '',
            isNew: '',
            price: '',
            time: '',
        },
        name: "Lashes",
    })


    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (openType == "openNew") onOpen()
        if (openType == "openEdit") onOpen()
        if (defualt) setProuduct(defualt)
    }, [openType])

    const setText = (text, name) => {
        setProuduct(o => ({ ...o, [name]: text }))
    }
    const setTextMeta = (text, name) => {
        setProuduct(o => ({
            ...o, metadata: {
                ...o.metadata, [name]: text
            }
        }))
    }

    const profit = (product.metadata?.price - product.metadata?.costPerItem).toFixed(2)
    const margin = (((product.metadata?.price - product.metadata?.costPerItem) / product.metadata?.price) * 100).toFixed(2)
    const [Variants, setVariants] = useState(0)
    const x = (ED5) => {
        // ENTERPISES()
    }

    //todo make order not protected on pickup orders

    return (
        <>
            <Modal className='h-[80%]' placement='auto' size='5xl' isOpen={isOpen} isDismissable={false} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{openType == 'openNew' ? 'Add product' : 'Edit product'}</ModalHeader>
                            <ModalBody className='overflow-y-scroll hidescroll '>
                                <div className='grid gap-2 md:grid-cols-3 grid-cols-1  p-2 hidescroll'>

                                    <Card className='grid-item col-span-2'>
                                        <div className='w-full center my-4'>
                                            <Switch isSelected={product.active} onValueChange={(v) => setProuduct(o => ({ ...o, active: v }))}>Draft/Active</Switch>

                                        </div>
                                        <CardBody className='flex TITLE-DESCRIPTION'>
                                            <div className='p-2 h-full'>
                                                <h1 className='font-bold'>title</h1>
                                                <Input value={product.name} onValueChange={v => setProuduct(o => ({ ...o, name: v }))} size='sm' placeholder='Product Name' className='h-12' />
                                                <br />
                                                <h1 className='font-bold'>description</h1>
                                                <TextEditor defualt={product.description} setter={setProuduct} />
                                            </div>
                                            <div className='w-1/4'>

                                            </div>

                                        </CardBody>
                                    </Card>



                                    <Card className='UPLOADER col-span-2 grid-item'>
                                        <CardBody className='p-4 h-auto'>
                                            <div>
                                                <h1 className='font-bold'>Media</h1>
                                                <Uploader defualt={product.images} setFiles={setProuduct} />
                                            </div>
                                        </CardBody>
                                    </Card>



                                    <Card className='grid-item md:bottom-[30rem] PRICING'>
                                        <CardBody className=''>
                                            <h1 className='font-bold'>Pricing</h1>

                                            <div className='p-2 flex flex-col md:flex-row gap-4'>
                                                <div>
                                                    <h1 className='text-sm'>Price</h1>
                                                    <Input value={product.metadata.price} onValueChange={(v) => { setTextMeta(v, 'price') }} size='xs' placeholder='' className='h-10' />
                                                </div>
                                                <div>
                                                    <h1 className='text-sm'>Time (Mintues)</h1>
                                                    <Input value={product.metadata.time} onValueChange={(v) => { setTextMeta(v, 'time') }} size='xs' placeholder='' className='h-10' />
                                                </div>
                                            </div>


                                        </CardBody>
                                    </Card>



                                    <Card className='PRODUCT-ORG  relative text-black md:left-[40.5rem] md:bottom-[30rem] col-span-1 grid-item'>
                                        <CardBody className='p-4 h-auto'>
                                            <div>
                                                <h1 className='font-bold'>Product organization</h1>
                                                <div>
                                                    <h1>Category</h1>
                                                    <Select selectedKeys={[product.metadata.category]} onSelectionChange={(v) => { setTextMeta(Object.values(v)[0], 'category') }}>

                                                        {[...category,"Addon"].map(category => {
                                                            return (
                                                                <SelectItem value={category} key={category

                                                                }>
                                                                    {category}
                                                                </SelectItem>
                                                            )
                                                        })}

                                                    </Select>











                                                </div>


                                            </div>
                                        </CardBody>
                                    </Card>



                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={() => { setWindow(false) }}>
                                    Close
                                </Button>
                                <Button isLoading={loading}  color="primary" onPress={() => {
                                    (openType == "openNew") ?
                                        useCreateProductUtil(product, setWindow,setLoading) :
                                        useUpdateProductUtil(product, setWindow, setLoading)

                                }}>
                                    {openType == 'openNew' ? 'Create' : 'Update'}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}



export const VariavntPanel = ({ indexi, setter }) => {
    const [variantCount, setVariantCount] = useState({ [`variant0`]: { name: '', value: {}, valueCount: 1 } })
    const ActualPrice = Object.values(variantCount).map(item => {
        const SubVariants = Object.values(item.value)
        return SubVariants.length > 0 ? SubVariants.map(_item => {
            (`${item.name} ${_item}`)
            return (
                `${item.name}${_item ? ' ' + _item : ''}`
            )
        }) :

            item?.name
    })




    return (
        <div className='h-full'>
            {Object.keys(variantCount).map((item, index) => {
                const currentCount = variantCount[item].valueCount || 1
                const valuesCount = Object.keys(variantCount[item].value).length || 0
                const valueInLastPosition = Object.values(variantCount[item].value)[currentCount - 1]
                const countEqValue = (currentCount == valuesCount)


                useEffect(() => {
                    setter(o => ({
                        ...o, PRICES: { ...o.PRICES, [indexi]: ActualPrice[0] }
                    }))
                }, [variantCount])

                useEffect(() => {
                    if (valueInLastPosition && countEqValue)
                        setVariantCount(old => { return { ...old, [`variant${index}`]: { ...old[`variant${index}`], valueCount: old[`variant${index}`].valueCount + 1 } } })
                }, [valueInLastPosition, countEqValue])
                return (
                    <div key={item} className='h-full p-2 overflow-y-scroll hidescroll  rounded-lg w-40 shadow border-dotted border-2'>
                        <h1>Option name</h1>
                        <Input onValueChange={(value) => { setVariantCount(old => { return { ...old, [`variant${index}`]: { name: value, value: old[`variant${index}`].value, valueCount: old[`variant${index}`].valueCount } } }) }} size='sm' />
                        <h1>Option values</h1>
                        <div className=' center-col gap-4 '>
                            {
                                createArray(variantCount[item].valueCount).map((item, indexi) => {
                                    return (
                                        <div key={item}>
                                            <h1>Variant option {indexi}</h1>
                                            <Input onValueChange={(value) => { setVariantCount(old => { return { ...old, [`variant${index}`]: { name: old[`variant${index}`].name, valueCount: old[`variant${index}`].valueCount, value: { ...old[`variant${index}`].value, [`option${indexi}`]: value } } } }) }} size='sm' />
                                        </div>

                                    )
                                })}
                        </div>
                        <button onClick={() => { }} ></button>
                    </div>
                )
            })}

        </div>
    )
}