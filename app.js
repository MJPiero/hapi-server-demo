const Hapi = require('hapi');
require('dotenv').config();
const Path = require('path');
const config = require('./config');
const test = require('./routes/test');
const file = require('./routes/file');

const pluginHapiSwagger = require('./plugins/hapi-swagger');
const inert = require('inert');  // 页面渲染
const vision = require('vision');
const hapiPino = require('./plugins/hapi-pino');

// 配置服务器启动的 host 和端口
const server = new Hapi.Server({
    host: config.host,
    port: config.port,
    routes: {
        cors: {
            origin: ['*']
        },
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    }
})

const init = async () => {
    await server.register([
        inert,
        vision,
        // 为系统使用 hapi-swagger
        ...pluginHapiSwagger,
        ...hapiPino
    ]);
    server.route([
        ...test,
        ...file,
    ])
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

init();