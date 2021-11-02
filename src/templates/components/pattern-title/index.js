import { h, Fragment } from 'preact';
import Status from '@components/status';

const PatternTitle = ({ children, status = '' }) => <h1 class="pattern-title">
    <span class="pattern-title__text">{children}</span>
    {status && <Fragment>
        <span class="visually-hidden">Status</span>
        <Status className={'pattern-title__status'} type={status.toLowerCase()} />
    </Fragment>}
</h1>;

export default PatternTitle;