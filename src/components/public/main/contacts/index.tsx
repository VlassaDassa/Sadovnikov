'use client'

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';

import Input from '../../../shared/input';
import DecorButton from '../../../shared/button/DecorButton';
    
import TalkingAvatar from '../talkingAvatar';

import { setTypeMessage, setTextMessage, toggleMessage } from '@/store/slices/messageSlice';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { sendContactMessage } from '@/app/actions/contact/sendContactMessage';
import { showMessage } from '@/lib/showMessage';

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
    const [isFirstRender, setIsFirstRender] = useState(true);

    const { isVisible, elementRef } = useScrollAnimation<HTMLDivElement>({
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    })

    const dispatch = useDispatch()
    const pathname = usePathname();


    useEffect(() => {
        setIsFirstRender(true);
    }, [pathname]);



    useEffect(() => {
        // Пропуск валидации при первом рендере
        if (isFirstRender) {
            setIsFirstRender(false);
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
        if (message.length < 10 || message.length > 300) {
            newErrors.message = 'Сообщение должно быть от 10 до 300 символов'
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
    

    const submitForm = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()

        if (btnBehavior !== 'default') {
            return
        }

        setBtnBehavior('loading')

        const result = await sendContactMessage({
            name, email, message
        })

        if (!result.success) {
            showMessage('error', 'Error on sending message', dispatch)
            setBtnBehavior('default')
        }
        else {
            showMessage('info', 'Message sent successfuly!', dispatch)
            setBtnBehavior('disabled')
        }
        
        setName('')
        setEmail('')
        setMessage('')
    }


    return (
        <section id='contacts' className={`container ${styles.contacts}`}>
            
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