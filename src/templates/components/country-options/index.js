import { Fragment } from 'preact';

export const COUNTRIES = [
    { value: 'AU', label: 'Australia' },
    { value: 'AT', label: 'Austria' },
    { value: 'BE', label: 'Belgium' },
    { value: 'CA', label: 'Canada' },
    { value: 'DK', label: 'Denmark' },
    { value: 'FI', label: 'Finland' },
    { value: 'FR', label: 'France' },
    { value: 'DE', label: 'Germany' },
    { value: 'IS', label: 'Iceland' },
    { value: 'IE', label: 'Ireland' },
    { value: 'IT', label: 'Italy' },
    { value: 'NL', label: 'Netherlands' },
    { value: 'NZ', label: 'New Zealand' },
    { value: 'NO', label: 'Norway' },
    { value: 'PT', label: 'Portugal' },
    { value: 'ES', label: 'Spain' },
    { value: 'SE', label: 'Sweden' },
    { value: 'CH', label: 'Switzerland' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'US', label: 'United States' }
];

const CountryOptions = () => <Fragment>
    {COUNTRIES.map(country => <option key={country.value} value={country.value}>{country.label}</option>)}
</Fragment>;

export default CountryOptions;
