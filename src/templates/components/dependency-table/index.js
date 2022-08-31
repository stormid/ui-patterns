import { h } from 'preact';

const DependencyTable = ({ dependencies }) => <table class="table push-bottom--double">
    <thead>
        <tr>
            <th class="th th--tight">Package</th>
            <th class="th th--tight">Installation</th>
        </tr>
    </thead>
    <tbody>
        {
            dependencies.map(dependency => <tr>
                <td class="td td--tight"><a href="https://www.npmjs.com/package/@stormid/tabs" rel="noopener nofollow">{dependency.package}</a></td>
                <td class="td td--tight"><pre class="pre pre--inline"><code class="code">{dependency.installation}</code></pre></td>
            </tr>)
        }
    </tbody>
</table>;

export default DependencyTable;