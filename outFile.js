const fs = require('fs')

let project = `skybase-tree`
module.exports = { outFile, codeConfig }

// 配置文档
function codeConfig() {
  return {
    common: { // 公用模块
      mysql: getCommonMysql()
    }
  }
}


async function outFile(destBaseDir = '.', srcBaseDir = `${__dirname}/node_modules/${project}/`) {
  let obj = {
    'router': {
      'skyapi': {
        'tree.js': './router/skyapi/tree.js'
      }
    },
    'model': {
      'api': {
        'skyapi': {
          'tree.js': './model/api/skyapi/tree.js'
        }
      }
    },
    'service': {
      'tree.js': './service/skyapi/tree.js'
    },
    'sql': {
      'tree.sql': './sql/tree.sql'
    }
  }
  try {
    let isExist = fs.existsSync(srcBaseDir) // 判断目录是否存在
    if (!isExist) {
      console.error(srcBaseDir, '目录不存在！')
      return
    }

    await outPutFile(destBaseDir, '', obj, srcBaseDir)
  } catch (e) {
    console.error(e.stack)
  }
}

function getCommonMysql() {
  return {
    config: `
    mysql: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '123456',
      database: 'test',
      pool: 1000,
      timeout: 60000,
      charset: 'utf8mb4',
      multipleStatements: true,
      connectionLimit: 1000
    }
`,
    index: {
      require: ``,
      beforeMount: `
      // 连接mysql
      const db = require('j2sql')(config.mysql)
      await waitNotEmpty(db, '_mysql')
      global.db = db
`,
      func: `
      async function waitNotEmpty (o, prop, fn) {
        fn = fn || function () {}
        if (!o[prop]) {
          fn(o, prop)
          await $.wait(100)
          await waitNotEmpty(o, prop, fn)
        }
      }
`
    }
  }
}

async function outPutFile(dir, key, obj, srcBaseDir) {
  if (typeof obj == 'string') {
    // console.log(`创建目录  ${dir}`)
    await fs.mkdirSync(dir, { recursive: true })
    // console.log(`原：${srcBaseDir}${obj}  目的：${dir}/${key}`)
    if (!await checkFileExist(`${srcBaseDir}${obj}`)) {
      console.error(`原文件不存在\t${srcBaseDir}${obj}`)
      return
    }
    await fs.copyFileSync(`${srcBaseDir}${obj}`, `${dir}/${key}`);
    return
  }
  for (let k in obj) {
    outPutFile(key === '' ? dir : `${dir}/${key}`, k, obj[k], srcBaseDir)
  }
}

async function checkFileExist(filePath) {
  try {
    await fs.accessSync(filePath, fs.constants.R_OK)
    return true
  } catch (e) { }
  return false
}

