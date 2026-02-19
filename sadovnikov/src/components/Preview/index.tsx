import React from 'react';

import './index.scss';

import photoBg from './../../assets/images/photoBg.png';
import photo from './../../assets/images/photo.png';
import hand from './../../assets/images/hand.png';



const Preview: React.FC = () => {
    return (
        <section className="preview container">
            <h1 className="specialization">FRONTEND DEVELOPER</h1>

            <img className="specHand" src={hand} alt="illustation" />

            <div className="photoContainer">
                <img src={photoBg} alt="photo" />
                <img className="photo" src={photo} alt="photo" />
            </div>


            <svg className="dotted-hand-line" viewBox="0 -10 900 100" preserveAspectRatio="none">
            <path d="M0,50 Q150,30 300,70 T600,30 T900,70 T1200,10" 
                    fill="none" 
                    stroke="#6870FF" 
                    stroke-width="4" 
                    stroke-dasharray="10" 
                    stroke-linecap="round"/>
            </svg>
        </section>
    )
}

export default Preview;