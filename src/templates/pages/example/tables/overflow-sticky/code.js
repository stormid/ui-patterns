import { h } from 'preact';
import Table from '@components/table';

export const Code = () => (<Table tabindex="0" caption="Example table" className={"table__container--overflow table__container--overflow-sticky"}
    rows={[
        { cells: [ {"value": "Joe Example"},{"value": "Web developer"},{"value": "1 Jan 1970"} ] },
        { cells: [ {"value": "Joe Example"},{"value": "Web developer"},{"value": "1 Jan 1970"} ] },
        { cells: [ {"value": "Joe Example"},{"value": "Web developer"},{"value": "1 Jan 1970"} ] },
    ]}
    head={[{"value": "Name"}, {"value": "Job title"}, {"value": "Date of birth"}]}
/>)

export default Code;

