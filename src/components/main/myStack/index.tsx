import React, { useRef, useEffect } from 'react';

import hand from './../../../assets/images/main/hand.png'

import './index.scss';

import { randomPlacementItems } from '../../../services/stack';
import { stack } from '../../../mockData/stack';




const MyStack: React.FC = () => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		randomPlacementItems({itemsRef, wrapperRef})
	}, []);


	return (
		<section className="myStack container">
			<h2 className="heading-24-magra-bold whiteText sectionTitle">MY STACK</h2>
			<img className="stackHandBg" src={hand} alt="" aria-hidden="true" />

			<div className="stackWrapper" ref={wrapperRef}>
				{stack.map((item, index) => (
					<div
						key={item.id}
						className="stackItem whiteText shadow-xl"
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