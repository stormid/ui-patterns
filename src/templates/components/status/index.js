
const Status = ({ type, className, ...props }) => <span class={`status status--${type}${className ? ` ${className}` : ''}`}{...props}>{type}</span>;

export default Status;