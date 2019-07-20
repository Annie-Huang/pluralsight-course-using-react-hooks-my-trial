import React, {useRef, useEffect, useState} from 'react';

const ImageToggleOnScroll = ({primaryImg, secondaryImg}) => {
    const imageRef = useRef(null);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        return(() => {
            window.removeEventListener('scroll', scrollHandler);
        })
    });

    const[inView, setInView] = useState(false);

    // Check whether the a image is in view of a window.
    const isInView = () => {
        if (imageRef.current) {
            const rect = imageRef.current.getBoundingClientRect();
            return rect.top >= 0 && rect.bottom <= window.innerHeight;
        }
        return false;
    };

    const scrollHandler = () => {
        setInView(() => isInView())
    };

    // I feel it can just use the isInView function rather than using the useState.
    // Maybe it is a way to trigger run on initial loading.
    return (
        <img
            src={inView ? primaryImg : secondaryImg}
            alt=""
            ref={imageRef}
        />
    );
};

export default ImageToggleOnScroll;
