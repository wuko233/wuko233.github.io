---
layout: mypost
title: 记:天翼网关ZXHN F650V2.0.0P1T3超管破解
categories: [硬件]
date: 2022-3-21
---


# 前情提要

本地的电信免费给换了光猫(新光猫不带wifi功能...)旧光猫就没用了，所以能拿来瞎搞了。这次尝试破解其超级管理员密码。

[![OAdbDg.jpg](https://s1.ax1x.com/2022/05/03/OAdbDg.jpg)](https://imgtu.com/i/OAdbDg)

借鉴:[不拆机破解电信光猫的超级密码（适用于中兴ZXHN F650）](https://b23.tv/VTdqeQW)

<!-- more -->

# 设备信息(不一样可能会失效)

`设备类型

GPON天翼网关(4口单频)

产品型号

ZXHN F650

软件版本号

V2.0.0P1T3`

# 正文

因为先前这个网关的wifi是关闭着的，所以先用网线接到了电脑上，进入192.168.1.1输入默认用户密码打开了无线功能，方便后面用手机调试(因为本人电脑过于拉胯，故许多操作都用手机，实际上仅用电脑便可实现全部操作)。

插入U盘，打开网关储存管理中U盘文件管理。

下载抓包软件Fiddler，点击Rules--Automatic Breakpoints--Before Requests(汉化版为规则>自动断点>请求前)

返回浏览器文件管理界面，点击任意文件。

返回Fiddler，查看拦截下的请求，修改`body`中的`path`中的`value`为`/`。

终止拦截:点击Rules--Automatic Breakpoints--Disabled(汉化版为规则>自动断点>关闭)

返回浏览器网关界面，发现进入网关根目录。

进入`/userconfig/cfg`，找到`db_user_cfg.xml`后复制其至U盘，弹出U盘后插入至电脑。

下载软件`RouterPassView`(警惕p2p下崽器，误点请直接结束进程，血的教训)

打开RouterPassView，导入刚才的文件`db_user_cfg.xml`(CTRL+O)，`CTRL+F`搜索`telecomadmin`，然后就看到了你的超级管理账号和密码啦！

[![OAdqbQ.jpg](https://s1.ax1x.com/2022/05/03/OAdqbQ.jpg)](https://imgtu.com/i/OAdqbQ)

之后输入超管账号密码即可进入高级设置，记得关掉网关的远程通信以防止超级管理密码被远程修改。


