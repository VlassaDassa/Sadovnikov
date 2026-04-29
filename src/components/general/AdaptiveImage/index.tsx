import { forwardRef } from "react";

import Image from "next/image";

import style from './index.module.scss';



interface AdaptiveImageProps {
    src: string,
    alt?: string,
    ariaHidden?: boolean,
    wrapClass?: string,
    imgClass?: string,
    loading?: "eager" | "lazy" | undefined,
    ariaLabel?: string,
}


const AdaptiveImage = forwardRef<HTMLDivElement, AdaptiveImageProps>(
    ({ loading = 'lazy', src, alt = '', ariaHidden=true, wrapClass, imgClass, ariaLabel = '' }, ref) => {

    return (
        <div ref={ref} className={`${style.imgWrapper} ${wrapClass}`}>
            <Image 
                src={src}
                alt={alt}
                aria-hidden={ariaHidden}
                fill
                className={imgClass}
                sizes='50vw'
                loading={loading}
                aria-label={ariaLabel}
            />
        </div>
    )
})

export default AdaptiveImage;