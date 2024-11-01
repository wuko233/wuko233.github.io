---
title: 从无到有丨零基础个人博客搭建
date: 2021-05-15
slug: buildblog
categories: 
    - web
tags:
    - Wordpress
    - web
---

<!-- wp:paragraph -->

**该页面为原wp发布内容，转md格式后可能会有部分格式异常**


<span class="has-inline-color has-cyan-bluish-gray-color">这是个广告:如果您需要人工搭建却不会或懒得动手，可以联系我人工搭建(有偿)，请联系邮箱admin@wuko.top或微信wuko233(请备注来意)，感谢支持。</span>

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

相信很多人都像我一样想要一个在互联网上一个属于自己的小天地，可以实现这个愿望的，除了依托于各大网站的空间功能，我们还可以搭建一个完全属于你的个人博客，不但相对第三方平台更加独立，而且更加便于交流，你的文章也不会因平台说没就没。<s>(除非删库跑路)</s>

<!-- /wp:paragraph -->

本篇文章会以纯小白的视角来从零开始介绍，还可以搭配网络上的教程视频配合食用。[heimu]虽然安装wordpress为全傻瓜操作，但我还是决定写这篇教程，绝对不是因为建站快一年一篇正式文章也没有写而来凑数的！([/heimu]

<iframe src="//music.163.com/outchain/player?type=2&id=833263&auto=0&height=66" frameborder="0" width="100%" height="86px">
</iframe>


<!-- wp:heading {"level":3} -->

### **一，准备工作**

<!-- /wp:heading -->

[danger]能够上网的设备一台(如手机，电脑、智能冰箱等)

善于理解的大脑与勤善于实践的手

最好自备科学[/danger]

<!-- wp:paragraph -->

**1，服务器的准备**

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

想要安放你那无处安放的魅力，就需要有一台服务器(或虚拟主机)来储存你的网站。你可以选择在各大服务器商购买服务器/虚拟主机(如阿里云，西部数码等)，也可以选择其它云的免费主机服务。**<span class="has-inline-color has-vivid-red-color">但值得注意的是，这些主机大都可能会随时跑路，如果你不是像我一样是家境贫寒学生党，还请尽量购买大厂服务器。</span>**

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

**购买服务器时，要注意服务器的配置与流量，一般来说，1核2G内存足够带动你的个人博客。除了注意配置，还需注意服务器的系统与你想要装的博客系统之间的兼容性，如我们下面要安装的Wordpress就需要Linux系统。**

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

除系统外，你还需要注意服务器的位置，若服务器位于国内(香港澳门台湾除外)，你还需要对自己的域名进行**备案**，未备案的域名**无法使用国内服务器**。

<!-- /wp:paragraph -->

[heimu]除购买服务器外，你还可以将自己的移动设备或电脑用作服务器，再加上内网穿透即可实现服务器功能，但该方法不但需要支付内网穿透费用，对你的设备也会有不小的损耗，且方法繁琐，只适合喜欢鼓捣的老哥鼓捣。[/heimu]

<!-- wp:paragraph -->

**2，域名的准备**

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

除服务器外，第二重要的便是域名了。在域名方面你可以选择**顶级域名**(xxx.xxx)与**二级域名**(xxx.xxxx.xxx)。网络上有许多免费的二级域名解析，但极易被浏览器或通讯软件标记为危险网站。顶级域名除tk、ml等非洲国家顶级域名外，均需购买，且价格不等(尤其是溢价域名(;´Д`))，可根据需求查看各大域名商价位表(如阿里万网、西部数码等)。

<!-- /wp:paragraph -->

<!-- wp:html -->

值得一提，你的域名会极大程度的影响你的**SEO**(搜索引擎优化，利用搜索引擎的规则提高网站在有关搜索引擎内的自然排名)，二级域名基本可以不用想了，而免费的顶级域名也基本不会有SEO，所以还是建议购买顶级域名。

<!-- /wp:html -->

<!-- wp:paragraph -->

在域名的选择上，一定要简洁、明了、好记、干净。

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### **二，正式开始**

<!-- /wp:heading -->

<!-- wp:paragraph -->

**1，域名DNS解析与绑定服务器**

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

在你购买域名后，大都会指引你去DNS解析，你可以选择由域名商提供的DNS解析，也可以自行寻找其它服务商。

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

在你的主机控制面板中，找到"绑定域名"，内容大致如下图:

<!-- /wp:paragraph -->

<!-- wp:image {"id":27,"sizeSlug":"large"} -->
![27](超级截屏_20201018_141807_compress68-701x1024.jpg)

<!-- /wp:image -->

<!-- wp:paragraph -->

你只需要复制要解析的记录值，即域名/地址（红字）并记住解析类型（常见有A、CNAME等）。打开DNS解析，大致内容如下图:

<!-- /wp:paragraph -->

![28](超级截屏_20201018_141736_compress21-1024x913.jpg)
<!-- /wp:image -->

<!-- wp:paragraph -->

根据刚才主机面板的信息来选择记录类型，记录值填写你复制的内容，主机记录则填写你需要的二级域名，以域名wuko.top举例:主机记录:@，则解析后的域名为wuko.top；主机记录:www，则解析后的域名为www.wuko.top。根据你个人的需要来选择。

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

解析后，再返回主机控制面板，将你刚刚解析的域名绑定至主机。

<!-- /wp:paragraph -->

![29](超级截屏_20201018_141807_compress68-701x1024.jpg)
<!-- /wp:image -->

<!-- wp:heading {"level":4} -->

#### **2，下载与安装Wordpress**

<!-- /wp:heading -->

<!-- wp:paragraph -->

在上面的步骤中，你已经初步搭建好了你的网站，现在只需要为你的网站装一个对外展示的系统，[wordpress](https://wordpress.org/)。

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

打开[https://cn.wordpress.org/download/](https://cn.wordpress.org/download/)，点击下载最新版本wordpress的压缩包。

<!-- /wp:paragraph -->

![30](超级截屏_20201031_231215_compress22-1024x989.jpg)
<!-- /wp:image -->

<!-- wp:paragraph -->

<s>因wordpress服务器在国外，故下载速度感人，你可以用魔法或自行在网路上寻找压缩包下载，老版本也不要紧，安装后在服务器中再更新。</s>突然发现wp有中文官网，而且专门对国内进行了优化，速度还可以，所以把上面的链接改成了中文官网。

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

打开你的服务器控制面板，找到在线文件管理器，进入根目录，将你下载好的安装包上传并解压。

<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center"} -->

![31](超级截屏_20201031_233236_compress14-723x1024.jpg)

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

访问**"你的域名/wp-admin/install.php"**，一般情况下会出现下面的页面:

<!-- /wp:paragraph -->

![32](Screenshot_20210515182326_compress21-671x1024.jpg)

<!-- wp:paragraph -->

非一般情况下你可能会遇到诸如数据库不可用等问题，点击修复不管用可以尝试重启服务器、重启数据库，如果还有问题请百度或下面留言。

<!-- /wp:paragraph -->


![33](Screenshot_20210515182400_compress33-576x1024.jpg)]

<!-- wp:paragraph -->

点击下一步，根据提示语填入相应内容。确认无误后点击提交。

<!-- /wp:paragraph -->

![34](Screenshot_20210515182413_compress60-1024x839.jpg)

![35](Screenshot_20210515182430_compress19-576x1024.jpg)

<!-- wp:paragraph -->

点击**现在安装**，填写相关信息，注意:除用户名外大部分都可再次修改(大概)，用户名建议别叫admin，密码不要用数据库密码。填写完成后继续。

<!-- /wp:paragraph -->

![36](Screenshot_20210515182443_compress3-680x1024.jpg)

<!-- wp:paragraph -->

成功安装！开始你的Wordpress之旅吧！

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

点击**登录**访问博客后台，输入用户名密码即可进入控制面板。

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

访问**你的网站的域名**，即可进入博客前台。

<!-- /wp:paragraph -->

![37](Screenshot_20210515182510_compress25-576x1024.jpg)

![38](Screenshot_20210515193806-1024x546.jpg)<figcaption>**Hello World!**</figcaption>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->

### **三，写在最后**

<!-- /wp:heading -->

<!-- wp:paragraph -->

这篇文章从去年的10月18日开始编写，一直到今天21年的5月15日才完成，除了现实中的一些麻烦事，最主要还是我的拖延症，几个月前的计划已经排到了2022年(笑)。如您所见，本文所有操作均用手机完成(下半部分是安装在了之前的4c手机上，详情见 [旧手机利用计划'局域网离线观看+弹幕](http://wuko.top/index.php/2021/01/09/2687/))。

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

希望本篇文章能够给到您帮助，如果还有问题请留言[<s>或查看文章开头</s>](#ad)。感谢您阅读本文！共勉！

<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"right"} -->

2021.5.15

<!-- /wp:paragraph -->

