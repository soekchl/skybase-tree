/* global $ */

const Tree = require('../../service/skyapi/tree.js')

module.exports = {
  async getId(ctx) {
    let r = await Tree.getId(ctx.checkedData.data)
    if (r.code === 0) {
      ctx.throwCode(200, '成功', r.data || {})
    } else {
      ctx.throwCode(r.code, r.msg, r.data || {})
    }
  },
  async getSon(ctx) {
    let r = await Tree.getSon(ctx.checkedData.data)
    if (r.code === 0) {
      ctx.throwCode(200, '成功', r.data || {})
    } else {
      ctx.throwCode(r.code, r.msg, r.data || {})
    }
  },
  async getSons(ctx) {
    let r = await Tree.getSons(ctx.checkedData.data)
    if (r.code === 0) {
      ctx.throwCode(200, '成功', r.data || {})
    } else {
      ctx.throwCode(r.code, r.msg, r.data || {})
    }
  },
  async addChild(ctx) {
    let r = await Tree.addChild(ctx.checkedData.data)
    if (r.code === 0) {
      ctx.throwCode(200, '成功', r.data || {})
    } else {
      ctx.throwCode(r.code, r.msg, r.data || {})
    }
  },
  async addChilds(ctx) {
    let r = await Tree.addChilds(ctx.checkedData.data)
    if (r.code === 0) {
      ctx.throwCode(200, '成功', r.data || {})
    } else {
      ctx.throwCode(r.code, r.msg, r.data || {})
    }
  },
  async addBrother(ctx) {
    let r = await Tree.addBrother(ctx.checkedData.data)
    if (r.code === 0) {
      ctx.throwCode(200, '成功', r.data || {})
    } else {
      ctx.throwCode(r.code, r.msg, r.data || {})
    }
  },
  async del(ctx) {
    let r = await Tree.del(ctx.checkedData.data)
    if (r.code === 0) {
      ctx.throwCode(200, '成功', r.data || {})
    } else {
      ctx.throwCode(r.code, r.msg, r.data || {})
    }
  },
  async delMult(ctx) {
    let r = await Tree.delMult(ctx.checkedData.data)
    if (r.code === 0) {
      ctx.throwCode(200, '成功', r.data || {})
    } else {
      ctx.throwCode(r.code, r.msg, r.data || {})
    }
  },
  async modify(ctx) {
    let r = await Tree.modify(ctx.checkedData.data)
    if (r.code === 0) {
      ctx.throwCode(200, '成功', r.data || {})
    } else {
      ctx.throwCode(r.code, r.msg, r.data || {})
    }
  },
  async move(ctx) {
    let r = await Tree.move(ctx.checkedData.data)
    if (r.code === 0) {
      ctx.throwCode(200, '成功', r.data || {})
    } else {
      ctx.throwCode(r.code, r.msg, r.data || {})
    }
  },
  async copy(ctx) {
    let r = await Tree.copy(ctx.checkedData.data)
    if (r.code === 0) {
      ctx.throwCode(200, '成功', r.data || {})
    } else {
      ctx.throwCode(r.code, r.msg, r.data || {})
    }
  }
}
