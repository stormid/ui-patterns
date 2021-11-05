import { h } from 'preact';

const head = ({
    charset = 'utf-8',
    title,
    meta,
    viewport = 'width=device-width, initial-scale=1.0, shrink-to-fit=no',
    favicon = `/static/img/favicon.ico`,
    css,
    children
}) => <head>
    <meta charset={charset} />
    <meta name="viewport" content={viewport} />
    <link rel="shortcut icon" href={favicon} />
    <title>{title}</title>
    {css && <link rel="stylesheet" href={`/${css}`} />}
    {children}
    {meta && meta.map(item => {
        if (item.name) return <meta name={item.name} content={item.content} />;
        if (item.property) return <meta property={item.property} content={item.content} />;
    })}
</head>;

export default head;
    