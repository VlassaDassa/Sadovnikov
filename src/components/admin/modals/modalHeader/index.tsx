import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import Icon from '@/components/shared/icons/Icon';

import { cssVars } from '@/styles/cssVariables';
import styles from './index.module.scss';


interface ModalHeaderProps {
    title: string;
    subTitle: string;
    icon?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, subTitle, icon }) => {
    const breakpoint = useSelector((state: RootState) => state.breakpoint.value)

    const sizeIcon = breakpoint === 'desktop' ? 32 : 24

    return (
        <div className={styles.modalHeader}>
            {icon && 
                <div className={styles.icon}>
                    <Icon 
                        name={icon}
                        strokeColor={cssVars.white}
                        iconClass={`icon-btn ${styles.iconArrowLeft}`}
                        size={sizeIcon}
                    />
                    <Icon 
                        name={icon}
                        strokeColor={cssVars.white}
                        iconClass={`icon-btn ${styles.iconArrowRight}`}
                        size={sizeIcon}
                    />
                </div>
            }
            <div className={styles.wrapper}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subTitle}>{subTitle}</p>
            </div>
        </div>
    );
}

export default ModalHeader;