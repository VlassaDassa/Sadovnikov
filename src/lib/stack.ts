interface RandomPlacementItems  {
    itemsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
    wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
}


export const randomPlacementItems = (props: RandomPlacementItems) => {
    const { itemsRef, wrapperRef } = props

    	const wrapper = wrapperRef.current;
		const items = itemsRef.current;

		if (!items || !wrapper) return;

		items.forEach((item, index) => {
			if (item) {
				var attempts = 0
				const maxAttempts = 200
				var placed = false
				
				while (!placed && attempts < maxAttempts) {
					const x = Math.random() * (wrapper.clientWidth - item.offsetWidth)
					const y = Math.random() * (wrapper.clientHeight - item.offsetHeight)

					item.style.left = `${x}px`;
					item.style.top = `${y}px`;

					// Определение пересечения
					var collision = false
					for (let i = 0; i < index; i++) {
						const otherItem = items[i];
						if (!otherItem) continue;

						const rect1 = item.getBoundingClientRect()
						const rect2 = otherItem.getBoundingClientRect()

						if (
							rect1.left < rect2.right &&
							rect1.right > rect2.left &&    // Хоть одно False - не пересекаются
							rect1.top < rect2.bottom &&
							rect1.bottom > rect2.top
						) {
							collision = true
							break
						}
					}
					if (!collision) {
						placed = true
					}
					attempts++;
				}
			
				if (!placed) {
					item.style.top = '5px';
					item.style.left = `${index * 50}px`;
				}
			}
		});
}