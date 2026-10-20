import Head from '../head';
import Body from '../body';

const Html = ({
    lang = 'en',
    title,
    meta,
    basePath,
    children,
    bodyClass
}) => <html lang={lang}>
    <Head title={title} meta={meta} />
    <Body bodyClass={bodyClass}>
        {children}
        <script src={`${basePath}/index.js`} />
    </Body>
</html>;

export default Html;
