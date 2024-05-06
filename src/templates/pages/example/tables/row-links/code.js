import { h } from 'preact';
import Table from '@components/table'

export const Code = () => <Table caption="Example table" 
rows={[
    { link: { href: '#', label: 'Joe Example' }, cells: [{"value": "Joe Example"},{"value": "Web developer"},{"value": "1 Jan 1970 (53y)"}] },
    { link: { href: '#', label: 'Joe Example' }, cells: [{"value": "Joe Example"},{"value": "Web developer"},{"value": "1 Jan 1970 (53y)"}] },
    { link: { href: '#', label: 'Joe Example' }, cells: [{"value": "Joe Example"},{"value": "Web developer"},{"value": "1 Jan 1970 (53y)"}] },
    { link: { href: '#', label: 'Joe Example' }, cells: [{"value": "Joe Example"},{"value": "Web developer"},{"value": "1 Jan 1970 (53y)"}] },
]}
head={[{"value": "Name"}, {"value": "Job title"}, {"value": "Date of birth"}]}
/>;

export default Code;