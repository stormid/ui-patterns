import { h } from 'preact';

const Code = () => <article>
    <h1 class="plus-2">Lorem ipsum</h1>
    <p>Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <div id="show-more-1" data-toggle="js-show-more__btn" class="show-more js-show-more" tabindex="-1">
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
    <button class="js-show-more__btn show-more__btn" aria-expanded="false" aria-controls="read-more-1">Show more</button>
</article>;

export default Code;