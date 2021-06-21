import { h } from 'preact';
import ExampleLayout from '@layouts/example';

export const title = 'Off canvas example';

const OffCanvas = () => <ExampleLayout>
    <header class="off-canvas__container">
        <div class="off-canvas">
            <nav aria-label={'Primary navigation'}>
                <button class="off-canvas__btn js-off-canvas__toggle" aria-label="Show or hide navigation menu" aria-controls="off-canvas" aria-exapanded="false">
                    <svg focusable="false" class="off-canvas__btn-icon" aria-hidden="true" fill="#fff" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                    </svg>
                    menu
                </button>
                <ul id="off-canvas" class="off-canvas__list js-off-canvas" data-toggle="js-off-canvas__toggle">
                    <li class="off-canvas__item">
                        <a
                            class={`off-canvas__link`}
                            href={'#'}
                        >Item 1</a>
                    </li>
                    <li class="off-canvas__item">
                        <a
                            class={`off-canvas__link is--active`}
                            href={'#'}
                            aria-current={'page'}
                        >Item 2</a>
                    </li>
                    <li class="off-canvas__item">
                        <a
                            class={`off-canvas__link`}
                            href={'#'}
                        >Item 3</a>
                    </li>
                    <li class="off-canvas__item">
                        <a
                            class={`off-canvas__link`}
                            href={'#'}
                        >Item 4</a>
                    </li>
                    <li class="off-canvas__item">
                        <a
                            class={`off-canvas__link`}
                            href={'#'}
                        >Item 5</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
    <main tabindex="0" aria-label="Next focusable item on the page">

    </main>
</ExampleLayout>;

export default OffCanvas;