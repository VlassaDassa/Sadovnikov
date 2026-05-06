'use client'

import { useSelector } from "react-redux"
import { RootState } from "@/store"
import Tooltip from "../Tooltip"
import styles from './index.module.scss';


const GlobalTooltip = () => {
    const { isVisible, text, title, date, type, position } = useSelector(
        (state: RootState) => state.tooltip
    )

    if (!isVisible) return null;

    return (
        <div 
            className={styles.globalTooltip}
            style={{
                position: 'fixed',
                top: position.top,
                left: position.left,
                zIndex: 9
            }}
        >
            <Tooltip text={text} title={title} date={date} type={type} />
        </div>
    )
}

export default GlobalTooltip;
