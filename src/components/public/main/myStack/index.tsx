'use client'

import React, { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import AdaptiveImage from '@/components/shared/AdaptiveImage';
import EmptySection from '@/components/shared/EmptySection';

import { randomPlacementItems } from '@/lib/stack';
import type { Stack } from '@/interfaces/general';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

import style from './index.module.scss';




const hand = '/images/main/hand.png'


interface StackProps {
	stack: Stack[]
}

const MyStack: React.FC<StackProps> = ({ stack }) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

	const { isVisible, elementRef } = useScrollAnimation<HTMLImageElement>({
		threshold: 0.1,
		rootMargin: '0px 0px -100px 0px'
	})

	const t = useTranslations('MyStack');


	useEffect(() => {
		let timeout: NodeJS.Timeout;
		let lastWidth = wrapperRef.current?.clientWidth;
		
		const updatePositions = () => {
			randomPlacementItems({ itemsRef, wrapperRef });
		};
		
		const debouncedUpdate = () => {
			const newWidth = wrapperRef.current?.clientWidth;
			
			// Пересчитываем только если ширина реально изменилась
			if (newWidth !== lastWidth) {
				lastWidth = newWidth;
				clearTimeout(timeout);
				timeout = setTimeout(updatePositions, 150);
			}
		};
		
		updatePositions();
		
		const resizeObserver = new ResizeObserver(debouncedUpdate);
		if (wrapperRef.current) {
			resizeObserver.observe(wrapperRef.current);
		}
		
		return () => {
			resizeObserver.disconnect();
			clearTimeout(timeout);
		};
	}, []);


	return (
		<section className={`${style.myStack} container`}>
			<h2 className={`sectionTitle ${style.stackTitle}`}>{t('title')}</h2>

			{
				stack.length === 0 ?
					<EmptySection text='Stack not found' />
				:
					<>
						<AdaptiveImage 
							wrapClass={`${style.stackHandBg} ${isVisible ? style['stackHandBg-anim'] : ''} `} 
							ref={elementRef}
							src={hand} 
						/>

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
					</>
			}

			
		</section> 
	);
};

export default MyStack;