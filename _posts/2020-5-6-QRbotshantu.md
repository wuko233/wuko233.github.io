---
layout: mypost
title: [旧]QQ机器人:如何利用QRSpeed查看闪照？
date: 2020-6-20
categories: [QQbot]
---

Wed, 06 May 2020 16:54:26 +0000
<p>我的讨论群:877789015，欢迎加群共同进步！<a href="https://jq.qq.com/?_wv=1027&amp;k=WHAMgWba">戳我加群</a></p>
<h4>一，检测闪照</h4>
<!-- /wp:heading -->

<!-- wp:media-text {"mediaId":41,"mediaLink":"http://lingbingmwu.aote.xyz/?attachment_id=41","mediaType":"image","verticalAlignment":"center"} -->
<div class="wp-block-media-text alignwide is-stacked-on-mobile is-vertically-aligned-center">
<figure class="wp-block-media-text__media"><img class="wp-image-41" src="http://lingbingmwu.aote.xyz/wp-content/uploads/2020/06/IMG_20200504_144337.jpg" alt="" /></figure>
<div class="wp-block-media-text__content"><!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">成果展示</p>
<!-- /wp:paragraph --></div>
</div>
<p>首先，第一行需要能够检测到闪照:</p>
<pre class="wp-block-code"><code>[高级].*闪照.*</code></pre>
<p>其中，<strong>[高级]</strong>指高级信息，如闪照、xml信息等。因为在老版本QQ中，闪照消息为:[闪照]请使用新版手机QQ查看闪照。故我们只需要确定信息中有“闪照”二字，就能检测到闪照。</p>
<h4>二，获取闪照直链</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>我们已经检测到了闪照，接下来只需要把它以图片或直链形式反馈回来:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>我们要用到变量<strong>%FIMG0%</strong>。%FIMG0%的用法和%IMG0%差不多，都是用来表示图片的代号。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>首先，我们先新建一个变量A，设A值为<strong>1%FIMG0%</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>在A的下方再创建一个变量B，值为:$取中间 Э %A%Э1Э.$</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>(这里解释下，$取中间 Э 原内容Э开头Э结尾$，所以变量B意为取变量A中1与.之间的内容，在%FIMG0%前加个1就是为了方便，因为直接%FIMG0%后内容是XXX.图片格式)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>在我们写好上面的内容后，加上下面这段前缀，就是图片的直链。</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote">
<p>http://gchat.qpic.cn/gchatpic_new/2641296238/735524882-3219132080-%B%/0</p>
<cite>腾讯图片直链</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:heading {"level":4} -->
<h4>三，发送闪照</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>图片直链有了，图片也就好发了，只要用<strong>±img=图片直链/本地路径±</strong>就能把闪照发出去了！</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>例子:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>±img=http://gchat.qpic.cn/gchatpic_new/2641296238/735524882-3219132080-%B%/0±</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4} -->
<h4>四，完整实例</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>[hide reply_to_this="true"]</p>
<p>[高级].*闪照.*</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>A:1%FIMG0%</p>
<!-- /wp:paragraph -->

<!-- wp:group -->
<div class="wp-block-group">
<div class="wp-block-group__inner-container"><!-- wp:paragraph -->
<p>B:$取中间 Э %A%Э1Э.$±img=http://gchat.qpic.cn/gchatpic_new/2641296238/735524882-3219132080-%B%/0±</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>发送者:%昵称%(%QQ%)\r</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>http://gchat.qpic.cn/gchatpic_new/2641296238/735524882-3219132080-%B%/0</p>
<!-- /wp:paragraph --></div>
</div>
<p>[/hide]</p>
<p>&nbsp;</p>