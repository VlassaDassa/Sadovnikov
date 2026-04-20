import React from 'react';

import style from './index.module.scss';


interface StatusMessageProps {
    type: 'info' | 'warning' | 'error',
    text: string,
    isShow: boolean
}

const StatusMessage: React.FC<StatusMessageProps> = ({ type, text, isShow }) => (
    <p className={`${style.statusMessage} 
        ${style[`statusMessage-${isShow ? 'show' : ''}`]} 
        ${style[`statusMessage-${type}`]}
    `}>{text}</p>
);

export default StatusMessage;