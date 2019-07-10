const sky = require('skybase')
const config = require('./config')

/* global $ */

config.beforeMount = async () => {
  // 连接mysql
  const db = require('j2sql')(config.mysql)
  await waitNotEmpty(db, '_mysql')
  global.db = db
}

sky.start(config, async () => {
  $.log('项目成功启动')
})

async function waitNotEmpty (o, prop, fn) {
  fn = fn || function () {}
  if (!o[prop]) {
    fn(o, prop)
    await $.wait(100)
    await waitNotEmpty(o, prop, fn)
  }
}