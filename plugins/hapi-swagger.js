
const package = require('package');
const hapiSwagger = require('hapi-swagger');

/**
 *  swagger 组件
 * 配置成功 访问路由 /documentation
 */
module.exports = [
  {
    plugin: hapiSwagger,
    options: {
      info: {
        title: '接口文档',
        version: package.version,
      },
      // 定义接口以 tags 属性定义为分组
      grouping: 'tags',
      tags: [
        {name: 'tests', description: '测试相关'}
      ]
    }
  }
]