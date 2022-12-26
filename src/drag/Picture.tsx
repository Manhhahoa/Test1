import React, { SetStateAction, useRef, useState } from 'react'
import { useDrag } from 'react-dnd'
interface props {
    url: string,
    id: number,
    setCheckDropImg: any,
}
const Picture = ({ url, id, setCheckDropImg }: props) => {
    const DropImg = (e: any) => {
        setCheckDropImg({
            url: e.target.src,
            id: e.target.id
        })
    }

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'image',
        item: { id: id, url: url },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    return (
        <img ref={drag} onDrop={DropImg} src={url} alt="" id={id.toString()} />
    )
}

export default Picture