import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import LinkImg from '../img'
import Picture from './Picture'
import { useDrop } from 'react-dnd'
import './Main.scss'
const Main = () => {
    const [start, setstart] = useState(0)
    const dataRender = useRef(LinkImg.slice(0, 5))
    const dataMap = useRef(LinkImg.slice(0, 5))
    const listDescription = useRef(['air', 'ash', 'dush', 'earth', 'eruption'])
    const moreDescription = ['energy', 'fire', 'granite', 'vocalno', 'fake2']
    const data = useRef<image[]>([])
    useEffect(() => {
        document.querySelectorAll('li').forEach(li => {
            li.addEventListener('click', (e: any) => {
                let alphabet = e.target.textContent;
                let index = listDescription.current.findIndex(a => a[0].toUpperCase() === alphabet)
                setstart(index)
            })

        })
    }, [])
    interface image {
        url: string,
        x: number,
        y: number,
        _id: number
    }
    const x = useRef(0)
    const y = useRef(0)
    const [checkDropImg, setCheckDropImg] = useState({
        url: '',
        id: 0
    })

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'image',
        drop: (item: any) => addImageToBoard(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))
    const addImageToBoard = (item: any) => {
        if (item !== '') {
            if (item.id < 10) {
                data.current.push({
                    url: `${item.url}`,
                    'x': x.current,
                    'y': y.current,
                    _id: item.id
                })
            } else {
                data.current[item.id - 10].x = x.current
                data.current[item.id - 10].y = y.current
            }
        }
    }
    const dropOnBoard = (e: any) => {
        x.current = e.clientX;
        y.current = e.clientY;
    }
    const formula = (index1: number, index2: number, out: number, arr: any) => {
        if (data.current.length > 0) {
            let length = data.current.length;
            let index = checkDropImg.id - 10
            if ((arr[index2].LinkImg === checkDropImg.url && arr[index1].LinkImg === data.current[length - 1].url) || (arr[index1].LinkImg === checkDropImg.url && arr[index2].LinkImg === data.current[length - 1].url)) {
                data.current[index].url = arr[out].LinkImg
                data.current.splice(length - 1, 1)
                setCheckDropImg({
                    url: '',
                    id: 0
                })
                let vt = dataRender.current.findIndex(val => {
                    return val.LinkImg === arr[out].LinkImg
                })
                if (vt === -1) {
                    dataRender.current.push(arr[out])
                    dataMap.current.push(arr[out])
                    if (out > 5) {
                        listDescription.current.push(moreDescription[out - 5])
                    }
                }
            }

        }
    }
    formula(1, 0, 2, LinkImg)
    formula(3, 4, 7, LinkImg)
    formula(2, 3, 8, LinkImg)
    formula(0, 6, 9, LinkImg)
    formula(1, 4, 6, LinkImg)
    formula(5, 3, 8, LinkImg)
    formula(2, 7, 4, LinkImg)
    formula(4, 9, 3, LinkImg)
    formula(2, 5, 6, LinkImg)

    return (
        <div className='Main'>
            <div className='Board' ref={drop} onDrop={dropOnBoard}>
                {
                    data.current.map((value, index) => {
                        return <div style={{ top: `${value.y}px`, left: `${value.x}px` }} className='imgLeft'>
                            <Picture url={value.url} id={index + 10} setCheckDropImg={setCheckDropImg} ></Picture>
                        </div>
                    })
                }
            </div>
            <div className='alphabet'>
                <ul>
                    <li>A</li>
                    <li>B</li>
                    <li>C</li>
                    <li>D</li>
                    <li>E</li>
                    <li>F</li>
                    <li>G</li>
                    <li>H</li>
                    <li>I</li>
                    <li>K</li>
                    <li>L</li>
                    <li>M</li>
                    <li>N</li>
                    <li>O</li>
                    <li>P</li>
                    <li>Q</li>
                    <li>R</li>
                    <li>S</li>
                    <li>T</li>
                    <li>U</li>
                    <li>V</li>
                </ul>
            </div>
            <div className='Picture'>
                {dataRender.current.map((picture, i) => {
                    if (i >= start) {
                        return <div>
                            <Picture url={picture.LinkImg} id={picture._id} setCheckDropImg={setCheckDropImg}  ></Picture>
                            <p>{listDescription.current[i]}</p>
                        </div>
                    }
                })}
            </div>

        </div>
    )
}

export default React.memo(Main)