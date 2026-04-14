import React, { useState } from 'react';

import Input from '../../general/input';
import DecorButton from '../../general/button/DecorButton';

import type { Breakpoint } from '../../../interfaces/general';

import './index.scss';



interface ContactsProps {
    breakpoint: Breakpoint
}


const Contacts: React.FC<ContactsProps> = ({ breakpoint }) => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [error, setError] = useState<string>('')


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }


    return (
        <section className="container contacts">
            
            <h2 className="body-24-magra-bold sectionTitle whiteText">CONTACTS</h2>

            <form className='contactForm'>
                <div className="formContent">
                    <Input 
                        name='name'
                        placeholder='Name...'
                        value={name}
                        icon={ {first: 'trash', second: 'bell'} }
                        iconPosition='iconBoth'
                        error={'Error'}
                        onChange={handleNameChange}
                        breakpoint={breakpoint}
                    />

                    <Input 
                        name='email'
                        placeholder='Email...'
                        type='email'
                        value={email}
                        icon={ {first: 'trash', second: 'bell'} }
                        iconPosition='iconBoth'
                        error={'Error'}
                        onChange={handleEmailChange}
                        breakpoint={breakpoint}
                    />

                    <Input 
                        name='message'
                        placeholder='Message...'
                        value={message}
                        icon={ {first: 'trash', second: 'bell'} }
                        iconPosition='iconBoth'
                        error={'Error'}
                        onChange={handleMessageChange}
                        breakpoint={breakpoint}
                    />

                    <DecorButton 
                        behavior='default'
                        variant='medium'
                        text={ {default: 'Send', alter: 'Button'} }
                        additionalClass='contactFormBtn'
                        breakpoint={breakpoint}
                    />
                </div>
            </form>

            


        </section>
    )
}

export default Contacts;