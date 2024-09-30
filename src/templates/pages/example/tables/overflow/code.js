import { h } from 'preact';
import Table from '@components/table';

export const Code = () => (<Table tabindex="0" id="scrolltableCaption" caption="Example table" className={"table__container--overflow"}
    rows={[
        { cells: [ {"value": "Joe Example"},{"value": "Web developer"},{"value": "1 Jan 1970"},{"value": "Online"} ] },
        { cells: [ {"value": "Joe Example"},{"value": "Web developer"},{"value": "1 Jan 1970"},{"value": "Online"} ] },
        { cells: [ {"value": "Joe Example"},{"value": "Web developer"},{"value": "1 Jan 1970"},{"value": "Online"} ] },
    ]}
    head={[{"value": "Name"}, {"value": "Job title"}, {"value": "Date of birth"}, {"value": "Status"}]}
/>)

export default Code;

