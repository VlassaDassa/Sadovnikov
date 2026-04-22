import React from "react";

import IconBell from "./IconBell";
import IconTrash from "./IconTrash";
import IconLoader from "./IconLoader";
import IconTelegram from "./IconTelegram";
import IconPhone from "./IconPhone";
import IconEmail from "./IconEmail";
import IconHome from "./IconHome";
import IconLink from "./IconLink";


const icons = {
    bell: IconBell,
    trash: IconTrash,
    loader: IconLoader,
    telegram: IconTelegram,
    phone: IconPhone,
    email: IconEmail,
    home: IconHome,
    link: IconLink,
}


interface IconProps {
    name: string;
    strokeColor?: string;
    fillColor?: string;
    iconClass?: string;
    size?: number;
}


const Icon: React.FC<IconProps> = ({ name, strokeColor, fillColor, iconClass, size=24 }) => {
    const Component = icons[name as keyof typeof icons]
    return <Component
        strokeColor={strokeColor} 
        fillColor={fillColor}
        iconClass={`${iconClass} ${name === 'loader' ? 'icon-btn-loader' : null}`} 
        size={size} 
    />
} 

export default Icon;