import { h } from 'preact';

const head = ({ title, meta, children }) => <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
    <link rel="shortcut icon" href={`/static/img/favicon.ico`} />
    <title>Storm UI Patterns - {title}</title>
    {children}
    {meta && meta.map(item => {
        if (item.name) return <meta name={item.name} content={item.content} />;
        if (item.property) return <meta property={item.property} content={item.content} />;
    })}
</head>;

export default head;
    