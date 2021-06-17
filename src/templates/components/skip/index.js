import { h } from 'preact';

const Skip = ({
    href = '#main',
    label = 'Skip to main content'
}) => <div class="skip"><a class="skip__btn" href={href}>{label}</a></div>;

export default Skip;