---
title: 【CTF】pwn学习之路
date: 2025-05-21
description: 小白初试pwn，会学会吗。。
slug: pwnpwnpwn
image: cover.jpg
tag: 
    - CTF
    - 网络安全
    - pwn
    - 逆向
categories: 
    - 网络安全

---

初学者。。用于记录学习过程与笔记。

## test_your_nc

先用`checksec`检查下：

![checksec1](./1-1.png)

1. **RELRO**  
   `Partial` → GOT 表可写（易被 `GOT overwrite` 攻击）。`Full` 时 GOT 只读更安全。

2. **STACK CANARY**  
   `未启用` → 栈溢出无检测，可直接覆盖返回地址。启用后栈破坏会崩溃。

3. **NX**  
   `开启` → 栈/堆不可执行。

4. **PIE**  
   `开启` → 代码地址随机化，需泄露地址。关闭则地址固定。

5. **RPATH/RUNPATH**  
   `未设置` → 无额外库路径，降低劫持风险。

6. **Symbols**  
   `64` → 保留符号（函数名等），易逆向分析。

7. **FORTIFY**  
   `未启用` → 无堆栈保护。

再拖到`IDA Pro`里看看:

![ida1](./1-2.png)

````c
int __fastcall main(int argc, const char **argv, const char **envp)
{
  system("/bin/sh");
  return 0;
}
````

直接调用`system()`函数进入shell，所以直接使用`netcat`连接靶机：

````bash
nc ip port
````

![nc1](./1-3.png)

发现直接连接上了，根目录就有flag，得到：`flag{b6588539-d35f-4fde-b2b9-8c56d7fb66bd}`