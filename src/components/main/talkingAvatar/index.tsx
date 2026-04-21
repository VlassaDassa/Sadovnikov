import React from 'react';

import style from './index.module.scss';

interface TalkingAvatarProps {
    hand: boolean,
    indexFinger: boolean,
    text: string,
}

const avatarPic = '/images/main/avatar_without_jaw.png';
const jawPic = '/images/main/jaw.png';
const indexFingerPic = '/images/main/index_finger.png';
const handPic = '/images/main/hand.png';
const cloudPic = '/images/main/cloud.png';



const TalkingAvatar: React.FC<TalkingAvatarProps> = (props) => {
    const {hand, indexFinger, text} = props;
    
    return (
        <div className={style.talkingAvatarWrapper}>
            <img className={style.avatarPic} src={avatarPic} alt="Photo of developer" aria-hidden='true' />
            <img className={style.jawPic} src={jawPic} alt="" aria-hidden='true' />

            {
                indexFinger ? <img className={style.indexFingerPic} src={indexFingerPic} alt="" aria-hidden='true' /> : null
            }
            {
                hand ? <img className={style.handPic} src={handPic} alt="" aria-hidden='true' /> : null
            }
            
            
            <div className={style.cloudWrapper}>
                <img className={style.cloudPic} src={cloudPic} alt="" aria-label={text} />
                <p className={style.cloudText}>{text}</p>
            </div>
        </div>
    )
} 

export default TalkingAvatar;