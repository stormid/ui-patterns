module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            [
                '@babel/preset-env',
                Object.assign({}, process.env.NODE_ENV === 'test'
                    ? {
                        targets: {
                            node: 12,
                        }
                    }
                    : {
                        exclude: ['transform-regenerator', 'transform-async-to-generator'],
                     }
                )
            ]
        ],
        plugins: [
            ['@babel/plugin-transform-react-jsx', {
                pragma: 'h'
            }],
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-proposal-class-properties'
        ].concat(process.env.NODE_ENV === 'test' ? [] : ['module:fast-async'])
    };
};