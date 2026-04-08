import React from "react";

import IconBell from "./IconBell";
import IconTrash from "./IconTrash";


const icons = {
    bell: IconBell,
    trash: IconTrash,
}


interface IconProps {
    name: keyof typeof icons;
    strokeColor: string;
    fillColor: string;
    iconClass: string;
    size: number;
}


const Icon: React.FC<IconProps> = ({ name, strokeColor, fillColor, iconClass, size=24 }) => {
    const Component = icons[name]
    return <Component
         strokeColor={strokeColor} 
        fillColor={fillColor}
        iconClass={iconClass} 
        size={size} 
    />
} 

export default Icon;