'use client'

import React, { useEffect, useRef, useCallback } from 'react';
import { AboutMe } from '@/interfaces/general';
import { useTranslations } from 'next-intl';

import AdaptiveImage from '@/components/shared/AdaptiveImage';

import style from './index.module.scss';

const uzbIsland = '/images/main/uzbIsland.png';
const kollegePhoto = '/images/main/kolledge_photo.png';
const moscowPhoto = '/images/main/moscow_photo.png';


interface AboutIllustrationProps {
    aboutMe: AboutMe
}

const AboutIllustration: React.FC<AboutIllustrationProps> = ({ aboutMe }) => {
    const ref1 = useRef<HTMLDivElement>(null)
    const ref2 = useRef<HTMLDivElement>(null)
    const ref3 = useRef<HTMLDivElement>(null)

    const svgRef = useRef<SVGSVGElement>(null)
    const path1 = useRef<SVGPathElement>(null)
    const path2 = useRef<SVGPathElement>(null)

    const buildCurve = useCallback((from: HTMLElement, to: HTMLElement, svg: SVGSVGElement) => {
        const a = from.getBoundingClientRect()
        const b = to.getBoundingClientRect()
        
        const svgRect = svg.getBoundingClientRect()
        
        const startX = a.left + a.width / 2 - svgRect.left 
        const startY = a.top + a.height / 2 - svgRect.top
        
        const endX = b.left + b.width / 2 - svgRect.left
        const endY = b.top + b.height / 2 - svgRect.top

        const controlX = (startX + endX) / 2 + 350
        const controlY = Math.min(startY, endY) + 100

        return `M ${startX} ${startY}
                Q ${controlX} ${controlY}
                ${endX} ${endY}`
    }, [])


    useEffect(() => {
        const update = () => {
            if (ref1.current && ref2.current && ref3.current && svgRef.current) {
                path1.current?.setAttribute(
                    "d",
                    buildCurve(ref1.current, ref2.current, svgRef.current)
                )

                path2.current?.setAttribute(
                    "d",
                    buildCurve(ref2.current, ref3.current, svgRef.current)
                )
            }
        }

        update()
        window.addEventListener("resize", update)
        return () => window.removeEventListener("resize", update)
    }, [buildCurve])

    const t = useTranslations('AboutMe');

    return (
        <div className={style.illustationContainer}>
            <div className={style.uzbContainer} ref={ref1}>
                
                <AdaptiveImage 
                    wrapClass={style.uzbIsland}
                    src={uzbIsland}
                    alt="Uzbekistan"
                    ariaHidden={false}
                />

                <div className={style.uzbTextContainer}>
                    <p className={`${style.uzbText} ${style.text}`}>{t('YearOfBirth')} {aboutMe.birth}</p>
                    <p className={`${style.uzbText} ${style.text}`}>
                        {t('PlaceOfBirth')} {aboutMe.placeBirth}
                    </p>
                </div>
            </div>

            <div className={style.mskContainer} ref={ref2}>
                

                <AdaptiveImage 
                    wrapClass={style.moscowPhoto}
                    src={moscowPhoto}
                    alt="Moscow"
                    ariaHidden={false}
                />
                <p className={`${style.mskText} ${style.text}`}>{t('Location')} {aboutMe.location}</p>
            </div>

            <div className={style.kollegeContainer} ref={ref3}>
                <AdaptiveImage 
                    wrapClass={style.kollegePhoto}
                    src={kollegePhoto}
                    alt="kollege"
                    ariaHidden={false}
                />
                <p className={`${style.text} ${style.kollegeText}`}>{t('Education')} {aboutMe.education}</p>
            </div>

            <svg ref={svgRef} className={style.connections}>
                <path ref={path1} className={style.curve} />
                <path ref={path2} className={style.curve} />
            </svg>
        </div>
    )
}

export default AboutIllustration;