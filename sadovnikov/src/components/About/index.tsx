import React, { useEffect, useRef } from 'react';

import './index.scss';

import uzbFlag from './../../assets/images/uzbFlag.png';
import uzbIsland from './../../assets/images/uzbIsland.png';
import ruFlag from './../../assets/images/ruFlag.png';
import photoMsk from './../../assets/images/photoMsk.png';
import kolledge from './../../assets/images/kolledge.png';
import longStoryBg from './../../assets/images/longStoryBg.svg';

import workExperience from '../../mockData/about';
import { shortBio } from '../../mockData/about';


const About: React.FC = () => {
    const ref1 = useRef<HTMLDivElement>(null)
    const ref2 = useRef<HTMLDivElement>(null)
    const ref3 = useRef<HTMLDivElement>(null)

    const svgRef = useRef<SVGSVGElement>(null)
    const path1 = useRef<SVGPathElement>(null)
    const path2 = useRef<SVGPathElement>(null)

    const buildCurve = (from: HTMLElement, to: HTMLElement, svg: SVGSVGElement) => {
        const a = from.getBoundingClientRect()
        const b = to.getBoundingClientRect()
        
        const svgRect = svg.getBoundingClientRect()
        
        const startX = a.left + a.width / 2 - svgRect.left - 150
        const startY = a.top + a.height / 2 - svgRect.top - 100
        
        const endX = b.left + b.width / 2 - svgRect.left - 150
        const endY = b.top + b.height / 2 - svgRect.top

        const controlX = (startX + endX) / 2 + 350
        const controlY = Math.min(startY, endY) + 100

        return `M ${startX} ${startY}
                Q ${controlX} ${controlY}
                ${endX} ${endY}`
    }


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
    }, [])



    return (
        <div className="container about">
            <h2 className="title">ABOUT ME</h2>

            <div className="illustationContainer">

                <div className="uzbContainer" ref={ref1}>
                    <img src={uzbIsland} alt="Uzbekistan" />
                    <img className="uzbFlag" src={uzbFlag} alt="Uzbekistan" />
                    <div className="uzbTextContainer">
                        <p className="uzbText">Year of birth: 2004</p>
                        <p className="uzbText">
                            Place of birth: <span className="uzbBlue">Uzb</span><span className="uzbWhite">eki</span><span className="uzbGreen">stan</span>
                        </p>
                    </div>
                </div>

                <div className="mskContainer" ref={ref2}>
                    <img src={photoMsk} alt="Moscow" />
                    <img className="mskFlag" src={ruFlag} alt="Moscow" />
                    <p className="mskText">Location Moscow, <span className="ruWhite">Ru</span><span className="ruBlue">ss</span><span className="ruRed">ia</span></p>
                </div>

                <div className="kolledgeContainer" ref={ref3}>
                    <img src={kolledge} alt="kolledge" />
                    <p className="kolledgeText">Education: Konakovo Energy College, 2025</p>
                </div>

                <svg ref={svgRef} className="connections">
                    <path ref={path1} className="curve" />
                    <path ref={path2} className="curve" />
                </svg>
            </div>

            <div className="textContainer">
                <div className="workPar">
                    <h2 className="title aboutTitle">WORK EXPERIENCE</h2>
                    {
                        workExperience.map((el, index) => {
                            return (
                               <div className="workParElement">
                                    <h3 className="workParElementTitle">{el.title}</h3>
                                    <p className="aboutElementText">{el.text}</p>
                                </div> 
                            )
                        })
                    }
                </div>

                <div className="shortBio">
                    <h2 className="title aboutTitle">SHORT BIO</h2>
                    <p className="aboutElementText">{shortBio}</p>
                </div>
            </div>

            <div className="longStoryBtn">
                <img className="longStoryBg" src={longStoryBg} />
                <p className="longStoryText">MY LONG STORY, VERY VERY LONG, IF YOU INTERESTED</p>
                <p className="tip">(click)</p>
            </div>
        </div>
    )
}

export default About;