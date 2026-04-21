import React, { useState, useEffect, useRef } from 'react';

import Input from '../../general/input';
import DecorButton from '../../general/button/DecorButton';
import StatusMessage from '../../general/statusMessage';

import type { Breakpoint } from '@/interfaces/general';

import styles from './index.module.scss';



interface ContactsProps {
    breakpoint: Breakpoint
}

interface Errors {
    name: string,
    email: string,
    message: string
}


const Contacts: React.FC<ContactsProps> = ({ breakpoint }) => {
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
    const [statusMessageShow, setStatusMessageShow] = useState<boolean>(false)
    const [statusMessageType, setStatusMessageType] = useState<'info' | 'warning' | 'error'>('info')
    const [statusMessageText, setStatusMessageText] = useState<string>('Sent')



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

        setStatusMessageText('Error on sending message')
        
        setStatusMessageType('error')

        setBtnBehavior('loading')
        setTimeout(() => {
            setBtnBehavior('disabled')

            setStatusMessageShow(true)


            setTimeout(() => {
                setStatusMessageShow(false)
            }, 3000)
        }, 3000)
        
        
    }


    return (
        <section className={`container ${styles.contacts}`}>
            
            <h2 className={`${styles.contactsTitle} sectionTitle`}>CONTACTS</h2>

            <StatusMessage 
                text={statusMessageText}
                type={statusMessageType}
                isShow={statusMessageShow} 
            
            />

            <form>
                <div className={styles.formContent}>
                    <Input 
                        name='name'
                        placeholder='Name...'
                        value={name}
                        iconPosition='noIcon'
                        error={error.name}
                        onChange={handleNameChange}
                        breakpoint={breakpoint}
                    />

                    <Input 
                        name='email'
                        placeholder='Email...'
                        type='email'
                        value={email}
                        iconPosition='noIcon'
                        error={error.email}
                        onChange={handleEmailChange}
                        breakpoint={breakpoint}
                    />

                    <Input 
                        name='message'
                        placeholder='Message...'
                        value={message}
                        type='textarea'
                        iconPosition='noIcon'
                        error={error.message}
                        onChange={handleMessageChange}
                        breakpoint={breakpoint}
                        maxLen={300}
                    />

                    <DecorButton 
                        behavior={btnBehavior}
                        variant='medium'
                        text={ {default: 'Send', alter: 'Send'} }
                        additionalClass={styles.contactFormBtn}
                        breakpoint={breakpoint}
                        onClick={submitForm}
                    />
                </div>
            </form>
        </section>
    )
}

export default Contacts;