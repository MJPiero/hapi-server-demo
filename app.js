const Hapi = require('hapi');
require('dotenv').config();
const config = require('./config');
const test = require('./routes/test');
const file = require('./routes/file');
const pluginHapiSwagger = require('./plugins/hapi-swagger');

// 配置服务器启动的 host 和端口
const server = new Hapi.Server({
  host: config.host,
  port: config.port
})

console.log(server.register);

const init = async () => {
    await server.register([
        // 为系统使用 hapi-swagger
        ...pluginHapiSwagger,
    ]);
    server.route([
        ...test,
        ...file,
    ])
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

init();