import React from 'react';

import contactData from '../../mockData/footer';

import './index.scss';



const Footer: React.FC = () => {
    return (
        <footer className="container footer">
            {Object.values(contactData).map((element, index) => {
                return (
                    <React.Fragment key={element.text}>
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
                    </React.Fragment>
                    
                )
            })}
        </footer>
    )
} 


export default Footer;