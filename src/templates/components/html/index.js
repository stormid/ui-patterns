import { h } from 'preact';
import Head from '../head';
import Body from '../body';

const Html = ({
    lang = 'en',
    title,
    meta,
    css,
    basePath,
    children,
    bodyClass
}) => <html lang={lang}>
    <Head title={title} meta={meta} css={css} />
    <Body bodyClass={bodyClass}>
        {children}
        <script nomodule src={`${basePath}/polyfills.js`} />
        <script src={`${basePath}/index.js`} />
    </Body>
</html>;

export default Html;