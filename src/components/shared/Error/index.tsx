import { Link } from '@/i18n/navigation';
import Button from '@/components/shared/button/Button';
import AdaptiveImage from '../AdaptiveImage';

import { useTranslations } from 'next-intl';

import './../../../app/globals.scss';


const errorImage ='/images/errorPage/errorImage.png';


interface ErrorProps {
    error: string;
    h1: string;
    h2: string;
    link: string;
    btn?: boolean;
}

export default function Error({ error, h1, h2, link, btn=true }: ErrorProps) {

    const t = useTranslations('NotFound')
    return (
        <div className={`error-container ${btn ? 'with-btn' : 'without-btn'}`}>
            <AdaptiveImage 
                src={errorImage}
                ariaHidden={true}
                wrapClass="error-image"
                loading="eager"
            />

            <h1>{h1}</h1>
            <h2>{h2}</h2>
            <p>{error}</p>
            <Link href={link} className='btn-link'>
                {
                    btn ? (
                        <Button 
                            text={t('BackToHome')}
                            variant='black'
                            behavior='default'
                            iconPosition='noIcon'
                        />
                    )
                    : (
                        <span className='back-home'>{t('BackToHome')}</span>
                    )
                }            
                
            </Link>
        </div>
    );
}