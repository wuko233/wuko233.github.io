---
title: 记：ECS 云服务器初体验——搭建一个WP站点
date: 2022-07-23
description: 我又来搭博客了，嗨呀我天天搭博客的！（该文章算半个软文吧，靠这个白嫖了三个月服务器233）
slug: buildblog2
image: cover.jpg
categories: 
    - web
tags:
    - web
    - linux
    - 服务器

---

# 记：ECS 云服务器初体验——搭建一个WP站点

## 一，前言

本人为一名在校学生，未来方向为计算机软件工程。之前一直对于服务器有浓厚兴趣，并在本地也搭建过，但苦于没有公网地址以及专门的机器。经网上查阅以及朋友推荐，发现了阿里云的这个**飞天加速计划**，并成功领取到了一台ECS服务器。

相对于我之前使用智能手机搭建的服务器，它有许多优点：公网IP、更强大的性能、更稳定的运行、更完整的操作系统...这次就来一了我之前想要搭建一个网页导航的愿望。

环境：Ubuntu 20.04

## 二，连接服务器

一开始我打算使用我的PC连接，但因为win7并不自带ssh，遂手动安装，后也是成功连接到了服务器：
[![jX96dP.png](https://s1.ax1x.com/2022/07/23/jX96dP.png)](https://imgtu.com/i/jX96dP)
但ssh在我的win7系统中频繁崩溃，便打算在手机上用Termux连接到服务器，但...这不是又得戳屏幕吗？

就在我百思不得其解时，我发现在阿里云的控制面板中有一个名为**Workbench远程连接**的功能。在输入密码后，终于是可以开搞了。

[![jOpPrq.png](https://s1.ax1x.com/2022/07/22/jOpPrq.png)](https://imgtu.com/i/jOpPrq)

## 三，安装环境与依赖

### 安装Apache:

想要运行一个网站，就需要一个强大的后端。这里我选用了很多人都在用的 **Apache**。

使用apt命令安装Apache和他的拓展包：

`apt install apache2`

安装后用 `service apache2 status`查看状态：

[![jOCXa6.png](https://s1.ax1x.com/2022/07/22/jOCXa6.png)](https://imgtu.com/i/jOCXa6)

### 安装mysql:

`apt-get install mysql-server mysql-client`

同样使用 `service mysql status`查看状态

使用命令 **cat**查看默认密码 **/etc/mysql/debian.cnf**：

`sudo cat /etc/mysql/debian.cnf`

返回：

````

Automatically generated for Debian scripts. DO NOT TOUCH!

[client]
host     = localhost
user     = debian-sys-maint
password = ********
socket   = /var/run/mysqld/mysqld.sock
[mysql_upgrade]
host     = localhost
user     = debian-sys-maint
password = ********
socket   = /var/run/mysqld/mysqld.sock

````


记住你的密码（Password），后面要用到。

### 开放端口

在 **控制面板>网络与安全>安全组**中新增入方向：

[![jOiZ01.png](https://s1.ax1x.com/2022/07/22/jOiZ01.png)](https://imgtu.com/i/jOiZ01)

**注意：开放端口意味着其他人也可以在公网下访问你的服务器**

完成后访问 **http://YOURIP/**:

[![jOiKfO.png](https://s1.ax1x.com/2022/07/22/jOiKfO.png)](https://imgtu.com/i/jOiKfO)

成功工作！

### 安装PHP

`sudo apt install php libapache2-mod-php`

安装后重启Apache：

`sudo systemctl restart apache2`

使用 **echo** 命令创建一个PHP页面：

`echo "<?php phpinfo(); ?>" > /var/www/html/phpinfo.php`

访问 **http://YOURIP/phpinfo.php**，出现页面即为成功安装PHP

[![jOAip8.png](https://s1.ax1x.com/2022/07/22/jOAip8.png)](https://imgtu.com/i/jOAip8)

至此，所有的环境与依赖安装完毕。

## 四、wordpress的安装

下载Wordpress的安装包（建议直接下载到 **/var/www/**下）：

`wget https://cn.wordpress.org/latest-zh_CN.tar.gz`

下载后使用 **tar**命令解压：

`tar -xvf latest-zh_CN.tar.gz`

解压后切换到wordpress目录，使用 **cp**命令重命名示例配置文件为 **wp-config.php**

`cp wp-config-sample.php wp-config.php`

编辑它，将你的数据库信息放进去。

之后打开 **http://YOURIP/wordpress/wp-admin/install.php**，按照提示即可！

大功告成！

https://imgtu.com/i/jOX0HS)

## 五，踩到的坑与总结

### 初次接触MySQL，无法登陆root用户

原来只在内网环境下搭建过WP，当时只懂得对着教程CTRL+C/V。因为当时数据库和电脑是在同一个IP下，所以安装完MySQL后不用配置就直接可以安装WP；而这次数据库并不在本地，因此在本地连接时我遇到了这样的问题：

````sql
mysqli_real_connect(): (HY000/1698): Access denied for user 'root'@'localhost'
````

当时遇到这个问题，我卡了4个多小时，尝试过重启MySQL、Apache等等，但都没有解决。后来上网查发现可能是root用户主机设置的问题，于是在服务器进入查询：

````sql
>use mysql
>select host, user from user;
+-----------+------------------+
| host      | user             |
+-----------+------------------+
| localhost | root             |
| localhost | debian-sys-maint |
| localhost | mysql.infoschema |
| localhost | mysql.session    |
| localhost | mysql.sys        |
+-----------+------------------+
8 rows in set (0.00 sec)
````

果然我的root用户仅允许我在本地登录，于是我按照教程说的修改host：

````sql
update user set host='%' where user='root';

flush privileges;
````

查询后发现root的host确实变成了%，于是我再次尝试登录，却发现问题依然存在：

`mysqli_real_connect(): (HY000/1698): Access denied for user 'root'@'localhost'`

最后没招了，突然有个想法，新建一个用户并给予其最大权限：

````sql
CREATE USER 'pmauser'@'%' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON *.* TO 'pmauser'@'%' WITH GRANT OPTION;
````

然后用这个用户登录，果然成功登录！

### 上传的文件大小超过php.ini文件中定义的upload_max_filesize值。

在我为我的WP站点上传主题zip时，我遇到了这个问题。报错也非常明了，于是我在之前安装PHP时生成的phpinfo.php页面找到了我的php.ini文件路径：

````
Loaded Configuration File	/etc/php/7.4/apache2/php.ini
````

直接vim编辑，在里面找到了：

````ini
upload_max_filesize = 2M
````

修改为7M，这个问题解决！然后新的问题又出现了。

### 无法创建目录 wp-content/uploads/2022/07。它的父目录是否可以被服务器写入

修了一个bug,又出来一个，此时我心情复杂。继续上网查，发现可能是文件读取权限不够，于是直接使用**chmod**命令把www文件夹以及里面的文件权限都改为777：

```` shell
chmod -R 777 /www
````

后再次尝试，终于成功！

### 最后的话

这次很荣幸能试用这台ECS服务器，也了解到了许多之前没有了解过的领域：比如Apache、MySQL等等，并且又学到了许多新的Linux和SQL命令。也感谢阿里云能够推出这项活动来使全国各地的高校学生能够亲自上手体验一台云服务器。

## 六，成品展示

[![jOxc3d.png](https://s1.ax1x.com/2022/07/23/jOxc3d.png)](https://imgtu.com/i/jOxc3d)