import { h } from 'preact';
import Th from './th';

const Table =  ({ className, caption, head, rows = [], emptyMessage = 'No data available' }) => <div class={`table__container${className ? ` ${className}` : ''}`}>
    <table class={`table${caption ? ` table--has-caption` : ``}`}>
        {caption && <caption class="table__caption">{caption}</caption>}
        <thead class="table__head">
            <tr class="table__row">
                {
                    head.map((cell, idx) => <Th
                        scope={cell.scope}
                        isNumeric={cell.isNumeric}
                    >
                        {cell.value}
                    </Th>
                    )
                }
                {rows.reduce((acc, row) => acc || row.link, false) && <Th className={'table__th--hidden'}>Link</Th>}
            </tr>
        </thead>
        <tbody class="table__bd">
            {
                rows.length > 0
                    ? rows.map(row => <tr class={`table__row${row.link ? ` table__row--link` : ''}`}>
                        {row.cells.map((cell, idx) => <td data-th={head[idx].value} class={`table__td${cell.className ? ` ${cell.className}` : ''}${cell.isNumeric ? ' table__td--right' : ''}${cell.status ? ` table__td--status` : ``}`}>
                            {cell.value}
                        </td>)}
                        {row.link && <td class="table__td table__td--link"><a class="table__link" href={row.link.href}><span class="visually-hidden">{row.link.label || row.link.href}</span></a></td>}
                    </tr>)
                    : <tr class={`table__row`}>
                        <td colspan={head.length} class="table__td align-center">{emptyMessage}</td>
                    </tr>
            }
        </tbody>
    </table>
</div>;

export default Table;

export const NoValue = () => <span aria-label="No value">--</span>;