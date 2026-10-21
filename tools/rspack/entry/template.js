import Html from '../../../src/templates/components/html';
import paths from '../../../paths.config';

const html = ({ htmlBody, title, meta, bodyClass }) => <Html
    title={title}
    meta={meta}
    bodyClass={bodyClass}
    basePath={`/${paths.dest.js}`}
>
    {htmlBody}
</Html>;

export default html;
