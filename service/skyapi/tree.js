
/* global $ db */

module.exports = {
  getId,
  getSon,
  getSons,
  addChild,
  addChilds,
  addBrother,
  del,
  delMult,
  modify,
  move,
  copy
}

// 复制节点到，另一节点下成为儿子
async function copy(arg) {
  if (arg.idSrc < 0 || arg.idDest < 0) {
    return { code: 400, msg: `节点id错误` }
  }
  let sr = await db.tree.R({ id: arg.idSrc, d_flag: 0 }, {}, {}, 1).run()
  if (sr === -1 || sr.length !== 1) {
    return { code: 400, msg: `源节点不存在！` }
  }
  let dr = await db.tree.R({ id: arg.idDest, d_flag: 0 }, {}, {}, 1).run()
  if (dr === -1 || dr.length !== 1) {
    return { code: 400, msg: `目标节点不存在！` }
  }
  sr = sr[0]
  dr = dr[0]

  let obj = {
    project_id: dr.project_id,
    company_id: dr.company_id,
    pid : dr.id,
    depth : dr.depth+1,
    parent_path: `${dr.parent_path}${dr.id},`,
    name: sr.name,
    json_extend: sr.json_extend,
    c_time: new Date().date2Str(),
    m_time: new Date().date2Str()
  }
  let r = await db.tree.C(obj).run()
  if (r === -1) {
    return { code: 500, msg: `数据库异常` }
  }
  return { code: 0, data: {} }
}

// 移动整个节点到，另一节点下成为儿子
async function move(arg) {
  if (arg.idSrc < 0 || arg.idDest < 0) {
    return { code: 400, msg: `节点id错误` }
  }
  let sr = await db.tree.R({ id: arg.idSrc, d_flag: 0 }, {}, {}, 1).run()
  if (sr === -1 || sr.length !== 1) {
    return { code: 400, msg: `源节点不存在！` }
  }
  let dr = await db.tree.R({ id: arg.idDest, d_flag: 0 }, {}, {}, 1).run()
  if (dr === -1 || dr.length !== 1) {
    return { code: 400, msg: `目标节点不存在！` }
  }
  sr = sr[0]
  dr = dr[0]
  if (dr.parent_path.indexOf(`,${sr.id},`) >= 0) {
    return { code: 400, msg: `不能移动到儿子节点下` }
  }

  let parentPath = `${dr.parent_path}${dr.id},`
  let depthAdd = dr.depth - sr.depth + 1
  let sonSrcParentPath = `${sr.parent_path}${sr.id},`
  let sonDestParentPath = `${parentPath}${sr.id},`
  let sql = `UPDATE tree set m_time='${new Date().date2Str()}',depth=${dr.depth + 1},pid=${dr.id},parent_path='${parentPath}' where id=${arg.idSrc};`
  sql += `UPDATE tree set m_time='${new Date().date2Str()}',depth=depth+${depthAdd},parent_path=REPLACE(parent_path, 
    '${sonSrcParentPath}', '${sonDestParentPath}') where parent_path like '${sr.parent_path}${sr.id},%'`
  let r = await transSql(sql)
  if (r === -1) {
    return { code: 500, msg: `数据库异常` }
  }
  return { code: 0, data: {} }
}

// 修改某节点信息
async function modify(arg) {
  if (arg.id < 0) {
    return { code: 400, msg: `父节点id错误` }
  }
  if (arg.name.length < 1 && arg.jsonExtend.length < 1) {
    return { code: 400, msg: `名称或额外字段 至少需要修改一项` }
  }
  if (arg.jsonExtend) {
    try {
      JSON.parse(arg.jsonExtend)
    } catch (error) {
      return { code: 400, msg: `扩展字段错误` }
    }
  }
  let tr = await db.tree.R({ id: arg.id, d_flag: 0 }, {}, {}, 1).run()
  if (tr === -1 || tr.length !== 1) {
    return { code: 400, msg: `id=${arg.id} 节点不存在` }
  }

  let updateObj = { m_time: new Date().date2Str() }
  if (arg.name.length > 0) {
    updateObj.name = arg.name
  }
  if (arg.jsonExtend.length > 0) {
    updateObj.json_extend = arg.jsonExtend
  }
  let r = await db.tree.U({ id: arg.id }, updateObj).run()
  if (r === -1) {
    return { code: 500, msg: `数据库异常` }
  }
  return { code: 0, data: {} }
}

