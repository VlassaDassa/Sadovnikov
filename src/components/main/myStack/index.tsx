import React, { useRef, useEffect } from 'react';

import hand from './../../../assets/images/main/hand.png'

import './index.scss';

import { stack } from '../../../mockData/stack';




const MyStack: React.FC = () => {
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])


    useEffect(() => {
        itemRefs.current.forEach((ref, index) => {
            if (ref) {
                console.log(ref.getBoundingClientRect())
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