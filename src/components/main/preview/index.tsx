import React from 'react';

import style from './index.module.scss';

const avatarFrame = '/images/main/avatar_frame.png'
const avatar = '/images/main/avatar.png'
const bgAvatar = '/images/main/bg_avatar.png'




const Preview: React.FC = () => {
    return (
        <section className={`${style.preview} container`}>
            <h1 className={style.previewTitle}>FRONTEND DEVELOPER</h1>

            <div className={style.avatarWrapper}>
                <img className={style.bgAvatar} src={bgAvatar} alt="Photo of developer" />
                <img className={style.previewAvatar} src={avatar} alt="Photo of developer" />
                <img className={style.avatarFrame} src={avatarFrame} alt="Photo of developer" />

                <p className={style.frameName}>SADOVNIKOV<br />VLAD</p>
            </div>
        </section>
    )
}


export default Preview;