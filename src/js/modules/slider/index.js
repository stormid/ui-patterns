import Swiper from 'swiper';
import {
    Navigation,
    FreeMode,
    A11y
} from 'swiper/modules';

export const init = () => {
    const node = document.querySelector('.js-slider');
    if (!node) return;
    
    new Swiper(node, {
        modules: [ Navigation, FreeMode, A11y ],
        lazy: true,
        freeMode: {
            enabled: true,
            sticky: true,
        },
        a11y: {
            enabled: true,
            slideLabelMessage: 'slide {{index}} of {{slidesLength}}'
        },
        navigation: {
            nextEl: node.previousElementSibling.querySelector('.swiper-next'),
            prevEl: node.previousElementSibling.querySelector('.swiper-previous'),
        },
        slidesPerView: 1,
        spaceBetween: 24,
        breakpoints: {
            768: { slidesPerView: 2 },
            1500: { slidesPerView: 3 },
        }
    });
};

init();