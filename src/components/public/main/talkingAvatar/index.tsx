import { forwardRef } from 'react';

import AdaptiveImage from '@/components/shared/AdaptiveImage';

import style from './index.module.scss';

interface TalkingAvatarProps {
    hand: boolean,
    indexFinger: boolean,
    text: string,
    additionalClass?: string,
}

const avatarPic = '/images/main/avatar_without_jaw.png';
const jawPic = '/images/main/jaw.png';
const indexFingerPic = '/images/main/index_finger.png';
const handPic = '/images/main/hand.png';
const cloudPic = '/images/main/cloud.png';



const TalkingAvatar = forwardRef<HTMLDivElement, TalkingAvatarProps>(
    ({ hand, indexFinger, text, additionalClass }, ref) => {
    
    return (
        <div ref={ref} className={`${style.talkingAvatarWrapper} ${additionalClass}`}>
            <AdaptiveImage 
                src={avatarPic}
                wrapClass={style.avatarPic}
                alt="Photo of developer"
            />
            <AdaptiveImage 
                src={jawPic}
                wrapClass={style.jawPic}
                alt="Photo of developer"
            />

            {
                indexFinger ? <AdaptiveImage src={indexFingerPic} wrapClass={style.indexFingerPic} alt="Photo of developer" /> : null
            }
            {
                hand ? <AdaptiveImage src={handPic} wrapClass={style.handPic} alt="Photo of developer" /> : null 
            }
            
            
            <div className={style.cloudWrapper}>
                <AdaptiveImage src={cloudPic} wrapClass={style.cloudPic} alt="Photo of developer" aria-label={text} />
                <p className={style.cloudText}>{text}</p>
            </div>
        </div>
    )
})

export default TalkingAvatar;