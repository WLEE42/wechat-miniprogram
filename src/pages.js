module.exports = [
  {
    path: 'pages/start'
  },
  {
    path: 'pages/index' // 页面路径，同时是 vue 文件相对于 src 的路径
  },
  {
    path: 'pages/add'
  },
  {
    path: 'pages/setting'
  },
  {
    path: 'pages/main'
  },
  {
    path: 'pages/detail'
  },
  {
    path: 'invite/inviter_index',
    subPackage: true
  },
  {
    path: 'invite/invitee_index',
    subPackage: true
  },
  {
    path: 'invite/invite_add',
    subPackage: true
  },
  {
    path: 'invite/invite_detail',
    subPackage: true
  },
  {
    path: 'invite/invite_accept',
    subPackage: true
  },
  {
    path: 'stat/statistic_index',
    subPackage: true,
    config: {
      // 页面配置，即 page.json 的内容
      navigationBarTitleText: '统计'
    }
  },
  {
    path: 'stat/statistic_detail',
    subPackage: true,
    config: {
      // 页面配置，即 page.json 的内容
      navigationBarTitleText: '统计'
    }
  },
  {
    path: 'stat/statistic_accept',
    subPackage: true,
    config: {
      // 页面配置，即 page.json 的内容
      navigationBarTitleText: '统计'
    }
  },
  {
    path: 'stat/statistic_add',
    subPackage: true,
    config: {
      // 页面配置，即 page.json 的内容
      navigationBarTitleText: '统计'
    }
  }
]
