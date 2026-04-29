'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Input from '../../general/input';
import DecorButton from '../../general/button/DecorButton';
    
import TalkingAvatar from '../talkingAvatar';

import { setTypeMessage, setTextMessage, toggleMessage } from '@/store/slices/messageSlice';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

import styles from './index.module.scss';



interface Errors {
    name: string,
    email: string,
    message: string
}


const Contacts: React.FC= () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [btnBehavior, setBtnBehavior] = useState<'default' | 'loading' | 'disabled'>('disabled')
    const [error, setError] = useState<Errors>({
        name: '',
        email: '',
        message: ''
    })
    const isFirstRender = useRef(true);

    const { isVisible, elementRef } = useScrollAnimation<HTMLDivElement>({
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    })

    const dispatch = useDispatch()



    useEffect(() => {
        // Пропуск валидации при первом рендере
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; 
        }

        if (btnBehavior === 'loading') {
            return
        }

        validateForm()
    }, [name, email, message])

    
    const validateForm = () => {
        let isValid = true
        const newErrors = {name: '', email: '', message: ''}

        // Проверка имени
        if (name.length < 5 || name.length >= 10) {
            newErrors.name = 'Имя должно быть от 5 до 10 символов'
            isValid = false
        }
       

        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.email = 'Некорректный email'
            isValid = false
        }
        
        // Проверка сообщения
        if (message.length < 100 || message.length > 300) {
            newErrors.message = 'Сообщение должно быть от 100 до 300 символов'
            isValid = false
        }

        if (isValid) {
            setBtnBehavior('default')
        }
        else {
            setBtnBehavior('disabled')
        }
        
        
        setError(newErrors)
    }


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(e.target.value)
    }

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }

    const submitForm = (e: React.MouseEvent<HTMLDivElement>) => {
        // Временная заглушка
        setName('')
        setEmail('')
        setMessage('')

        dispatch(setTypeMessage('error'))
        dispatch(setTextMessage('Error on sending message'))
        

        setBtnBehavior('loading')
        setTimeout(() => {
            setBtnBehavior('disabled')

            dispatch(toggleMessage())


            setTimeout(() => {
                dispatch(toggleMessage())
            }, 3000)
        }, 3000)
    }


    return (
        <section className={`container ${styles.contacts}`}>
            
            <h2 className={`${styles.contactsTitle} sectionTitle`}>CONTACTS</h2>

            <form>
                <div className={styles.formContent}>
                    <Input 
                        name='name'
                        placeholder='Name...'
                        value={name}
                        iconPosition='noIcon'
                        error={error.name}
                        onChange={handleNameChange}
                    />

                    <Input 
                        name='email'
                        placeholder='Email...'
                        type='email'
                        value={email}
                        iconPosition='noIcon'
                        error={error.email}
                        onChange={handleEmailChange}
                    />

                    <Input 
                        name='message'
                        placeholder='Message...'
                        value={message}
                        type='textarea'
                        iconPosition='noIcon'
                        error={error.message}
                        onChange={handleMessageChange}
                        maxLen={300}
                    />

                    <DecorButton 
                        behavior={btnBehavior}
                        variant='medium'
                        text={ {default: 'Send', alter: 'Send'} }
                        additionalClass={styles.contactFormBtn}
                        onClick={submitForm}
                    />
                </div>
            </form>

            <TalkingAvatar 
                ref={elementRef}
                hand={false}
                indexFinger={false}
                text={"I'm waiting for your messages"}
                additionalClass={`${styles.avatar} ${isVisible ? styles['avatar-anim'] : ''}`}
            />
        </section>
    )
}

export default Contacts;