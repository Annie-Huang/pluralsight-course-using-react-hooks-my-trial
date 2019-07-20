import React, {useRef, useEffect, useState} from 'react';

const ImageToggleOnScroll = ({primaryImg, secondaryImg}) => {
    const imageRef = useRef(null);
    // 2: With part 1 but without this following state, (at fresh the window_ you will see the first image is black
    // initially, and then within a flicker, it turns to colour. That is because the initially state of inView is set to false;
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        // 1: Without the following, the first image will be black and white because we never check it.
        setInView(isInView());

        setIsLoading(false);
        return (() => {
            window.removeEventListener('scroll', scrollHandler);
        });
    }, [isLoading]);

    const [inView, setInView] = useState(false);

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

    // // I feel it can just use the isInView function rather than using the useState.
    // // Maybe it is a way to trigger run on initial loading.
    // return (
    //     <img
    //         src={inView ? secondaryImg : primaryImg}
    //         alt=""
    //         ref={imageRef}
    //     />
    // );
    return !isLoading && (
        <img
            src={inView ? secondaryImg : primaryImg}
            alt=""
            ref={imageRef}
            width="200"
            height="200"
        />
    );
};

export default ImageToggleOnScroll;
