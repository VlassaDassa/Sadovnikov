import React from 'react';
import { useDispatch } from 'react-redux';

import ModalBackground from '@/components/admin/general/modalBackground';
import ModalHeader from '../../general/modalHeader';
import Button from '@/components/shared/button/Button';
import DragHandler from '../dragHandler';
import Input from '@/components/shared/input';

import { footerItems } from '@/mockData/footer';
import { closeModals } from '@/lib/modals';

import styles from './index.module.scss';
import AdaptiveImage from '@/components/shared/AdaptiveImage';



const EditFooterModal: React.FC = () => {
    const dispatch = useDispatch()


    return (
        <ModalBackground
            className={styles.modalBackground}
        >
            <Button
                variant="black"
                behavior="default"
                iconPosition="only"
                icon="close"
                onClick={() => closeModals(dispatch, 'editFooter')}
                additionalClass={styles.closeButton}
            />

            <ModalHeader 
                title='Edit Footer'
                subTitle='Customize the footer content and links'
                icon='arrow'
            />

            <div className={styles.content}>
                {
                    footerItems.map((item) => (
                        <div className={`${styles.item} modalElementBg`}>

                            <DragHandler 
                                variant='small'
                                additionalClass={styles.dragHand}

                            />

                            <div className={styles.inputs}>
                                <Input 
                                    name={item.text}
                                    placeholder='Text...'
                                    additionalClass={styles.input}
                                    type='text'
                                    iconPosition='noIcon'
                                    value={item.text}
                                    variant='admin'
                                    adminLabel='withoutLabel'
                                />

                                <Input 
                                    name={item.text}
                                    placeholder='Link (optional)'
                                    additionalClass={`${styles.input} ${styles.linkInput}`}
                                    type='text'
                                    iconPosition='noIcon'
                                    value={item.link || ''}
                                    variant='admin'
                                    adminLabel='withoutLabel'
                                />


                                <div className={styles.iconBtnWrapper}>
                                    <AdaptiveImage 
                                        src={item.icon}
                                        wrapClass={styles.iconBtn}
                                    />
                                </div>
                            </div>


                            <Button
                                variant="black"
                                behavior="default"
                                iconPosition="only"
                                icon="trash"
                                // onClick={() => deleteItem(skill.id)}
                                additionalClass={styles.deleteBtn}
                            />
                        </div>
                    ))
                }
            </div>
        </ModalBackground>
    )
}

export default EditFooterModal;