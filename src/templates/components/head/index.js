import { h } from 'preact';

const head = ({ title, meta, children }) => <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
    <link rel="shortcut icon" href={`/static/img/favicon.ico`} />
    <link rel="stylesheet" href="https://fast.fonts.net/cssapi/5b32fdc1-42a3-4334-b7b1-5befe7df53c8.css" media="print" onload="this.media='all'" />
    <title>{title}</title>
    {children}
    {meta && meta.map(item => {
        if (item.name) return <meta name={item.name} content={item.content} />;
        if (item.property) return <meta property={item.property} content={item.content} />;
    })}
</head>;

export default head;
    