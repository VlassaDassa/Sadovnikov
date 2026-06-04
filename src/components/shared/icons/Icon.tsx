import React from "react";

import IconBell from "./IconBell";
import IconTrash from "./IconTrash";
import IconLoader from "./IconLoader";
import IconTelegram from "./IconTelegram";
import IconPhone from "./IconPhone";
import IconEmail from "./IconEmail";
import IconHome from "./IconHome";
import IconLink from "./IconLink";
import IconCalendar from "./IconCalendar";
import IconTime from "./IconTime";
import IconPerson from "./IconPerson";
import IconGitHub from "./IconGitHub";
import IconInternet from "./IconInternet";
import IconFlag from "./IconFlag";
import IconPuzzle from "./IconPuzzle";
import IconRocket from "./IconRocket";
import IconText from "./IconText";
import IconArrow from "./IconArrow";
import IconAccessibility from "./IconAccessibility";
import IconLoadTime from "./IconLoadTime";
import IconSearch from "./IconSearch";
import IconSpeed from "./IconSpeed";
import IconPen from "./IconPen";
import IconPlus from "./IconPlus";
import IconClose from "./IconClose";
import IconMathPlus from "./IconMathPlus";
import IconMathMinus from "./IconMathMinus";
import IconSettings from "./IconSettings";



const icons = {
    bell: IconBell,
    trash: IconTrash,
    loader: IconLoader,
    telegram: IconTelegram,
    phone: IconPhone,
    email: IconEmail,
    home: IconHome,
    link: IconLink,
    person: IconPerson,
    time: IconTime,
    calendar: IconCalendar,
    github: IconGitHub,
    internet: IconInternet,
    text: IconText,
    rocket: IconRocket,
    flag: IconFlag,
    puzzle: IconPuzzle,
    arrow: IconArrow,
    accessibility: IconAccessibility,
    loadTime: IconLoadTime,
    search: IconSearch,
    speed: IconSpeed,
    pen: IconPen,
    plus: IconPlus,
    close: IconClose,
    mathPlus: IconMathPlus,
    mathMinus: IconMathMinus,
    settings: IconSettings,
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