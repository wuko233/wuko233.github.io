---
title: checksec横表格不显示架构(arch)问题解决（不同版本安装）
date: 2025-06-11
description: 
slug: checksecInstallDiff
image: cover.jpg
tag: 
    - 网络安全
    - pwn
    - 逆向
categories: 
    - 网络安全
---

## 问题发现

在学pwn使用`checksec`时发现了一个问题：

别人的是竖着的，而且有arch：

```
[*] '/home/wuko233/Projects/pwn/pwn1_sctf_2016/pwn1_sctf_2016'
    Arch:       i386-32-little
    RELRO:      Partial RELRO
    Stack:      No canary found
    NX:         NX enabled
    PIE:        No PIE (0x8048000)
    Stripped:   No
```

但是我的是：

```
RELRO           STACK CANARY      NX            PIE             RPATH      RUNPATH      Symbols         FORTIFY Fortified       Fortifiable     FILE
Partial RELRO   No canary found   NX enabled    No PIE          No RPATH   No RUNPATH   73 Symbols        No    0               1               /home/wuko233/Desktop/pwn/
```

又不易读又看不到架构信息，导致我每次都得专门在IDA里看一次程序的架构信息，太麻烦了。

后来上网搜了下，其实是安装的版本问题：

## 问题原因：两个不同的checksec

我是直接执行了:

```bash
sudo apt install checksec
```

直接从系统包安装了checksec

实际应该是安装pwntool中的checksec

## 解决方案：安装pwntools的checksec

### 推荐方法：使用pipx

因为实体机用的Debian，装pip会PEP 668报错，，，kali好像也会，所以推荐用pipx安装：

```bash
# 安装pipx
sudo apt install pipx
pipx ensurepath

# 安装pwntools
pipx install pwntools

# 刷新环境变量
source ~/.bashrc  # 或source ~/.zshrc

# 使用pwntools的checksec
pwn checksec <your_binary>
```

### 替代方法：创建虚拟环境

python的虚拟环境= = ，难评...

```bash
# 创建虚拟环境
python3 -m venv pwn-env
source pwn-env/bin/activate

# 安装pwntools
pip install pwntools

# 使用checksec
pwn checksec <your_binary>
```

装完之后，用`checksec`是调用系统包里的checksec（没arch），用`pwn checksec`是使用的pwntools里的checksec，可以看到架构。

现在就可以：

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=2703922582&auto=0&height=66"></iframe>

乐