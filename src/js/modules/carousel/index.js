import Swiper from 'swiper';
import {
    Navigation,
    FreeMode,
    A11y
} from 'swiper/modules';

export const init = () => {
    const node = document.querySelector('.js-carousel');
    const waiNode = document.querySelector('.js-carousel-wai');
    if (!node && !waiNode) return;
    if (node) {
        const instance = new Swiper(node, {
            modules: [ Navigation, FreeMode, A11y ],
            freeMode: {
                enabled: true,
                sticky: true,
            },
            a11y: {
                enabled: true,
                slideRole: false,
                slideLabelMessage: false,
                prevSlideMessage: 'Scroll carousel left',
                nextSlideMessage: 'Scroll carousel right'
            },
            navigation: {
                nextEl: node.querySelector('.swiper-button-next'),
                prevEl: node.querySelector('.swiper-button-prev'),
            },
            slidesPerView: 1,
            spaceBetween: 24,
            breakpoints: {
                768: { slidesPerView: 2 },
                1500: { slidesPerView: 3 },
            }
        });
        instance.wrapperEl.removeAttribute('aria-live');
    }
    if (waiNode) {
        const instance = new Swiper(waiNode, {
            modules: [ Navigation, FreeMode, A11y ],
            watchSlidesProgress: true,
            freeMode: {
                enabled: true,
                sticky: true,
            },
            a11y: {
                enabled: true,
                slideLabelMessage: false,
                prevSlideMessage: 'Scroll carousel left',
                nextSlideMessage: 'Scroll carousel right'
            },
            navigation: {
                nextEl: waiNode.querySelector('.swiper-button-next'),
                prevEl: waiNode.querySelector('.swiper-button-prev'),
            },
            slidesPerView: 1,
            spaceBetween: 24,
            breakpoints: {
                768: { slidesPerView: 2 },
                1500: { slidesPerView: 3 },
            }
        });
        instance.wrapperEl.removeAttribute('aria-live');
        instance.wrapperEl.setAttribute('aria-roledescription', 'Carousel');
        instance.on('beforeTransitionStart sliderMove', () => waiNode.classList.add('is-sliding'));
        instance.on('slideChangeTransitionEnd', () => {
            waiNode.classList.remove('is-sliding');
            instance.slides.forEach((slide, idx) => {
                if (instance.visibleSlides.includes(idx)) slide.setAttribute('aria-hidden', 'false');
                else slide.setAttribute('aria-hidden', 'true');
            });
        });
        const liveRegion = document.querySelector(`.${instance.params.a11y.notificationClass}`);
        instance.on('transitionEnd', instance => {
            let message = `Showing slide`;
            if (instance.visibleSlides.length > 1) message += `s`;
            message += ` ${instance.activeIndex + 1}`;
            if (instance.visibleSlides.length === 2) message += ` and ${instance.activeIndex + instance.visibleSlides.length}`;
            if (instance.visibleSlides.length > 2) message += ` to ${instance.activeIndex + instance.visibleSlides.length}`;
            message += ` of ${instance.slides.length} - `;
            message += instance.visibleSlidesIndexes.reduce((message, curr, idx) => {
                if (instance.visibleSlidesIndexes.length === 1) return instance.slides[curr].getAttribute('aria-label');
                if ((idx + 1) === instance.visibleSlidesIndexes.length) return message + ` and ${instance.slides[curr].getAttribute('aria-label')}`;
                if (idx > 0) return message + `, ${instance.slides[curr].getAttribute('aria-label')}`;
                return message + `${instance.slides[curr].getAttribute('aria-label')}`;
            }, '');
            liveRegion.textContent = message;
        });
    }


};

init();