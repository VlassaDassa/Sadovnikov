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
    height='1200px',
    className=''
}) => {

    const [manualShow, setManualShow] = useState<boolean>(true)
    const [scale, setScale] = useState<number>(1)
    const [renderTrigger, setRenderTrigger] = useState<number>(0)
    const [position, setPosition] = useState<Coord>({
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
        }

        window.addEventListener('wheel', handleWheel, { passive: false })

        return () => {
            window.removeEventListener('wheel', handleWheel)
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


    // Перемещение canvas
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;

        e.preventDefault();

        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        })
    }


    // Отмена перемещения
    const handleMouseUp = () => {
        setIsDragging(false)

        if (canvasRef.current) {
            canvasRef.current.style.cursor = spacePressed ? 'grab' : 'default'
        }
    }


    // Масштабирование, с учётом местоположения курсора
    const handleWheel = useCallback(
        (e: React.WheelEvent<HTMLDivElement>) => {
            if (e.ctrlKey || e.metaKey) {
                const delta = e.deltaY > 0 ? 0.9 : 1.1 // <- 0.9 и 1.1 <- шаг 
                const newScale = Math.min(Math.max(scale * delta, 0.1), 5) // <- 0.1 и 0.5 - ограничение(10% и 500%)
            
                const rect = canvasRef.current?.getBoundingClientRect();
                if (!rect) return

                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                const newPosition = {
                    x: mouseX - (mouseX - position.x) * (newScale / scale),
                    y: mouseY - (mouseY - position.y) * (newScale / scale),
                }

                prevScaleRef.current = scale;

                setPosition(newPosition);
                setScale(newScale)


                // Страховка от артефактов
                setTimeout(() => {
                    setRenderTrigger(prev => prev + 1)
                }, 50)
            }
        },
    [scale, position]
    )


    // Запрет на открытие контекстного меню, при перемещении
    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging || spacePressed) {
            e.preventDefault()
        }
    } 


    const closeManual = () => {
        setManualShow(false)
    }


    return (
        <div 
            className={`canvasWrapper ${className}`}
            style={{ width, height }}
        >
            <div
                ref={canvasRef}
                className="canvasContainer"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
                onContextMenu={handleContextMenu}
            >
                <div 
                    ref={contentRef}
                    className="canvasContent"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transformOrigin: '0 0',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                    }}
                    data-render={renderTrigger}
                >
                    {children}
                </div>    

                <div className="zoomInfo">{Math.round(scale * 100)}%</div>

                {manualShow && (
                    <div className="canvasManual">
                        <div className="manualElement">
                            <span className="manualKey">CTRL</span>
                            <span className="manualText">+</span>
                            <span className="manualKey">Wheel</span>
                            <span className="manualText">- scaling</span>
                        </div>

                        <div className="manualElement">
                            <span className="manualKey">Space</span>
                            <span className="manualText">+</span>
                            <span className="manualKey">Drag</span>
                            <span className="manualText">- moving across the canvas</span>
                        </div>

                        <span onClick={closeManual} className="closeManual">×</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Canvas;