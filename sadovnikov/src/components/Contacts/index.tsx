import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

import AutoResizeTextarea from '../AutoResizeTextarea';

import jawPhoto from './../../assets/images/jawPhoto.png';
import jaw from './../../assets/images/jaw.png';
import cloud from './../../assets/images/cloud.png';
import btnBg from './../../assets/images/textBox.png';

import './index.scss';

interface IErrors {
    email: string;
    name: string;
    message: string;
}

const Contacts: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');

    const [debouncedEmail] = useDebounce(email, 500);
    const [debouncedName] = useDebounce(name, 500);
    const [debouncedMessage] = useDebounce(message, 500);

    const [disableBtn, setDisableBtn] = useState<boolean>(false);
    const [errors, setErrors] = useState<IErrors>({
        email: '',
        name: '',
        message: ''
    });

    useEffect(() => {
        const getEmailError = (): string => {
            if (!debouncedEmail) return '';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(debouncedEmail) ? '' : 'Incorrect format';
        };

        const getNameError = (): string => {
            if (!debouncedName) return '';
            return debouncedName.length < 5 || debouncedName.length > 10
                ? 'The name most contain more than 5 and less than 10 characters'
                : '';
        };

        const getMessageError = (): string => {
            if (!debouncedMessage) return '';
            return debouncedMessage.length < 30 || debouncedMessage.length > 200
                ? 'The message most contain more than 30 and less than 200 characters'
                : '';
        };

        const newErrors = {
            email: getEmailError(),
            name: getNameError(),
            message: getMessageError()
        };

        setErrors(newErrors);

        const hasNoErrors = Object.values(newErrors).every(value => value === '');
        const hasContent = 
            debouncedMessage?.length > 1 && 
            debouncedName?.length > 1 && 
            debouncedEmail?.length > 1;

        setDisableBtn(hasNoErrors && hasContent);
    }, [debouncedMessage, debouncedEmail, debouncedName]);

    const handleMessage = (value: string) => {
        setMessage(value);
    };

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleClickBtn = (e: React.MouseEvent<HTMLDivElement>) => {
        if (disableBtn) {
            console.log('Send data to email')

            setMessage('')
            setEmail('')
            setName('')
            setDisableBtn(false)
            setErrors({
                        email: '',
                        name: '',
                        message: ''
                    })
        }
    }

    return (
        <section className="container contacts">
            <h2 className="title">Contacts</h2>

            <form className="contactsForm" action="#">
                <div className="fieldsContainer">
                    <input 
                        className={errors.email.length === 0 ? 'contactsField' : 'contactsField contactsField--error'} 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={handleEmail} 
                    />
                    <input 
                        className={errors.name.length === 0 ? 'contactsField' : 'contactsField contactsField--error'} 
                        type="text" 
                        placeholder="Name" 
                        value={name}
                        onChange={handleName} 
                    />
                    <AutoResizeTextarea 
                        value={message}
                        onChange={handleMessage}
                        placeholder="Your message..."
                        className={errors.message.length === 0 ? 'contactsField' : 'contactsField contactsField--error'}
                    />
                </div>

                <div onClick={handleClickBtn} className="contactsSubmitBtn">
                    <img src={btnBg} alt="button background" />
                    <p className={!disableBtn ? 'contactsSubmitBtnText contactsSubmitBtnText--error' : 'contactsSubmitBtnText'}>
                        Send
                    </p>
                </div>
            </form>

            <div className="characterContainer">
                <img className="skillCharacter" src={jawPhoto} alt="character" />
                <img className="skillJaw" src={jaw} alt="character" />

                <div className="skillDialog">
                    <img className="skillCloud" src={cloud} alt="character" />
                    <p className="skillTextCloud">I'm waiting for your messages</p>
                </div>
            </div>
        </section>
    );
};

export default Contacts;