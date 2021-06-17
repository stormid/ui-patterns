const h = require(`preact`).h;
const render = require('preact-render-to-string').render;
const Html = require(`./default-html`);
require('../../../src/css/index.scss');

module.exports = function(locals) {
    const bodyTemplate = require(`../../../src/templates/pages/${locals.path}`).default;
    if (!bodyTemplate) {
        console.error('\x1b[41m%s\x1b[0m', `Page template ${locals.path} does not export a default function`);
        return Promise.resolve(``);
    }
    try {
        const body = bodyTemplate();
        const assets = Object.keys(locals.webpackStats.compilation.assets);
        const css = assets.filter(value => value.match(/\.css$/));
        const title = require(`../../../src/templates/pages/${locals.path}`).title || '';
        const meta = require(`../../../src/templates/pages/${locals.path}`).meta || '';
        return new Promise((resolve, reject) => {
            if (body.then) {
                body.then(Res => {
                    resolve(`<!DOCTYPE html>${render(<Html css={css} htmlBody={Res} title={title} meta={meta} />)}`);
                });
            } else resolve(`<!DOCTYPE html>${render(<Html css={css} htmlBody={body} title={title} meta={meta} />)}`);
        });
    } catch (e){
        return Promise.reject(`HTML render error: ${e}`);
    }
};