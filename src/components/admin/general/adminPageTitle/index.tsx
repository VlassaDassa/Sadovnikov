import React from "react";
import Link from "next/link";

import Icon from "@/components/shared/icons/Icon";

import { cssVars } from "@/styles/cssVariables";
import styles from './index.module.scss';


interface AdminPageTitleProps {
    title: string,
    text: string,
    icon: string,
    className?: string,
}


const AdminPageTitle: React.FC<AdminPageTitleProps> = ({title, text, icon, className}) => {
    return (
        
        <div className={`${styles.titleWrapper} ${className}`}>
            <Link className={styles.btnBack} href='/admin'>
                ← Back
            </Link>

            <div className={styles.content}>
                <div className={styles.icon}>
                    <Icon 
                        name={icon}
                        strokeColor={cssVars.white}
                        fillColor={cssVars.white}
                        size={33}
                    />
                </div>

                <div className={styles.textWrapper}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.text}>{text}</p>
                </div>
            </div>
            
        </div>
    )
}

export default AdminPageTitle;