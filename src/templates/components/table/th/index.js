import { h } from 'preact';

const Th = ({
    scope = 'col',
    className,
    isNumeric,
    children
}) => <th class={`table__th${isNumeric ? ' table__th--right' : ''}${className ? ` ${className}` : ''}`} scope={scope}>{children}</th>;

export default Th;