---
layout: mypost
title: 【分享】记一次成功的u盘量产
date: 2021-2-17
categories: [硬件]
---

Wed, 17 Feb 2021 04:22:39 +0000
<p>前情提要:家里有一个16g优盘，因不明原因计算机可识别无法读取（请插入磁盘H:/I:）</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>使用工具:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>WinXP</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>ChipGenius芯片精灵</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>SMI(慧荣)量产工具<strong>*</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><span class="has-inline-color has-cyan-bluish-gray-color">（量产工具须根据u盘主控型号选择）</span></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>1，ChipGenius芯片精灵</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>在互联网上搜索下载，尽量使用最新版本的芯片精灵</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>下载打开后，在<strong>USB设备列表</strong>中选定u盘，下方会出现详细信息:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>设备描述: &#91;H:]USB Mass Storage Device(USB MEMORY BAR)　
设备类型: 大容量存储设备　
协议版本: USB 2.00　
当前速度: 全速(FullSpeed)　
电力消耗: 100mA 
USB设备ID: VID = 090C PID = 3000
设备供应商: Silicon Motion,Inc.　
设备名称: SM3255AA MEMORY BAR
设备修订版: 0100　
产品型号: USB MEMORY BAR
产品修订版: 1000　
主控厂商: SMI(慧荣)　
<strong>主控型号: SM3257ENLT</strong> - ISP NONE
闪存识别码: ******* - SanDisk(闪迪) - 1CE/单通道 &#91;MLC] -> 
总容量 = 16GB　
在线资料: http://dl.mydigit.net/special/up/smi.html</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p><strong>2，量产工具</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>在<strong>详细信息</strong>中找到<strong>主控型号</strong>，Ctrl+c复制下来，在互联网上搜索<strong>型号+量产工具</strong>，比如我的是<strong>SM3257ENLT量产工具</strong>。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>下载打开量产工具</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>点击<strong>"Scan USB"</strong>或<strong>"扫描USB"</strong>，会出现下图样式：</p>
<!-- /wp:paragraph -->

[![OAtlQg.jpg](https://s1.ax1x.com/2022/05/03/OAtlQg.jpg)](https://imgtu.com/i/OAtlQg)

<!-- wp:image {"id":59,"sizeSlug":"large","linkDestination":"attachment"} -->
<figure class="wp-block-image size-large"><a href="http://wuko.top/?attachment_id=59"><img src="http://wuko.top/wp-content/uploads/2021/02/Screenshot_20210217113019_compress97-1024x751.jpg" alt="" class="wp-image-59"/></a></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>如果量产工具中未发现u盘，就再去尝试几个其它版本的量产工具，我也是试了几个量产工具后才成功。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>量产可以在<strong>"Setting"</strong>或<strong>"设置"</strong>中设置选项。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>选中显示Ready的项目，点击<strong>开始</strong>或<strong>Start</strong>，进行u盘量产，耐心等待……直到开始按钮上方出现大大的<strong>OK</strong>：</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":60,"sizeSlug":"large","linkDestination":"attachment"} -->
<figure class="wp-block-image size-large"><a href="http://wuko.top/?attachment_id=60"><img src="http://wuko.top/wp-content/uploads/2021/02/Screenshot_20210217113256_compress78-1024x758.jpg" alt="" class="wp-image-60"/></a><figcaption><span class="has-inline-color has-cyan-bluish-gray-color">截屏请只参考右上角OK</span></figcaption></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>打开我的电脑，进入u盘，测试读写，成功！</p>
<!-- /wp:paragraph -->

[![OAtwSU.jpg](https://s1.ax1x.com/2022/05/03/OAtwSU.jpg)](https://imgtu.com/i/OAtwSU)