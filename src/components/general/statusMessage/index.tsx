import React from 'react';

import './index.scss';


interface StatusMessageProps {
    type: 'info' | 'warning' | 'error',
    text: string,
    isShow: boolean
}

const StatusMessage: React.FC<StatusMessageProps> = ({ type, text, isShow }) => (
    <p className={`statusMessage statusMessage-${isShow ? 'show' : ''} statusMessage-${type}`}>{text}</p>
);

export default StatusMessage;