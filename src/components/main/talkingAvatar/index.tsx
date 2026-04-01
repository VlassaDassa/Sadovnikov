import React from 'react';

import avatarPic from './../../../assets/images/main/avatar_without_jaw.png';
import jawPic from './../../../assets/images/main/jaw.png';
import indexFingerPic from './../../../assets/images/main/index_finger.png';
import handPic from './../../../assets/images/main/hand.png';
import cloudPic from './../../../assets/images/main/cloud.png';

import './index.scss';

interface TalkingAvatarProps {
    hand: boolean,
    indexFinger: boolean,
    text: string,
}


const TalkingAvatar: React.FC<TalkingAvatarProps> = (props) => {
    const {hand, indexFinger, text} = props;
    
    return (
        <div className="talkingAvatarWrapper">
            <img className="avatarPic" src={avatarPic} alt="Photo of developer" aria-hidden='true' />
            <img className="jawPic" src={jawPic} alt="" aria-hidden='true' />

            {
                indexFinger ? <img className="indexFingerPic" src={indexFingerPic} alt="" aria-hidden='true' /> : null
            }
            {
                hand ? <img className="handPic" src={handPic} alt="" aria-hidden='true' /> : null
            }
            
            
            <div className="cloudWrapper">
                <img className="cloudPic" src={cloudPic} alt="" aria-label={text} />
                <p className="body-24-mont-semi_bold cloudText">{text}</p>
            </div>
        </div>
    )
} 

export default TalkingAvatar;