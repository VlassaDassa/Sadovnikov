'use client'

import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';

import style from './index.module.scss';



const StatusMessage: React.FC = () => {
    const isShow = useSelector((state: RootState) => state.message.isShow)
    const type = useSelector((state: RootState) => state.message.type)
    const text = useSelector((state: RootState) => state.message.text)
    
    return (
    <p className={`${style.statusMessage} 
        ${style[`statusMessage-${isShow ? 'show' : ''}`]}
        ${style[`statusMessage-${type}`]}
    `}>{text}</p>
)};

export default StatusMessage;