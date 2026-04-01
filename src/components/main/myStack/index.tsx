import React, { useRef, useEffect } from 'react';

import hand from './../../../assets/images/main/hand.png'

import './index.scss';

import { stack } from '../../../mockData/stack';




const MyStack: React.FC = () => {
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])


    useEffect(() => {
        itemRefs.current.forEach((ref, index) => {
            if (ref) {
                console.log('Parent: ', ref.parentElement?.getBoundingClientRect().top, ref.parentElement?.getBoundingClientRect().left)
                console.log('Child: ', ref.getBoundingClientRect().top, ref.getBoundingClientRect().left)

                const child = ref.getBoundingClientRect()
                const parent = ref.parentElement?.getBoundingClientRect()

                if (parent) {
                    const cord_child_y = child.top - parent.top
                    const cord_child_x = child.left - parent.left
                    console.log(child)
                    console.log('Coord child: ', cord_child_y, cord_child_x)
                }

            }
        })
    }, [])


    return (
        <section className="myStack container">
            <h2 className="heading-24-magra-bold whiteText sectionTitle">MY STACK</h2>

            <img className="stackHandBg" src={hand} alt="" aria-hidden="true" />


            <div className="stackWrapper">
                {
                    stack.map((item, index) => {
                        return (
                            <div 
                                key={item.id} 
                                className="stackItem whiteText shadow-xl"
                                ref={(el) => {itemRefs.current[index] = el}}
                            >
                                {item.name}
                            </div>
                        )
                    })
                }
            </div>
            
        </section>        
    )
}

export default MyStack;