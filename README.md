# skybase-tree main tree CURD

### 安装依赖

```bash
$ npm i
```

### 当前工具
    1、id服务
    2、短信模块

### 本地配置设置 - ./config/config.local.js
```js
module.exports = {
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
}
```

### 启动项目

```bash
$ node index.js
```

### 访问相应api

```
http://localhost:13000/skyapi/tree
http://localhost:13000/skyapi/tree/getSon
http://localhost:13000/skyapi/tree/getSons
http://localhost:13000/skyapi/tree/addChild
http://localhost:13000/skyapi/tree/addChilds
http://localhost:13000/skyapi/tree/addBrother
http://localhost:13000/skyapi/tree/del
http://localhost:13000/skyapi/tree/delMult
http://localhost:13000/skyapi/tree/modify
http://localhost:13000/skyapi/tree/move
http://localhost:13000/skyapi/tree/copy
```

### 根据id获取某节点详情

根据id获取某节点详情

**地址**： `/skyapi/tree`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| id | 是 | number | 默认：无<br> | **节点id**<br>节点id |



**200返回说明**：



```json
{
  "data": {
    "id": 2,
    "projectId": 0,
    "companyId": 0,
    "pid": 1,
    "depth": 2,
    "name": "菜单1",
    "jsonExtend": {}
  },
  "code": 200,
  "msg": "成功",
  "t": 1562580707790
}
```

---



### 获取某id的第一层儿子

获取某id的第一层儿子

**地址**： `/skyapi/tree/getSon`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| id | 是 | number | 默认：无<br> | **节点id**<br>节点id |



**200返回说明**：



```json
{
  "data": {
    "list": [
      {
        "id": 5,
        "projectId": 0,
        "companyId": 0,
        "pid": 4,
        "depth": 2,
        "name": "表单1",
        "jsonExtend": {}
      }
    ]
  },
  "code": 200,
  "msg": "成功",
  "t": 1562639605988
}
```

---



### 获取某id的所有儿子

获取某id的所有儿子

**地址**： `/skyapi/tree/getSons`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| id | 是 | number | 默认：无<br> | **节点id**<br>节点id |



**200返回说明**：



```json
{
  "data": {
    "list": [
      {
        "id": 12,
        "projectId": 0,
        "companyId": 0,
        "pid": 2,
        "depth": 3,
        "name": "表单2",
        "jsonExtend": {},
        "child": [
          {
            "id": 13,
            "projectId": 0,
            "companyId": 0,
            "pid": 12,
            "depth": 4,
            "name": "表单2",
            "jsonExtend": {},
            "child": []
          }
        ]
      }
    ]
  },
  "code": 200,
  "msg": "成功",
  "t": 1562639910027
}
```

---



### 为某节点增加一个儿子

为某节点增加一个儿子

**地址**： `/skyapi/tree/addChild`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| id | 否 | number | 默认：无<br> | **父节点id**<br>父节点id |
| name | 是 | string | 默认：无<br> | **当前节点名称**<br>当前节点名称 |
| jsonExtend | 否 | string | 默认：{}<br> | **扩展字段**<br>扩展字段 |



**200返回说明**：



```json
{
  "data": {
    "project_id": 0,
    "company_id": 0,
    "pid": 0,
    "depth": 1,
    "name": "节点",
    "json_extend": "{}",
    "id": 10
  },
  "code": 200,
  "msg": "成功",
  "t": 1562578762596
}
```

---



### 为某节点增加一批儿子

为某节点增加一批儿子

**地址**： `/skyapi/tree/addChilds`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| projectId | 否 | number | 默认：无<br> | **项目id**<br>项目id |
| companyId | 否 | number | 默认：无<br> | **公司id**<br>公司id |
| pid | 否 | number | 默认：无<br> | **父节点id**<br>父节点id |
| names | 是 | string | 默认：无<br> | **名称列表数组 jsonStr**<br>名称列表数组 jsonStr ["test", "asdf" , "fdas", "asdf"] |
| jsonExtends | 否 | string | 默认：无<br> | **扩展字段数组**<br>扩展字段数组 |



**200返回说明**：



```json
{
  "data": {},
  "code": 200,
  "msg": "成功",
  "t": 1562578762596
}
```

---



### 为某节点增加一个兄弟

为某节点增加一个兄弟

**地址**： `/skyapi/tree/addBrother`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| id | 是 | number | 默认：无<br> | **节点id**<br>节点id |
| name | 是 | string | 默认：无<br> | **当前节点名称**<br>当前节点名称 |
| jsonExtend | 否 | string | 默认：{}<br> | **扩展字段**<br>扩展字段 |



**200返回说明**：



```json
{
  "data": {
    "project_id": 0,
    "company_id": 0,
    "pid": 0,
    "depth": 1,
    "name": "节点",
    "json_extend": "{}",
    "id": 10
  },
  "code": 200,
  "msg": "成功",
  "t": 1562578762596
}
```

---



### 删除某节点，同时下面的节点也被删除

删除某节点，同时下面的节点也被删除

**地址**： `/skyapi/tree/del`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| id | 是 | number | 默认：无<br> | **节点id**<br>节点id |



**200返回说明**：



```json
{
  "data": {},
  "code": 200,
  "msg": "成功",
  "t": 1562578762596
}
```

---



### 删除多个节点

删除多个节点

**地址**： `/skyapi/tree/delMult`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| ids | 是 | string | 默认：无<br> | **节点id 列表**<br>节点id 列表 [1,2,3,4,5] |



**200返回说明**：



```json
{
  "data": {},
  "code": 200,
  "msg": "成功",
  "t": 1562578762596
}
```

---



### 修改某节点信息

修改某节点信息

**地址**： `/skyapi/tree/modify`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| id | 否 | number | 默认：无<br> | **父节点id**<br>父节点id |
| name | 否 | string | 默认：无<br> | **当前节点名称**<br>当前节点名称 |
| jsonExtend | 否 | string | 默认：无<br> | **扩展字段**<br>扩展字段 |



**200返回说明**：



```json
{
  "data": {
    "project_id": 0,
    "company_id": 0,
    "pid": 0,
    "depth": 1,
    "name": "节点",
    "json_extend": "{}",
    "id": 10
  },
  "code": 200,
  "msg": "成功",
  "t": 1562578762596
}
```

---



### 移动整个节点到，另一节点下成为儿子

移动整个节点到，另一节点下成为儿子

**地址**： `/skyapi/tree/move`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| idSrc | 是 | number | 默认：无<br> | **原节点id**<br>原节点id |
| idDest | 是 | number | 默认：无<br> | **目标节点id**<br>目标节点id |



**200返回说明**：



```json
{
  "data": {},
  "code": 200,
  "msg": "成功",
  "t": 1562578762596
}
```

---



### 复制节点到，另一节点下成为儿子

复制节点到，另一节点下成为儿子

**地址**： `/skyapi/tree/copy`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| idSrc | 是 | number | 默认：无<br> | **原节点id**<br>原节点id |
| idDest | 是 | number | 默认：无<br> | **目标节点id**<br>目标节点id |



**200返回说明**：



```json
{
  "data": {},
  "code": 200,
  "msg": "成功",
  "t": 1562578762596
}
```

---
