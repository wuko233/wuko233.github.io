---
layout: mypost
title: Termux启动语改为Screenfect
categories: [Termux] 
---

> 最近更新了下termux，结果配置被清了，启动语变成了原版，所以借此机会记录下修改termux启动语为screenfetch，以免下次忘记。

###  安装 _screenfetch_ 包:

`pkg install screenfetch`

### 输出至启动语文件

`screenfetch > $PREFIX/etc/motd`

### 新建活动窗口

![2021-12-04-img1.png](/posts/2021/2021-12-04-img1.png)

大功告成！


<!-- 属性什么的不要错了，最好用双引号括住 -->
<!-- 网易云的iframe需要做些调整，调整如下 -->
<iframe src="//music.163.com/outchain/player?type=2&id=22785170&auto=0&height=66" frameborder="0" width="100%" height="86px">
</iframe>
