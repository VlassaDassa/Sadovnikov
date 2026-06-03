import React, { useState } from "react";

import ModalWrapper from "../modalWrapper";
import Input from "@/components/shared/input";
import Button from "@/components/shared/button/Button";

import styles from './index.module.scss';



const SelectPeriod: React.FC = () => {
    const [startDate, setStartDate] = useState<string>('June, 2022')
    const [endDate, setEndDate] = useState<string>('June, 2026')


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
                placeholder='Text...'
                value={startDate}
                variant='admin'
                iconPosition='iconLeft'
                icon={{first: 'calendar'}}
                adminLabel='withLabel'
                label="START DATE"
            />

            <Input 
                name='endDate'
                placeholder='Text...'
                value={endDate}
                variant='admin'
                iconPosition='iconLeft'
                icon={{first: 'calendar'}}
                adminLabel='withLabel'
                label="END DATE"
            />

            <Button
                variant="black"
                behavior="default"
                iconPosition="noIcon"
                text='PRESENT'
            />
        </ModalWrapper>
    )
}

export default SelectPeriod