import tgIcon from './../assets/images/tgIcon.svg';
import phoneIcon from './../assets/images/phoneIcon.svg';
import emailIcon from './../assets/images/emailIcon.svg';



interface IContactItem {
    icon: string;
    text: string;
    alt: string;
    href?: string;
}


interface IContacts {
    telegram: IContactItem,
    phone: IContactItem,
    email: IContactItem
}


const contactData: IContacts = {
    telegram: {
        icon: tgIcon,
        text: '@VlassaDassa',
        alt: 'Telegram',
        href: 'https://t.me/VlassaDassa'
    },
    phone: {
        icon: phoneIcon,
        text: '+7 (900) 015-81-16',
        alt: 'Phone'
    },
    email: {
        icon: emailIcon,
        text: 'vlad.sad28@yandex.ru',
        alt: 'Email'
    },
}

export default contactData;
