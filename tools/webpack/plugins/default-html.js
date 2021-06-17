const h = require('preact').h;
const Head = require('../../../src/templates/components/head').default;
const paths = require('../../../paths.config');

const html = ({ htmlBody, css, title, meta }) => <html lang="en">
    <Head title={title} meta={meta}>
        {css && <link rel="stylesheet" href={`/${css}`} />}
        <script src={`${process.env.NODE_ENV === 'production' ? `/${paths.dest.js}` : ''}/index.js`} async />
    </Head>
    {htmlBody}
</html>;

module.exports = html;