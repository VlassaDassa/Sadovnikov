import React, { useState, useEffect, useCallback, useRef } from 'react';

import './index.scss';

interface CanvasProps {
    children?: React.ReactNode;
    width?: string;
    height?: string;
    className?: string;
}

interface Coord {
    x: number,
    y: number
}


const Canvas: React.FC<CanvasProps> = ({
    children,
    width='100%',
    height='100%',
    className=''
}) => {

    const [manualShow, setManualShow] = useState<boolean>(true)
    const [scale, setScale] = useState<number>(1)
    const [renderTrigger, setRenderTrigger] = useState<Coord>(0)
    const [position, setPostion] = useState<{x: number, y: number}>({
        x: 0,
        y: 0
    })
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [dragStart, setDragStart] = useState<Coord>({
        x: 0,
        y: 0
    })
    const [spacePressed, setSpacePressed] = useState<boolean>(false)

    const canvasRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    
    const prevScaleRef = useRef<number>(1);

    // Поведение при пробеле
    useEffect(() => {
        const preventSpaceDefault = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault(); // <- отключение стандартного поведения

                if (e.type === 'keydown' && !e.repeat) {// <- !e.repeat, сработает при первом нажатии(зажатии). Без этого, код бы исполнялся множество раз 
                    setSpacePressed(true);
                    if (canvasRef.current) {
                        canvasRef.current.style.cursor = 'grab'
                    }
                }

                if (e.type === 'keyup') {
                    setSpacePressed(false);
                    if (canvasRef.current) {
                        canvasRef.current.style.cursor = 'default'
                    }
                }
            }
        }

        document.addEventListener('keydown', preventSpaceDefault);
        document.addEventListener('keyup', preventSpaceDefault);
        
        return () => {
            document.removeEventListener('keydown', preventSpaceDefault);
            document.removeEventListener('keydown', preventSpaceDefault);
        }
    }, [])


    // Поведение при колёсике мыши. Отключение обычного поведения внутри canvas
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Находится ли курсор внутри canvas
            const isTargetInsideCanvas = canvasRef.current?.contains(e.target as Node);
            
            if (isTargetInsideCanvas && (e.ctrlKey || e.metaKey)) { // <- e.metaKey - это поведение для Mac, где вместо ctrl другая клавиша
                e.preventDefault();
            }

            window.addEventListener('wheel', handleWheel, { passive: false })

            return () => {
                window.removeEventListener('wheel', handleWheel)
            }
        }


    }, [])


    // Запоминание начальной точки нажатия
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        // Если дочерний элемент, то не смещаем
        if (e.target instanceof Element && e.target.closest('.canvasElement')) {
            return;
        }

        // Запоминаем начальную точку
        if (spacePressed || e.button === 1) { // <-  e.button === 1 - это зажатие колёсика
            e.preventDefault()
            setIsDragging(true)
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            })
        }

        if (canvasRef.current) {
            canvasRef.current.style.cursor = 'grabbing';
        }
    }


    const 


    return (
        <div className="canvas">
            {children}
        </div>
    )
}

export default Canvas;