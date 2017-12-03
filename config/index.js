import defaultConfig from './config.default.json';

if (process.env.NODE_ENV == 'development') {
    module.exports = {
        ...defaultConfig,
        ...require('./config.dev.json')
    };
} else {
    module.exports = {
        ...defaultConfig,
        ...require('./config.prod.json')
    };
}