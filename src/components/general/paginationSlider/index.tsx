import React from 'react';

import styles from './index.module.scss';


interface PaginationSliderProps {
    totalCountItems: number,
    curIndex: number
}



const PaginationSlider: React.FC<PaginationSliderProps> = ({ totalCountItems, curIndex }) => {
    return (
        <div className={styles.sliderPgnWrapper}>
            {
                Array.from({ length: totalCountItems }).map((item, index) => (
                    <div 
                        key={index}
                        className={`
                            ${styles.sliderPgnItem} 
                            ${index+1 === curIndex ? styles['sliderPgnItem-current'] : ''} 
                        `}>

                    </div>
                ))
            }
        </div> 
    )
}

export default PaginationSlider;