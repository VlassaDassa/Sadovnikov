import React from 'react';


interface NoizeProps {
    className?: string;
}

const Noize: React.FC<NoizeProps> = ({ className }) => {
    return (
        <div className={`noize ${className}`} aria-hidden="true" />
    )
}

export default Noize;