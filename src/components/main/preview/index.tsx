import React from 'react';

import style from './index.module.scss';

import { cssVars } from '@/styles/cssVariables';

const avatarFrame = '/images/main/avatar_frame.png'
const avatar = '/images/main/avatar.png'
const bgAvatar = '/images/main/bg_avatar.png'
const hand = '/images/main/hand.png'




const Preview: React.FC = () => {
    return (
        <section className={`${style.preview} container`}>
            <h1 className={style.previewTitle}>FRONTEND DEVELOPER</h1>
            <img className={style.hand} src={hand} alt="" aria-hidden='true' />

            <div className={style.avatarWrapper}>
                <img className={style.bgAvatar} src={bgAvatar} alt="Photo of developer" />
                <img className={style.previewAvatar} src={avatar} alt="Photo of developer" />
                <img className={style.avatarFrame} src={avatarFrame} alt="Photo of developer" />

                <p className={style.frameName}>SADOVNIKOV<br />VLAD</p>
            </div>

            <svg className={style['dotted-hand-line']} viewBox="0 -10 900 100" preserveAspectRatio="none">
            <path d="M0,50 Q150,30 300,70 T600,30 T900,70 T1200,10" 
                    fill="none" 
                    stroke={cssVars.brand_700}
                    strokeWidth="4" 
                    strokeDasharray="10" 
                    strokeLinecap="round"/>
            </svg>
        </section>
    )
}


export default Preview;




