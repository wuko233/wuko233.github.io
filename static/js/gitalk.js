var gitalk = new Gitalk({
  clientID: '107ccf93ebf75ad753bf', //上面申请的Client ID
  clientSecret: '22481d8d165b256890d7b3ac34017dd1e9742a24', //上面申请的Client Secret
  repo: 'wuko233/wuko233.github.io', //GitHub仓库，评论可以在里面查询
  owner: 'wuko233', //GitHub的用户名
  admin: ['wuko233'], //这里也是填GitHub的用户名，不过是数组形式，如['user1','user2']
  id: location.pathname,    
  title: document.title,
  body:  '文章链接：'+ decodeURIComponent(location.origin+location.pathname),
  distractionFreeMode: false
})
gitalk.render('gitalk-container');    // 渲染Gitalk评论组件