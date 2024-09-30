import { h, Fragment } from 'preact';
import Table from '@components/table'

export const Code = () => <Fragment>
    <h1 class="visually-hidden">Tables with linked rows</h1>
    <Table caption="Example table" 
rows={[
    { link: { href: '#', label: 'More details about Joe Example' }, cells: [{"value": "Joe Example"},{"value": "Web developer"},{"value": "1 Jan 1970"}] },
    { link: { href: '#', label: 'More details about Joe Example' }, cells: [{"value": "Joe Example"},{"value": "Web developer"},{"value": "1 Jan 1970"}] },
    { link: { href: '#', label: 'More details about Joe Example' }, cells: [{"value": "Joe Example"},{"value": "Web developer"},{"value": "1 Jan 1970"}] },
    { link: { href: '#', label: 'More details about Joe Example' }, cells: [{"value": "Joe Example"},{"value": "Web developer"},{"value": "1 Jan 1970"}] },
]}
head={[{"value": "Name"}, {"value": "Job title"}, {"value": "Date of birth"}]}
/></Fragment>;

export default Code;