// 删除多个节点
async function delMult(arg) {
  let list = []
  try {
    list = JSON.parse(arg.ids)
    if (list.length < 1) {
      return { code: 400, msg: `至少需要一个id` }
    }
    for (let i = 0; i < list.length; i++) {
      if (+list[i] > 0) {
      } else {
        return { code: 400, msg: `第${i + 1}个id错误` }
      }
    }
  } catch (error) {
    return { code: 400, msg: `id列表json解析异常` }
  }

  let parentPaths = []
  for (let i = 0; i < list.length; i++) {
    parentPaths.push(`parent_path like '%,${list[i]},%'`)
  }

  let sql = `UPDATE tree set d_flag=1,m_time='${new Date().date2Str()}' where id in (${list.join(',')}) or ${parentPaths.join(' or ')}`
  r = await db.tree.cmd(sql).run()
  if (r === -1) {
    return { code: 500, msg: `数据库异常` }
  }
  return { code: 0 }
}

// 删除某节点，同时下面的节点也被删除
async function del(arg) {
  if (arg.id < 1) {
    return { code: 400, msg: `节点id错误` }
  }
  let r = await db.tree.R({ id: arg.id, d_flag: 0 }, {}, {}, 1).run()
  if (r === -1) {
    return { code: 500, msg: `数据库异常` }
  }
  if (r.length !== 1) {
    return { code: 400, msg: `当前节点不存在！` }
  }
  let sql = `UPDATE tree set d_flag=1,m_time='${new Date().date2Str()}' where id=${arg.id} or parent_path LIKE '${r[0].parent_path}${arg.id},%'`
  r = await db.tree.cmd(sql).run()
  if (r === -1) {
    return { code: 500, msg: `数据库异常` }
  }
  return { code: 0 }
}

// 为某节点增加一个兄弟
async function addBrother(arg) {
  if (arg.id < 0) {
    return { code: 400, msg: `节点id错误` }
  }
  try {
    JSON.parse(arg.jsonExtend)
  } catch (error) {
    return { code: 400, msg: `扩展字段错误` }
  }
  let brother = null
  if (arg.id > 0) {
    let tr = await db.tree.R({ id: arg.id, d_flag: 0 }, {}, {}, 1).run()
    if (tr && tr.length === 1) {
      brother = tr[0]
    } else {
      return { code: 400, msg: `id=${arg.id} 节点不存在` }
    }
  }
  delete brother.id
  delete brother.d_flag
  brother.name = arg.name
  brother.json_extend = arg.jsonExtend
  brother.c_time = new Date().date2Str()
  brother.m_time = new Date().date2Str()

  let r = await db.tree.C(brother).run()
  if (r === -1) {
    return { code: 500, msg: `数据库异常` }
  }
  brother.id = r.insertId
  delete brother.c_time
  delete brother.m_time
  delete brother.parent_path
  return { code: 0, data: brother }
}

// 为某节点增加一批儿子
async function addChilds(arg) {
  if (arg.pid < 0) {
    return { code: 400, msg: `父节点id错误` }
  }
  let nameList = []
  let jsonExtendList = []
  let errMsg = ``
  try {
    errMsg = '名称列表解析错误'
    nameList = JSON.parse(arg.names)
    if (nameList.length < 1) {
      return { code: 400, msg: `名称必填` }
    }
    if (arg.jsonExtends) {
      errMsg = `扩展字段解析错误`
      jsonExtendList = JSON.parse(arg.jsonExtends)
      for (let i = 0; i < jsonExtendList.length; i++) {
        errMsg = `第${i + 1}个 扩展字段解析错误`
        JSON.parse(jsonExtendList[i])
      }
    }
  } catch (error) {
    return { code: 400, msg: errMsg }
  }
  let parentPath = `,0,`
  let pid = arg.pid || 0
  let depth = 1
  let parent = { project_id: 0, company_id: 0, }
  if (arg.pid > 0) {
    let tr = await db.tree.R({ id: arg.pid, d_flag: 0 }, {}, {}, 1).run()
    if (tr && tr.length === 1) {
      parent = tr[0]
      parentPath = `${tr[0].parent_path}${arg.pid},`
      depth = tr[0].depth + 1
    } else {
      return { code: 400, msg: `pid=${arg.pid} 节点不存在` }
    }
  }

  let obj = {
    project_id: parent.project_id,
    company_id: parent.company_id,
    pid,
    depth,
    parent_path: parentPath,
    json_extend: '{}',
    c_time: new Date().date2Str(),
    m_time: new Date().date2Str()
  }
  let sql = ''
  for (let i = 0; i < nameList.length; i++) {
    obj.name = nameList[i]
    if (arg.jsonExtends) {
      obj.json_extend = jsonExtendList[i] || '{}'
    }
    sql += db.tree.C(obj).get()
  }
  let r = await transSql(sql)
  if (r === -1) {
    return { code: 500, msg: `数据库异常` }
  }
  return { code: 0, data: {} }
}

