import React from 'react';

import contactData from '../../mockData/footer';

import './index.scss';



const Footer: React.FC = () => {
    return (
        <footer className="container footer">
            {Object.values(contactData).map((element, index) => {
                return (
                    <>
                        {
                            element.href ? 
                                <a className="footerElement" href={element.href}>
                                    <img src={element.icon} alt={element.alt} className="footerImg" />
                                    <p className="footerText">{element.text}</p>
                                </a> 
                            :
                                <div className="footerElement">
                                    <img src={element.icon} alt={element.alt} className="footerImg" />
                                    <p className="footerText">{element.text}</p>
                                </div> 
                        }
                    </>
                    
                )
            })}
        </footer>
    )
} 


export default Footer;