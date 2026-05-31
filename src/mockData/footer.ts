import { IFooterItem } from "@/interfaces/general";


const mail = '/images/mockImages/footer/mail.svg';
const telegram = '/images/mockImages/footer/telegram.svg';
const phone = '/images/mockImages/footer/phone.svg';


export const footerItems: IFooterItem[] = [
    {
        id: 1,
        text: 'vlad.sad28@yandex.ru',
        icon: mail,
    },
    {
        id: 2,
        text: '@VlassaDassa',
        link: 'https://t.me/VlassaDassa',
        icon: telegram,
    },
    {
        id: 3,
        text: '+7 (900) 015-81-16',
        icon: phone,
    }
]