// 为某节点增加一个儿子
async function addChild(arg) {
  if (arg.id < 0) {
    return { code: 400, msg: `父节点id错误` }
  }
  try {
    JSON.parse(arg.jsonExtend)
  } catch (error) {
    return { code: 400, msg: `扩展字段错误` }
  }
  let parentPath = `,0,`
  let pid = arg.id || 0
  let depth = 1
  let parent = { project_id: 0, company_id: 0, }
  if (arg.id > 0) {
    let tr = await db.tree.R({ id: arg.id, d_flag: 0 }, {}, {}, 1).run()
    if (tr && tr.length === 1) {
      parent = tr[0]
      parentPath = `${tr[0].parent_path}${arg.id},`
      depth = tr[0].depth + 1
    } else {
      return { code: 400, msg: `id=${arg.id} 节点不存在` }
    }
  }

  let obj = {
    project_id: parent.project_id,
    company_id: parent.company_id,
    pid,
    depth,
    parent_path: parentPath,
    name: arg.name,
    json_extend: arg.jsonExtend,
    c_time: new Date().date2Str(),
    m_time: new Date().date2Str()
  }

  let r = await db.tree.C(obj).run()
  if (r === -1) {
    return { code: 500, msg: `数据库异常` }
  }
  obj.id = r.insertId
  delete obj.c_time
  delete obj.m_time
  delete obj.parent_path
  return { code: 0, data: obj }
}

// 获取某id的第一层儿子
async function getSon(arg) {
  if (arg.id < 1) {
    return { code: 400, msg: `节点id错误` }
  }
  let r = await db.tree.R({ pid: arg.id, d_flag: 0 }).run()
  if (r === -1) {
    return { code: 500, msg: `数据库异常` }
  }
  let list = []
  for (let i = 0; i < r.length; i++) {
    const item = r[i]
    list.push({
      id: item.id,
      projectId: item.project_id,
      companyId: item.company_id,
      pid: item.pid,
      depth: item.depth,
      name: item.name,
      jsonExtend: JSON.parse(item.json_extend)
    })
  }
  return { code: 0, data: { list } }
}

// 获取某id的所有儿子
async function getSons(arg) {
  if (arg.id < 1) {
    return { code: 400, msg: `节点id错误` }
  }
  let parentPath
  let r = await db.tree.R({ id: arg.id, d_flag: 0 }, {}, {}, 1).run()
  if (r && r.length === 1) {
    parentPath = r[0].parent_path
  } else {
    return { code: 400, msg: `当前节点不存在` }
  }
  let list = await getAllSonNode(arg.id, parentPath)
  return { code: 0, data: { list } }
}

// 根据id获取某节点详情
async function getId(arg) {
  if (arg.id < 1) {
    return { code: 400, msg: `节点id错误` }
  }
  let data = {}

  let r = await db.tree.R({ id: arg.id, d_flag: 0 }, {}, {}, 1).run()
  if (r && r.length === 1) {
    data = {
      id: arg.id,
      projectId: r[0].project_id,
      companyId: r[0].company_id,
      pid: r[0].pid,
      depth: r[0].depth,
      name: r[0].name,
      jsonExtend: JSON.parse(r[0].json_extend)
    }
  } else {
    return { code: 400, msg: `当前节点不存在` }
  }

  if (arg.type === 1) { // 全部读取  主要读取 儿子节点
    data.child = await getAllSonNode(r[0])
  }
  return { code: 0, data }
}

async function getAllSonNode(id, parentPath) {
  let sql = `SELECT * from tree where parent_path like '${parentPath}${id},%' ORDER BY depth`
  let r = await db.tree.cmd(sql).run()
  if (!r || r === -1) {
    $.err(`数据库执行异常 sql=${sql}`)
    return []
  }
  let list = []
  let m = {}
  for (let i = 0; i < r.length; i++) {
    const item = r[i]
    m[item.id] = {
      id: item.id,
      projectId: item.project_id,
      companyId: item.company_id,
      pid: item.pid,
      depth: item.depth,
      name: item.name,
      jsonExtend: JSON.parse(item.json_extend),
      child: []
    }

    if (item.pid === id) {
      list.push(m[item.id])
    } else {
      let tp = m[item.pid]
      if (!tp) {
        $.err(`node.id=${id} item.id=${item.id} 找不到父节点 pid=${item.pid} `)
        continue
      }
      tp.child.push(m[item.id])
    }
  }
  return list
}

async function transSql(sql) {
  let pool = db._mysql
  let conn = await pool.getConnection()
  try {
    // let sql = `insert into test (v1) values(3);;;;insert into test (v) values(3)`
    let sqlAry = sql.split(';')
    let r = []
    sqlAry = sqlAry.filter(item => {
      return item.length > 0
    })
    await conn.beginTransaction()
    for (let i = 0; i < sqlAry.length; i++) {
      r[i] = await conn.query(sqlAry[i])
    }
    await conn.commit()
    await conn.release()
    return r
  } catch (e) {
    await conn.rollback()
    await conn.release()
    $.err('transSql Error sql ->', sql, '\n', e.stack)
    return -1
  }
}