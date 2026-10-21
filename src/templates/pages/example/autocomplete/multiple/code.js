import CountryOptions from '@components/country-options';

const Code = () => <form class="form" action="#" novalidate>
    <h1 class="visuallyhidden">Multiple selection autocomplete</h1>
    <label class="label" for="countries">
        Countries you have visited
        <span class="label__hint">Start typing, then choose as many countries as you need</span>
    </label>
    <div class="autocomplete autocomplete--multiple js-autocomplete">
        <select class="select" id="countries" name="countries" multiple>
            <CountryOptions />
        </select>
    </div>
</form>;

export default Code;
