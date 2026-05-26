import React from "react";

import styles from './index.module.scss';



interface SectionBackgroundProps {
    children: React.ReactNode;
}

const SectionBackground: React.FC<SectionBackgroundProps> = ({ children }) => {
    return (
        <div className={styles.background}>
            <svg className={styles.noise} xmlns="http://www.w3.org/2000/svg">
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="3"
                        numOctaves={4}
                        stitchTiles="stitch"
                    />
                    <feColorMatrix 
                        type="matrix" 
                        values="1 0 0 0 0, 1 0 0 0 0, 1 0 0 0 0, 0 0 0 0.15 0" 
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
            { children }
        </div>
    )
}

export default SectionBackground;