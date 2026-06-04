import React, { useState, Dispatch, SetStateAction } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ModalWrapper from "../modalWrapper";
import Input from "@/components/shared/input";
import Button from "@/components/shared/button/Button";

import type { WorkExperience } from '@/interfaces/general';

import styles from './index.module.scss';


interface SelectPeriodProps {
    data: WorkExperience[],
    setData: Dispatch<SetStateAction<WorkExperience[]>>
}


const SelectPeriod: React.FC<SelectPeriodProps> = ({ data, setData }) => {
    const currentId = useSelector((state: RootState) => state.uiState.currentId)
    const currentItem = data.find((item) => item.id === currentId);

    const getStartDate = () => {
        if (!currentItem?.workingPeriod?.startDate) return null;
        return new Date(currentItem.workingPeriod.startDate);
    };

    const getEndDate = () => {
        if (!currentItem?.workingPeriod?.endDate) return null;
        if (currentItem.workingPeriod.endDate === 'Present') return new Date();
        return new Date(currentItem.workingPeriod.endDate);
    };

    const [startDate, setStartDate] = useState<Date | null>(getStartDate());
    const [endDate, setEndDate] = useState<Date | null>(getEndDate());

    const [isStartOpen, setIsStartOpen] = useState(false);
    const [isEndOpen, setIsEndOpen] = useState(false);


    const handleStartChange = (date: Date | null) => {
        setStartDate(date);
        setIsStartOpen(false);
        
        if (date && currentItem) {
            const updatedItem = {
                ...currentItem,
                workingPeriod: {
                    ...currentItem.workingPeriod,
                    startDate: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                }
            };
            setData(prev => prev.map(item => item.id === currentId ? updatedItem : item));
        }
    };

    const handleEndChange = (date: Date | null) => {
        setEndDate(date);
        setIsEndOpen(false);
        
        if (date && currentItem) {
            const updatedItem = {
                ...currentItem,
                workingPeriod: {
                    ...currentItem.workingPeriod,
                    endDate: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                }
            };
            setData(prev => prev.map(item => item.id === currentId ? updatedItem : item));
        }
    };

    const handlePresentClick = () => {
        if (currentItem) {
            const updatedItem = {
                ...currentItem,
                workingPeriod: {
                    ...currentItem.workingPeriod,
                    endDate: 'PRESENT'
                }
            };
            setEndDate(null);
            setData(prev => prev.map(item => item.id === currentId ? updatedItem : item));
        }
    };

    return (
        <ModalWrapper
            drag={false}
            tooltipVisible={false}
            modalName='selectPeriod'

            title='Select Period'
            subTitle='Choose start and end dates'
        >
            <div className={styles.datePickers}>
                <div className={styles.datePickerWrapper}>
                    <Input 
                        name='startDate'
                        placeholder='Start date'
                        value={currentItem?.workingPeriod?.startDate || ''}
                        variant='admin'
                        iconPosition='iconLeft'
                        icon={{first: 'calendar'}}
                        adminLabel='withLabel'
                        label="START DATE"
                        onClick={() => setIsStartOpen(true)}
                    />
                    {isStartOpen && (
                        <DatePicker
                            selected={startDate}
                            onChange={handleStartChange}
                            onClickOutside={() => setIsStartOpen(false)}
                            open={isStartOpen}
                            inline
                            className={styles.datePicker}
                        />
                    )}
                </div>

                <div className={styles.datePickerWrapper}>
                    <Input 
                        name='endDate'
                        placeholder='End date'
                        value={currentItem?.workingPeriod?.endDate || ''}
                        variant='admin'
                        iconPosition='iconLeft'
                        icon={{first: 'calendar'}}
                        adminLabel='withLabel'
                        label="END DATE"
                        onClick={() => setIsEndOpen(true)}
                    />
                    {isEndOpen && (
                        <DatePicker
                            selected={endDate}
                            onChange={handleEndChange}
                            onClickOutside={() => setIsEndOpen(false)}
                            open={isEndOpen}
                            inline
                            className={styles.datePicker}
                        />
                    )}
                </div>
            </div>

            <Button
                variant="black"
                behavior="default"
                iconPosition="noIcon"
                text='PRESENT'
                onClick={handlePresentClick}
            />
        </ModalWrapper>
    )
}

export default SelectPeriod