import React from 'react'
import { Image } from "@nextui-org/image";

function
    Logo({url}) {
    return (
        <Image alt='logo' className={'h-80 w-80 m-auto fadeIn rounded-full object-cover '} src={url} />

    )
}

export default Logo