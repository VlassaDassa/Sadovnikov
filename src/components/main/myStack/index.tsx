import React, { useRef, useEffect } from 'react';

import style from './index.module.scss';

import { randomPlacementItems } from '@/services/stack';
import { stack } from '@/mockData/stack';


const hand = '/images/main/hand.png'


const MyStack: React.FC = () => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		randomPlacementItems({itemsRef, wrapperRef})
	}, []);


	return (
		<section className={`${style.myStack} container`}>
			<h2 className={`sectionTitle ${style.stackTitle}`}>MY STACK</h2>
			<img className={style.stackHandBg} src={hand} alt="" aria-hidden="true" />

			<div className={style.stackWrapper} ref={wrapperRef}>
				{stack.map((item, index) => (
					<div
						key={item.id}
						className={style.stackItem}
						ref={(el) => {
							itemsRef.current[index] = el
						}}
					>
						{item.name}
					</div>
				))}
			</div>
		</section> 
	);
};

export default MyStack;