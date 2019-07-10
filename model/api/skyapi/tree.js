module.exports = {
  __swagger__: {
    name: '相关数据字典接口',
    description: '相关数据字典接口'
  },
  '/skyapi/tree': {
    name: '根据id获取某节点详情',
    desc: '根据id获取某节点详情',
    method: 'get',
    controller: 'skyapi/tree.getId',
    param: {
      id: {
        name: '节点id',
        desc: '节点id',
        req: 1,
        def: null,
        type: 'number'
      }
    },
    'token': false,
    'needSign': false,
    'err_code': {
      200: {
        temp: {
          'data': {
            'id': 2,
            'projectId': 0,
            'companyId': 0,
            'pid': 1,
            'depth': 2,
            'name': '菜单1',
            'jsonExtend': {}
          },
          'code': 200,
          'msg': '成功',
          't': 1562580707790
        }
      }
    },
    'test': {},
    'front': true
  },
  '/skyapi/tree/getSon': {
    name: '获取某id的第一层儿子',
    desc: '获取某id的第一层儿子',
    method: 'get',
    controller: 'skyapi/tree.getSon',
    param: {
      id: {
        name: '节点id',
        desc: '节点id',
        req: 1,
        def: null,
        type: 'number'
      }
    },
    'token': false,
    'needSign': false,
    'err_code': {
      200: {
        temp: {
          'data': {
            'list': [
              {
                'id': 5,
                'projectId': 0,
                'companyId': 0,
                'pid': 4,
                'depth': 2,
                'name': '表单1',
                'jsonExtend': {}
              }
            ]
          },
          'code': 200,
          'msg': '成功',
          't': 1562639605988
        }
      }
    },
    'test': {},
    'front': true
  },
  '/skyapi/tree/getSons': {
    name: '获取某id的所有儿子',
    desc: '获取某id的所有儿子',
    method: 'get',
    controller: 'skyapi/tree.getSons',
    param: {
      id: {
        name: '节点id',
        desc: '节点id',
        req: 1,
        def: null,
        type: 'number'
      }
    },
    'token': false,
    'needSign': false,
    'err_code': {
      200: {
        temp: {
          'data': {
            'list': [
              {
                'id': 12,
                'projectId': 0,
                'companyId': 0,
                'pid': 2,
                'depth': 3,
                'name': '表单2',
                'jsonExtend': {},
                'child': [
                  {
                    'id': 13,
                    'projectId': 0,
                    'companyId': 0,
                    'pid': 12,
                    'depth': 4,
                    'name': '表单2',
                    'jsonExtend': {},
                    'child': []
                  }
                ]
              }
            ]
          },
          'code': 200,
          'msg': '成功',
          't': 1562639910027
        }
      }
    },
    'test': {},
    'front': true
  },
  '/skyapi/tree/addChild': {
    name: '为某节点增加一个儿子',
    desc: '为某节点增加一个儿子',
    method: 'get',
    controller: 'skyapi/tree.addChild',
    param: {
      id: {
        name: '父节点id',
        desc: '父节点id',
        req: 0,
        def: 0,
        type: 'number'
      },
      name: {
        name: '当前节点名称',
        desc: '当前节点名称',
        req: 1,
        def: null,
        type: 'string'
      },
      jsonExtend: {
        name: '扩展字段',
        desc: '扩展字段',
        req: 0,
        def: '{}',
        type: 'string'
      }
    },
    'token': false,
    'needSign': false,
    'err_code': {
      200: {
        temp: {
          'data': {
            'project_id': 0,
            'company_id': 0,
            'pid': 0,
            'depth': 1,
            'name': '节点',
            'json_extend': '{}',
            'id': 10
          },
          'code': 200,
          'msg': '成功',
          't': 1562578762596
        }
      }
    },
    'test': {},
    'front': true
  },
  '/skyapi/tree/addChilds': {
    name: '为某节点增加一批儿子',
    desc: '为某节点增加一批儿子',
    method: 'get',
    controller: 'skyapi/tree.addChilds',
    param: {
      projectId: {
        name: '项目id',
        desc: '项目id',
        req: 0,
        def: 0,
        type: 'number'
      },
      companyId: {
        name: '公司id',
        desc: '公司id',
        req: 0,
        def: 0,
        type: 'number'
      },
      pid: {
        name: '父节点id',
        desc: '父节点id',
        req: 0,
        def: 0,
        type: 'number'
      },
      names: {
        name: '名称列表数组 jsonStr',
        desc: '名称列表数组 jsonStr ["test", "asdf" , "fdas", "asdf"]',
        req: 1,
        def: null,
        type: 'string'
      },
      jsonExtends: {
        name: '扩展字段数组',
        desc: '扩展字段数组',
        req: 0,
        def: '',
        type: 'string'
      }
    },
    'token': false,
    'needSign': false,
    'err_code': {
      200: {
        temp: {
          'data': {},
          'code': 200,
          'msg': '成功',
          't': 1562578762596
        }
      }
    },
    'test': {},
    'front': true
  },
  '/skyapi/tree/addBrother': {
    name: '为某节点增加一个兄弟',
    desc: '为某节点增加一个兄弟',
    method: 'get',
    controller: 'skyapi/tree.addBrother',
    param: {
      id: {
        name: '节点id',
        desc: '节点id',
        req: 1,
        def: null,
        type: 'number'
      },
      name: {
        name: '当前节点名称',
        desc: '当前节点名称',
        req: 1,
        def: null,
        type: 'string'
      },
      jsonExtend: {
        name: '扩展字段',
        desc: '扩展字段',
        req: 0,
        def: '{}',
        type: 'string'
      }
    },
    'token': false,
    'needSign': false,
    'err_code': {
      200: {
        temp: {
          'data': {
            'project_id': 0,
            'company_id': 0,
            'pid': 0,
            'depth': 1,
            'name': '节点',
            'json_extend': '{}',
            'id': 10
          },
          'code': 200,
          'msg': '成功',
          't': 1562578762596
        }
      }
    },
    'test': {},
    'front': true
  },
  '/skyapi/tree/del': {
    name: '删除某节点，同时下面的节点也被删除',
    desc: '删除某节点，同时下面的节点也被删除',
    method: 'get',
    controller: 'skyapi/tree.del',
    param: {
      id: {
        name: '节点id',
        desc: '节点id',
        req: 1,
        def: null,
        type: 'number'
      }
    },
    'token': false,
    'needSign': false,
    'err_code': {
      200: {
        temp: {
          'data': {},
          'code': 200,
          'msg': '成功',
          't': 1562578762596
        }
      }
    },
    'test': {},
    'front': true
  },
  '/skyapi/tree/delMult': {
    name: '删除多个节点',
    desc: '删除多个节点',
    method: 'get',
    controller: 'skyapi/tree.delMult',
    param: {
      ids: {
        name: '节点id 列表',
        desc: '节点id 列表 [1,2,3,4,5]',
        req: 1,
        def: null,
        type: 'string'
      }
    },
    'token': false,
    'needSign': false,
    'err_code': {
      200: {
        temp: {
          'data': {},
          'code': 200,
          'msg': '成功',
          't': 1562578762596
        }
      }
    },
    'test': {},
    'front': true
  },
  '/skyapi/tree/modify': {
    name: '修改某节点信息',
    desc: '修改某节点信息',
    method: 'get',
    controller: 'skyapi/tree.modify',
    param: {
      id: {
        name: '父节点id',
        desc: '父节点id',
        req: 0,
        def: 0,
        type: 'number'
      },
      name: {
        name: '当前节点名称',
        desc: '当前节点名称',
        req: 0,
        def: '',
        type: 'string'
      },
      jsonExtend: {
        name: '扩展字段',
        desc: '扩展字段',
        req: 0,
        def: '',
        type: 'string'
      }
    },
    'token': false,
    'needSign': false,
    'err_code': {
      200: {
        temp: {
          'data': {
            'project_id': 0,
            'company_id': 0,
            'pid': 0,
            'depth': 1,
            'name': '节点',
            'json_extend': '{}',
            'id': 10
          },
          'code': 200,
          'msg': '成功',
          't': 1562578762596
        }
      }
    },
    'test': {},
    'front': true
  },
  '/skyapi/tree/move': {
    name: '移动整个节点到，另一节点下成为儿子',
    desc: '移动整个节点到，另一节点下成为儿子',
    method: 'get',
    controller: 'skyapi/tree.move',
    param: {
      idSrc: {
        name: '原节点id',
        desc: '原节点id',
        req: 1,
        def: null,
        type: 'number'
      },
      idDest: {
        name: '目标节点id',
        desc: '目标节点id',
        req: 1,
        def: null,
        type: 'number'
      }
    },
    'token': false,
    'needSign': false,
    'err_code': {
      200: {
        temp: {
          'data': {},
          'code': 200,
          'msg': '成功',
          't': 1562578762596
        }
      }
    },
    'test': {},
    'front': true
  },
  '/skyapi/tree/copy': {
    name: '复制节点到，另一节点下成为儿子',
    desc: '复制节点到，另一节点下成为儿子',
    method: 'get',
    controller: 'skyapi/tree.copy',
    param: {
      idSrc: {
        name: '原节点id',
        desc: '原节点id',
        req: 1,
        def: null,
        type: 'number'
      },
      idDest: {
        name: '目标节点id',
        desc: '目标节点id',
        req: 1,
        def: null,
        type: 'number'
      }
    },
    'token': false,
    'needSign': false,
    'err_code': {
      200: {
        temp: {
          'data': {},
          'code': 200,
          'msg': '成功',
          't': 1562578762596
        }
      }
    },
    'test': {},
    'front': true
  }
}
