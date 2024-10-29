---
layout: mypost
title: 【旧】QQ机器人:如何用QRspeed调用json格式的API接口
date: 2020-6-20
categories: [QQbot]
---

Sat, 20 Jun 2020 02:41:12 +0000
<p>我的讨论群:877789015，欢迎加群共同进步！<a rel="noreferrer noopener" href="https://jq.qq.com/?_wv=1027&amp;k=WHAMgWba" target="_blank">戳我加群</a></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4} -->
<h4>一，认识JSON中的键与值</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>以下内容摘自:百度百科</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>JSON(JavaScript Object Notation, JS 对象简谱) 是一种轻量级的数据交换格式。它基于 ECMAScript (欧洲计算机协会制定的js规范)的一个子集，采用完全独立于编程语言的文本格式来存储和表示数据。</p></blockquote>
<!-- /wp:quote -->

<!-- wp:paragraph -->
<p>当然，你并不需要彻底了解JSON的格式用法，因为我们只需要用到一部分，所以你只需要记住键与值是什么意思，便于阅读下文。详情请看下图:</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":82,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="http://linko.dowy.cn/wp-content/uploads/2020/06/qrjson1.jpg" alt="" class="wp-image-82"/><figcaption>键与值</figcaption></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":4} -->
<h4>二，$访问$命令</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>想要调用api数据，就要先了解HTTP其中的两种请求方式:GET与POST。(什么是HTTP请自行使用搜索引擎，这里不多赘述)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>GET - 从指定的资源请求数据。</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>POST - 向指定的资源提交要被处理的数据</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>通俗来讲，GET就是直接获取，而POST是向服务器发送数据，服务器再返回结果。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>那我们如何在QR的词库中应用呢？那就要用到<strong>$访问$</strong>命令了。$访问$主要有两种格式，分别对应GET与POST:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>$访问 网址$</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>$访问 POST 网址 post参数$</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>因为大多数API接口都是GET方法，所以下面以GET形式为例。</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4} -->
<h4>三，应用</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>嘿嘿，我们这儿有一个API的接口，直接使用$访问 链接$或用浏览器访问，就会出现以下结果:</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":83,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="http://linko.dowy.cn/wp-content/uploads/2020/06/qrjson2.jpg" alt="" class="wp-image-83"/><figcaption>(静态的。。。仅供参考)</figcaption></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>但我们需要的是msg和content里的文本，那该怎么办呢？</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>先来看msg:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>API测试</strong> <em>//命令</em></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>A:$访问 xxxxxxxxx$</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>B:@A[msg]</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>首先，我们先将变量A赋予$访问$命令，接下来在变量B中赋予@%A%[键名] (解释一下，取一个键的值命令为@数据[键名])，这样，我们就能获得键msg的值A了。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>那么，如何获取data中content的值呢？其实是差不多的:</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":84,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="http://linko.dowy.cn/wp-content/uploads/2020/06/qrjson3.jpg" alt="" class="wp-image-84"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>我们来试试，可以看到，我们顺利的获取到了content的值:</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":85,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="http://linko.dowy.cn/wp-content/uploads/2020/06/qrjson4.jpg" alt="" class="wp-image-85"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>最后补充一下，一般提供api服务的都会标明提供的API的返回格式，请求方法，请求/返回参数等，根据个人需求来运用。</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":86,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="http://linko.dowy.cn/wp-content/uploads/2020/06/qrjson5.jpg" alt="" class="wp-image-86"/></figure>
<!-- /wp:image -->
