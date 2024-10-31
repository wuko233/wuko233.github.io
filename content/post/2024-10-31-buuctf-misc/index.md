---
title: 【更新中】buuctf杂项misc解密记录
date: 2024-10-31
slug: buuctf-misc
image: cover.jpg
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