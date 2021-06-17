import { h } from 'preact';

const LogoLink = () => <a class="logo-link" href={'/'} aria-label="Storm ID UI Patterns home">
    <svg class="logo-link__icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="140" height="29.6" viewBox="20 -2.2 240.8 51.2">
        <path fill="white" d="M22.2 36.2c1.4 3.9 3 6.5 4.8 8s4 2.2 6.7 2.2c2.4 0 4.3-.5 5.7-1.6 1.3-1.1 1.9-2.4 1.9-4 0-.9-.2-1.8-.7-2.4-.5-.7-1.1-1.2-2-1.6-.9-.4-3.1-.9-6.7-1.5-3.4-.6-5.8-1.4-7.2-2.1s-2.4-1.8-3.2-3.1c-.7-1.3-1.1-2.7-1.1-4.2 0-2.3.8-4.4 2.3-6.3 2-2.4 4.8-3.6 8.4-3.6 2.7 0 5.3.9 7.6 2.6l2.2-2.4h1.4l.9 11.2H41c-1-3.2-2.3-5.4-4-6.9-1.6-1.4-3.7-2.1-6.2-2.1-2.1 0-3.8.5-5 1.6-1.2 1.1-1.8 2.3-1.8 3.8 0 1.3.6 2.4 1.6 3.3 1.1.9 3.2 1.6 6.4 2.1 3.7.6 6.2 1.1 7.2 1.6 1.9.6 3.3 1.7 4.3 3.1 1 1.4 1.5 3.1 1.5 5.1 0 2.8-1.1 5.2-3.3 7-2.2 1.9-4.9 2.9-8.3 2.9-3.1 0-6-1-8.7-3.1l-2.4 2.8h-1.7L20 36.2h2.2zM58.6 3.8h2.2v12.8H71v3.1H60.8v20.2c0 1.7.4 3.1 1.2 4 .9.9 1.9 1.4 3.2 1.4 1.5 0 2.8-.7 3.9-2.1 1.1-1.4 1.7-3.7 1.9-6.9h2.2c-.1 4.2-1.1 7.3-2.9 9.3s-4.1 3-6.9 3c-2.6 0-4.7-.7-6.1-2.1s-2.2-3.3-2.2-5.6V19.8h-5.4v-2.4c2.5-.4 4.4-1.4 5.7-3.2 2-2.5 3-6 3.2-10.4zM91.9 15.7c4.2 0 7.8 1.5 10.7 4.6s4.3 7.1 4.3 12.1c0 3.4-.6 6.4-1.9 8.8s-3.2 4.4-5.5 5.7c-2.4 1.4-4.9 2.1-7.7 2.1-4.1 0-7.5-1.6-10.4-4.7-2.9-3.1-4.2-7.1-4.2-12s1.4-9 4.3-12c2.8-3.1 6.2-4.6 10.4-4.6zm0 2.3c-2.5 0-4.6 1.1-6.2 3.4-1.6 2.3-2.4 5.9-2.4 10.7 0 5 .8 8.7 2.4 11s3.7 3.4 6.2 3.4c2.7 0 4.7-1.1 6.4-3.4 1.6-2.3 2.4-6.1 2.4-11.3 0-4.9-.8-8.4-2.4-10.5-1.6-2.2-3.7-3.3-6.4-3.3zM110.9 16.6l11.3-.6v12.8c1.2-4.2 2.7-7.4 4.4-9.5 1.7-2.1 3.8-3.2 6.3-3.2 1.7 0 3.1.5 4.1 1.6s1.5 2.4 1.5 4.2c0 1.4-.4 2.5-1 3.3-.7.8-1.5 1.1-2.6 1.1-1 0-1.8-.4-2.4-1-.6-.6-.9-1.6-.9-2.7 0-.7.1-1.4.6-2.1.4-.6.5-.9.5-1.1 0-.4-.2-.5-.6-.5-.9 0-1.9.5-3.2 1.6-1.6 1.5-2.9 3.6-3.7 6.2-1.4 4.1-2 7.3-2 9.7v6.7c0 .8.3 1.4.8 1.7s1.4.6 2.7.6h4v2.5h-19.6v-2.5h3.2c1.1 0 1.9-.2 2.4-.6.6-.4.8-.9.8-1.5V23.2c0-1.5-.4-2.7-1-3.4s-1.6-1.1-2.8-1.1H111l-.1-2.1zM143.9 16.6l9-.6c.5 2.4.8 4.6 1 6.7 1.7-2.4 3.4-4.2 5.1-5.2 1.7-1 3.6-1.5 5.6-1.5 2.1 0 3.9.6 5.4 1.7 1.4 1.1 2.5 3 3.3 5.5 1.5-2.4 3.2-4.2 5-5.4 1.9-1.2 3.9-1.8 6-1.8 2.9 0 5 .9 6.4 2.6 1.9 2.2 2.7 5.2 2.7 8.7v15.6c0 .9.2 1.6.7 1.9.6.5 1.6.8 2.8.8h1.6v2.5h-15.8v-2.5h1.6c1.4 0 2.3-.2 2.8-.6.6-.4.8-1.1.8-2V27.2c0-2.4-.6-4.2-1.7-5.4-1.1-1.3-2.7-1.9-4.5-1.9-1.4 0-2.7.4-3.8 1.1s-2 1.8-2.7 3.2c-.9 2-1.4 3.7-1.4 5.1v13.5c0 .9.2 1.6.7 2s1.3.6 2.3.6h2.1v2.5h-16v-2.5h1.8c1.1 0 2-.2 2.6-.6.6-.4.9-1 .9-1.7V28.6c0-3.1-.6-5.3-1.6-6.7-1.1-1.4-2.6-2.1-4.4-2.1-2.4 0-4.2.8-5.4 2.4-1.8 2.3-2.7 4.9-2.7 8v12.7c0 .9.2 1.6.6 2 .6.5 1.6.7 2.8.7h1.6v2.5h-15.8v-2.5h2.4c.9 0 1.6-.2 2.1-.6.5-.4.7-1 .7-1.7V22.6c0-1.1-.3-2-.9-2.6-.6-.6-1.7-.9-3.5-1.1l-.2-2.3z"/>
        <path fill="gray" d="M202.5 16.6l12.5-.4v27.1c0 .7.1 1.3.6 1.6.5.4 1.1.6 1.9.6h3.6V48h-17.9v-2.5h3.3c1 0 1.7-.2 2.1-.7.4-.5.7-1.1.7-2.1V22.9c0-1.3-.4-2.2-1.1-2.9-.7-.7-1.8-.9-3.2-.9h-2.6l.1-2.5zm8.8-18.8c1 0 1.9.4 2.7 1.1.8.7 1.1 1.6 1.1 2.7 0 1-.4 1.9-1.1 2.7-.7.7-1.6 1.1-2.7 1.1-1 0-1.9-.4-2.7-1.1-.7-.7-1.1-1.6-1.1-2.7s.4-1.9 1.1-2.7c.8-.7 1.7-1.1 2.7-1.1zM239.6-1.6l12.3-.6v43.1c0 1.6.3 2.9.9 3.6.6.7 1.6 1.1 2.9 1.1h2.1v2.5h-10.7l-.8-6.4c-1.3 2.3-2.8 4-4.5 5.2-1.7 1.1-3.7 1.7-5.7 1.7-3.6 0-6.7-1.5-9.2-4.5s-3.8-6.9-3.8-11.9c0-5.3 1.6-9.6 4.9-12.8 2.5-2.5 5.4-3.7 8.7-3.7 2 0 3.8.5 5.4 1.5 1.6 1 3 2.5 4.2 4.6V4.1c0-.9-.4-1.7-1.1-2.2-.7-.6-1.9-.8-3.4-.8h-2.2v-2.7zm-1.9 20.1c-2.4 0-4.4 1-5.7 3-1.4 2-2.1 5.4-2.1 10.1 0 5.2.7 8.7 2.1 10.8 1.4 2.1 3.3 3.2 5.6 3.2 2.4 0 4.5-1.1 6.2-3.5s2.6-5.7 2.6-10.2c0-4.2-.9-7.6-2.8-10-1.6-2.4-3.6-3.4-5.9-3.4z"/>
    </svg>
</a>;

export default LogoLink;