import React, { useState } from 'react';

import AutoResizeTextarea from '../AutoResizeTextarea';

import btnBg from './../../assets/images/textBox.png';

import './index.scss';


const Contacts: React.FC = () => {
    const [message, setMessage] = useState<string>('')

    const handleMessage = (value: string) => {
        setMessage(value)
    }


    return (
        <section className="container contacts">
            <h2 className="title">Contacts</h2>

            <form className="contactsForm" action="#">
                <div className="fieldsContainer">
                    <input className="contactsField" type="email" placeholder='Email' />
                    <input className="contactsField" type="text" placeholder='Name'/>
                    <AutoResizeTextarea 
                        value={message}
                        onChange={handleMessage}
                        placeholder="Your message..."
                    />
                </div>
                
                <div className="contactsSubmitBtn">
                    <img src={btnBg} />
                    <p className="contactsSubmitBtnText">Send</p>
                </div>
            </form>
        </section>
    )
}

export default Contacts;