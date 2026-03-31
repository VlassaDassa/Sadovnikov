import React from 'react';

import avatarFrame from './../../assets/images/main/avatar_frame.png';
import avatar from './../../assets/images/main/avatar.png';
import bgAvatar from './../../assets/images/main/bg_avatar.png';


import './index.scss';



const Preview: React.FC = () => {
    return (
        <section className="preview container">
            <h1 className="heading-32-magra-bold whiteText">FRONTEND DEVELOPER</h1>

            <div className="avatarWrapper">
                <img className="bgAvatar" src={bgAvatar} alt="Photo of developer" />
                <img className="previewAvatar" src={avatar} alt="Photo of developer" />
                <img className="avatarFrame" src={avatarFrame} alt="Photo of developer" />

                <p className="frameName body-20-magra-regular blackText">SADOVNIKOV<br />VLAD</p>
            </div>
        </section>
    )
}


export default Preview;