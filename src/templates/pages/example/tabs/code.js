import { h, Fragment } from 'preact';

const Code = () => <div class="tabs js-tabs">
    <div class="tabs__tabslist" role="tablist">
        <a id="tab-1" class="tabs__tab js-tabs__link" href="#panel-1" role="tab">Tab 1</a>
        <a id="tab-2" class="tabs__tab js-tabs__link" href="#panel-2" role="tab">Tab 2</a>
        <a id="tab-3" class="tabs__tab js-tabs__link" href="#panel-3" role="tab">Tab 3</a>
    </div>
    <div id="panel-1" class="tabs__tabpanel" role="tabpanel">Panel 1</div>
    <div id="panel-2" class="tabs__tabpanel" role="tabpanel" hidden>
            <p>Panel 2</p>
            <p><a href="/">Test link</a></p>
            <p><a href="/">Test link</a></p>
    </div>
    <div id="panel-3" class="tabs__tabpanel" role="tabpanel" hidden>
        <p>Panel 3</p>
        <p><a href="/">Test link</a></p>
        <p><a href="/">Test link</a></p>
    </div>
</div>;

export default Code;