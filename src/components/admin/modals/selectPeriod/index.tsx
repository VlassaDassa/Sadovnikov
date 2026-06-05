import React, { useState, Dispatch, SetStateAction } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ModalWrapper from "../modalWrapper";
import Input from "@/components/shared/input";
import Button from "@/components/shared/button/Button";

import type { WorkExperience } from '@/interfaces/general';

import { displayDate, parseDate } from "@/lib/dates";

import styles from './index.module.scss';


interface SelectPeriodProps {
    data: WorkExperience[],
    setData: Dispatch<SetStateAction<WorkExperience[]>>
}


const SelectPeriod: React.FC<SelectPeriodProps> = ({ data, setData }) => {
    const currentId = useSelector((state: RootState) => state.uiState.currentId)
    const currentItem = data.find((item) => item.id === currentId);


    const handleStartChange = (date: string) => {
        if (date && currentItem) {
            const updatedItem = {
                ...currentItem,
                workingPeriod: {
                    ...currentItem.workingPeriod,
                    startDate: date
                }
            };
            setData(prev => prev.map(item => item.id === currentId ? updatedItem : item));
        }
    };

    const handleEndChange = (date: string) => {
        if (date && currentItem) {
            const updatedItem = {
                ...currentItem,
                workingPeriod: {
                    ...currentItem.workingPeriod,
                    endDate: date
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
            <Input 
                name='startDate'
                placeholder='Start date'
                variant='admin'
                value={displayDate(currentItem?.workingPeriod?.startDate)}
                iconPosition='iconLeft'
                icon={{first:'calendar'}}
                adminLabel='withLabel'
                readonly={true}
                datePickerChange={handleStartChange}
                label="START DATE"

                datePicker={true}   
            />

            <Input 
                name='endDate'
                placeholder='End date'
                value={displayDate(currentItem?.workingPeriod?.endDate)}
                datePickerChange={handleEndChange}
                variant='admin'
                iconPosition='iconLeft'
                icon={{first: 'calendar'}}
                adminLabel='withLabel'
                readonly={true}
                label="END DATE"
                datePicker={true} 
            />
                
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