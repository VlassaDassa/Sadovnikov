import React, { useRef, useEffect } from 'react';

import hand from './../../../assets/images/main/hand.png'

import './index.scss';

import { stack } from '../../../mockData/stack';




const MyStack: React.FC = () => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const wrapper = wrapperRef.current;
		const items = itemsRef.current;

		if (!items || !wrapper) return;

		items.forEach((item, index) => {
			if (item) {
				const x = Math.random() * (wrapper.clientWidth - item.offsetWidth)
				const y = Math.random() * (wrapper.clientHeight - item.offsetHeight)

				item.style.left = `${x}px`;
				item.style.top = `${y}px`;

				var attempts = 0
				const maxAttempts = 200
				var placed = false
				while (!placed && attempts < maxAttempts) {
					if (attempts > 50) {
						placed = true
					}

					// Определение пересечения
					items.forEach((otherItem, index) => {
						const rect1 = item.getBoundingClientRect()
						const rect2 = otherItem?.getBoundingClientRect()

						if (rect2) {
							var collision = false

							rect1.left < rect2.right &&
							rect1.right > rect2.left &&
							rect1.top < rect2.bottom &&
							rect1.bottom > rect2.top

							if (
								rect1.left < rect2.right
								rect2.right > rect
							) {

							}
						}
							
						

						
					})

					


					attempts++;
				}
			}

		});

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
		</section> // Переписать самостоятельно
	);
};

export default MyStack;