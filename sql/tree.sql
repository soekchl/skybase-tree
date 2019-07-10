CREATE TABLE `tree` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '增量',
  `project_id` bigint(20) NOT NULL COMMENT '项目id',
  `company_id` bigint(20) NOT NULL COMMENT '公司Id',
  `pid` bigint(20) NOT NULL DEFAULT '0' COMMENT '父节点id',
  `depth` int(8) DEFAULT '1' COMMENT '深度',
  `parent_path` varchar(1024) DEFAULT ',0,' COMMENT '父节点路径',
  `name` varchar(256) CHARACTER SET utf8mb4 NOT NULL COMMENT '用户姓名',
  `json_extend` varchar(1024) CHARACTER SET utf8mb4 DEFAULT '{}' COMMENT '扩展字段',
  `c_time` datetime DEFAULT NULL COMMENT '创建时间',
  `m_time` datetime DEFAULT NULL COMMENT '修改时间',
  `d_flag` tinyint(4) DEFAULT '0' COMMENT '删除标志位',
  PRIMARY KEY (`id`),
  KEY `project_idx` (`project_id`),
  KEY `company_idx` (`company_id`),
  KEY `parent_idx` (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COMMENT='数据字典';
