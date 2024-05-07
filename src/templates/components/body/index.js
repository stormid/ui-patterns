import { h } from 'preact';

const Body = ({children, bodyClass}) => <body class={bodyClass}>{children}</body>;

export default Body;