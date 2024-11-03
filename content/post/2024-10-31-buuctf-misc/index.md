---
title: 【更新中】buuctf杂项misc解密记录
date: 2024-10-31
slug: buuctf-misc
image: cover.png
tag: 
    - CTF
    - 网络安全
    - misc
categories: 
    - 网络安全

---

## 签到

`flag{buu_ctf}`

## 金三胖

给定GIF文件，可以很明显看到flag文字，对文件进行拆解，在`20`、`50`与`78`帧找到flag：

![20](j_20.png) ![50](j_50.png) ![78](j_78.png)

## 你竟然赶我走

查看文件元数据，末尾得到flag：

![sc1](sc1.png)

`flag{stego_is_s0_bor1ing}`

## 二维码

![qrcode](QR_code.png)

直接扫码得到flag...并没有，扫码得到：`secret is here`

十六进制分析，发现有zip文件，使用`binwalk`分离，发现有一个名为`4number.txt`加密文件，使用`APCHPR`秒了：

````
Advanced Archive Password Recovery 统计信息:
加密的 ZIP/RAR/ACE/ARJ 文件: D:\BUU\misc\二维码\_QR_code.png.extracted\1D7.zip
总计口令: 8,741
总计时间: 10ms 
平均速度(口令/秒): 874,100
这个文件的口令 : 7639
十六进制口令: 37 36 33 39 
````

得到`CTF{vjpw_wnoei}`

## 大白

修复图片长宽高，得到:`flag{He1l0_d4_ba1}`

![dabai](dabai.png)

## 乌镇峰会种图

同[你居然赶我走](#你竟然赶我走)，查看文件元数据末尾得到flag：

`flag{97314e7864a8f62627b26f3f998c37f1}`

## wireshark

用`wireshark`打开，查找关键词找到password：

![wireshark](wireshark'.png)

`flag{ffb7567a1d4f4abdffdb54e022f8facd}`

## N种方法解决

下载下来发现是`.exe`文件，直接运行失败，拖到`IDA pro`里查看，发现其开头为`data:image/jpg;base64`后跟一串base64，将它转换为图片：

![n1](n1.png)

扫码得到：`KEY{dca57f966e4e4e31fd5b15417da63269}`

## 基础破解

> 给你一个压缩包，你并不能获得什么，因为他是四位数字加密的哈哈哈哈哈哈哈。。。不对= =我说了什么了不得的东西。。

使用`APCHPR`秒了：`2563`

解压得到flag.txt，内容`ZmxhZ3s3MDM1NDMwMGE1MTAwYmE3ODA2ODgwNTY2MWI5M2E1Y30=`

base64解码: `flag{70354300a5100ba78068805661b93a5c}`

## 文件中的秘密

下载，直接查看图片属性，得到flag：`flag{870c5a72806115cb5439345d8b014396}`

![secret](secret1.png)

## zip伪加密

谜底出在谜面上，对它使用zip伪加密修复把！

得到flag.txt:`flag{Adm1N-B2G-kU-SZIP}`

## LSB

使用`Stegsolve.jar`提取RGB通道数据，得到二维码：

![out](out.png)

扫描得到：`cumtctf{1sb_i4_s0_Ea4y}`