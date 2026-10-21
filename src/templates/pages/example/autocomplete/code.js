import CountryOptions from '@components/country-options';

const Code = () => <form class="form" action="#" novalidate>
    <h1 class="visuallyhidden">Autocomplete</h1>
    <label class="label" for="country">
        Country of residence
        <span class="label__hint">Start typing, then choose a country from the list</span>
    </label>
    <div class="autocomplete js-autocomplete">
        <select class="select" id="country" name="country">
            <option value="">Choose a country</option>
            <CountryOptions />
        </select>
    </div>
</form>;

export default Code;
