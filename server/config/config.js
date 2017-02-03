const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../../'))

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://localhost:27017/some-express-db',
    port: 1337
  },
  production: {
    rootPath: rootPath,
    db: 'mongodb://admin:pentapass9106!@ds141209.mlab.com:41209/rwbagenda',
    port: process.env.port
  }
}
