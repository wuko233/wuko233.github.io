---
title: ctf reverse解题+学习
date: 2024-11-26
description: 详细解题过程与心得。小学就接触的项目（指安卓逆向破解游戏XD
slug: letzreverseit
image: cover.jpg
tag: 
    - CTF
    - 网络安全
    - reverse
    - 逆向
categories: 
    - 网络安全

---

> [平台]题目

## [BUU]easyre

IDA pro查看伪代码快捷键`F5`

````c
int __fastcall main(int argc, const char **argv, const char **envp)
{
  int b; // [rsp+28h] [rbp-8h] BYREF
  int a; // [rsp+2Ch] [rbp-4h] BYREF

  _main();
  scanf("%d%d", &a, &b);
  if ( a == b )
    printf("flag{this_Is_a_EaSyRe}");
  else
    printf("sorry,you can't get flag");
  return 0;
}
````

EZ，`flag{this_Is_a_EaSyRe}`

## [BUU]reverse1

IDA Pro查看字符串类型快捷键：`Shift + F12`

直接找到了`.data:000000014001C000	0000000E	C	{hello_world}`

但提交并不对，继续查找，找到：

````
.rdata:0000000140019C90	00000019	C	this is the right flag!\n
````

双击进入，查看是哪段函数调用了该字符串`Ctrl + X`:

````c
  sub_1400111D1("input the flag:");
  sub_14001128F("%20s", Str1);
  v5 = j_strlen(Str2);
  if ( !strncmp(Str1, Str2, v5) )
    sub_1400111D1("this is the right flag!\n");
  else
    sub_1400111D1("wrong flag\n");
  return 0;
````

`strcmp`判断str1与str2是否相等，str1是输入的字符串，所以str2应该就是flag的值，点击str2高亮它，发现它上面经过了一个处理：

````c
for ( j = 0; ; ++j )
  {
    v10 = j;
    if ( j > j_strlen(Str2) )
      break;
    if ( Str2[j] == 111 )
      Str2[j] = 48;
  }
````

可以看到，经过一个遍历，str2中的111被改变为48，这是ascii码，选中数字后按下`R`转化为字符：

````c
    if ( Str2[j] == 'o' )
      Str2[j] = '0';
````

双击str2，可以看到str2是`{hello_world}`，那么flag即为：`{hell0_w0rld}`

## [BUU]reverse2

一样的步骤，F5分析main:

````c
for ( i = 0; i <= strlen(&flag); ++i )
{
  if ( *(&flag + i) == 105 || *(&flag + i) == 114 )
    *(&flag + i) = 49;
}
````

R转换为字符：

````c
for ( i = 0; i <= strlen(&flag); ++i )
{
  if ( *(&flag + i) == 'i' || *(&flag + i) == 'r' )
    *(&flag + i) = '1';
}
````

遍历，如果字符是`i`或者`r`，转换为`1`。

双击flag:

````c
.data:0000000000601080 flag            db 7Bh                  ; DATA XREF: main+34↑r
.data:0000000000601080                                         ; main+44↑r ...
.data:0000000000601081 aHackingForFun  db 'hacking_for_fun}',0
````

其中`7Bh`R一下就是`{`

所以flag处理前是`{hacking_for_fun}`，处理后就是：`{hack1ng_fo1_fun}`

## [BUU]内涵的软件

`shift + F12`秒了...

`DBAPP{49d3c93df25caad81232130f3d2ebfad}`

但还是分析下：

````c
int __cdecl main_0(int argc, const char **argv, const char **envp)
{
  char v4[4]; // [esp+4Ch] [ebp-Ch] BYREF
  const char *v5; // [esp+50h] [ebp-8h]
  int v6; // [esp+54h] [ebp-4h]

  v6 = 5;
  v5 = "DBAPP{49d3c93df25caad81232130f3d2ebfad}";
  while ( v6 >= 0 )
  {
    printf(aD, v6);
    sub_40100A();
    --v6;
  }
  printf(
    "\n"
    "\n"
    "\n"
    "这里本来应该是答案的,但是粗心的程序员忘记把变量写进来了,你要不逆向试试看:(Y/N)\n");
  v4[0] = 1;
  scanf("%c", v4);
  if ( v4[0] == 89 )
  {
    printf(aOdIda);
    return sub_40100A();
  }
  else
  {
    if ( v4[0] == 78 )
      printf(asc_425034);
    else
      printf("输入错误,没有提示.");
    return sub_40100A();
  }
}
````

定义了字符串v5但是没有使用，所以是`忘记把变量写进来了`

## [BUU]新年快乐

`DIE`查壳：UPX(3.91)[NRV,best]

脱壳，虽然打不开程序了，但是ida可以分析了：

````c
strcpy(Str2, "HappyNewYear!");
*(_WORD *)Str1 = word_40306B;
memset(&Str1[2], 0, 0x1Eu);
printf("please input the true flag:");
scanf("%s", Str1);
if ( !strncmp(Str1, Str2, strlen(Str2)) )
  return puts(aThisIsTrueFlag);
else
  return puts(Buffer);
````

得到了`HappyNewYear!`

## [BUU]xor

````c
memset(__b, 0, 0x100uLL);
printf("Input your flag:\n");
get_line(__b, 256LL);
if ( strlen(__b) != 33 )
  goto LABEL_7;
for ( i = 1; i < 33; ++i )
  __b[i] ^= __b[i - 1];  //异或操作
if ( !strncmp(__b, global, 0x21uLL) )
  printf("Success");
else
LABEL_7:
  printf("Failed");
return 0;
````

输入`__b`，异或后与`global`进行比较，所以`global`应该是flag异或后的值。

提取`global`，`shift + E`导出数据：

![xor](xor.png)

python写一遍异或的部分:

````python
lst = [102, 10, 107, 12, 119, 38, 79, 46, 64, 17, 120, 13, 90, 59, 85, 17, 112, 25, 70, 31, 118, 34, 77, 35, 68, 14, 103, 6, 104, 15, 71, 50, 79, 0]
flag = chr(lst[0])

for i in range(1, len(lst)):
    flag += chr(lst[i] ^ lst[i - 1])
print(flag)

# flag{QianQiuWanDai_YiTongJiangHu}O
````

得到：`flag{QianQiuWanDai_YiTongJiangHu}`

## [BUU]reverse3

````c
nt __cdecl main_0(int argc, const char **argv, const char **envp)
{
  size_t v3; // eax
  const char *v4; // eax
  size_t v5; // eax
  char v7; // [esp+0h] [ebp-188h]
  char v8; // [esp+0h] [ebp-188h]
  signed int j; // [esp+DCh] [ebp-ACh]
  int i; // [esp+E8h] [ebp-A0h]
  signed int v11; // [esp+E8h] [ebp-A0h]
  char Destination[108]; // [esp+F4h] [ebp-94h] BYREF
  char Str[28]; // [esp+160h] [ebp-28h] BYREF
  char v14[8]; // [esp+17Ch] [ebp-Ch] BYREF

  for ( i = 0; i < 100; ++i )
  {
    if ( (unsigned int)i >= 0x64 )
      j____report_rangecheckfailure();
    Destination[i] = 0;
  }
  sub_41132F("please enter the flag:", v7);
  sub_411375("%20s", (char)Str);
  v3 = j_strlen(Str);
  v4 = (const char *)sub_4110BE(Str, v3, v14);
  strncpy(Destination, v4, 0x28u);
  v11 = j_strlen(Destination);
  for ( j = 0; j < v11; ++j )
    Destination[j] += j;
  v5 = j_strlen(Destination);
  if ( !strncmp(Destination, Str2, v5) )
    sub_41132F("rigth flag!\n", v8);
  else
    sub_41132F("wrong flag!\n", v8);
  return 0;
}
````

先查看`Str2`变量，得到值`e3nifIH9b_C@n@dH`，然后一步一步往上推。

````c
  for ( j = 0; j < v11; ++j )
    Destination[j] += j;
````

`Destination`为输入的flag后经过处理的字符串，在这个循环中又经过了位移处理：

每个字符向右偏移它位置的值。

举个例子就好理解了：

假设`Destination`为`{'A', 'B'}`，那么`A = A + 0`(A位于0)，`B = B + 1 = C`(B位于1，B+1为C，ASCII码)。

AI写个逆向脚本：

````python
original_str = "e3nifIH9b_C@n@dH"
result_str = ""
index = 0

for char in original_str:
    # 获取ASCII码 → 减索引 → 转回字符
    decoded_char = chr(ord(char) - index)
    result_str += decoded_char
    index += 1

print(result_str) #e2lfbDB2ZV95b3V9
````

`e2lfbDB2ZV95b3V9`

然后继续溯源，`sub_4110BE()`返回`sub_411AB0()`函数处理后的内容，先查看它传入411了什么参数：

````c
char v14[8];
v4 = (const char *)sub_4110BE(Str, v3, (int *)v14);
````

````c
void *__cdecl sub_411AB0(char *a1, unsigned int a2, int *a3)
{
  int v4; // [esp+D4h] [ebp-38h]
  int v5; // [esp+D4h] [ebp-38h]
  int v6; // [esp+D4h] [ebp-38h]
  int v7; // [esp+D4h] [ebp-38h]
  int i; // [esp+E0h] [ebp-2Ch]
  unsigned int v9; // [esp+ECh] [ebp-20h]
  int v10; // [esp+ECh] [ebp-20h]
  int v11; // [esp+ECh] [ebp-20h]
  void *v12; // [esp+F8h] [ebp-14h]
  char *v13; // [esp+104h] [ebp-8h]

  if ( !a1 || !a2 )
    return 0;
  v9 = a2 / 3;
  if ( (int)(a2 / 3) % 3 )
    ++v9;
  v10 = 4 * v9;
  *a3 = v10;
  v12 = malloc(v10 + 1);
  if ( !v12 )
    return 0;
  j_memset(v12, 0, v10 + 1);
  v13 = a1;
  v11 = a2;
  v4 = 0;
  while ( v11 > 0 )
  {
    byte_41A144[2] = 0;
    byte_41A144[1] = 0;
    byte_41A144[0] = 0;
    for ( i = 0; i < 3 && v11 >= 1; ++i )
    {
      byte_41A144[i] = *v13;
      --v11;
      ++v13;
    }
    if ( !i )
      break;
    switch ( i )
    {
      case 1:
        *((_BYTE *)v12 + v4) = aAbcdefghijklmn[(int)(unsigned __int8)byte_41A144[0] >> 2];
        v5 = v4 + 1;
        *((_BYTE *)v12 + v5) = aAbcdefghijklmn[((byte_41A144[1] & 0xF0) >> 4) | (16 * (byte_41A144[0] & 3))];
        *((_BYTE *)v12 + ++v5) = aAbcdefghijklmn[64];
        *((_BYTE *)v12 + ++v5) = aAbcdefghijklmn[64];
        v4 = v5 + 1;
        break;
      case 2:
        *((_BYTE *)v12 + v4) = aAbcdefghijklmn[(int)(unsigned __int8)byte_41A144[0] >> 2];
        v6 = v4 + 1;
        *((_BYTE *)v12 + v6) = aAbcdefghijklmn[((byte_41A144[1] & 0xF0) >> 4) | (16 * (byte_41A144[0] & 3))];
        *((_BYTE *)v12 + ++v6) = aAbcdefghijklmn[((byte_41A144[2] & 0xC0) >> 6) | (4 * (byte_41A144[1] & 0xF))];
        *((_BYTE *)v12 + ++v6) = aAbcdefghijklmn[64];
        v4 = v6 + 1;
        break;
      case 3:
        *((_BYTE *)v12 + v4) = aAbcdefghijklmn[(int)(unsigned __int8)byte_41A144[0] >> 2];
        v7 = v4 + 1;
        *((_BYTE *)v12 + v7) = aAbcdefghijklmn[((byte_41A144[1] & 0xF0) >> 4) | (16 * (byte_41A144[0] & 3))];
        *((_BYTE *)v12 + ++v7) = aAbcdefghijklmn[((byte_41A144[2] & 0xC0) >> 6) | (4 * (byte_41A144[1] & 0xF))];
        *((_BYTE *)v12 + ++v7) = aAbcdefghijklmn[byte_41A144[2] & 0x3F];
        v4 = v7 + 1;
        break;
    }
  }
  *((_BYTE *)v12 + v4) = 0;
  return v12;
}
````

AI分析，这是一个`Base64编码函数`:

````c
char* base64_encode(const void* input, size_t len, int* out_len);
````

解码得到：`{i_l0ve_you}`

## [BUU]helloword

下载，发现是安卓逆向，同样可以用`IDA Pro`解决：

新建项目，拖入主类`classes.dex`，加载过后，查看所有字符串`Shift+F12`，再接一个`Ctrl+F`查找，输入flag，找到：

`flag{7631a988259a00816deda84afb29430a}`

## [BUU]不一样的flag

找到主函数：

````c
int __cdecl __noreturn main(int argc, const char **argv, const char **envp)
{
  _BYTE v3[29]; // [esp+17h] [ebp-35h] BYREF
  int v4; // [esp+34h] [ebp-18h]
  int v5; // [esp+38h] [ebp-14h] BYREF
  int i; // [esp+3Ch] [ebp-10h]
  _BYTE v7[12]; // [esp+40h] [ebp-Ch] BYREF

  __main();
  v3[26] = 0;
  *&v3[27] = 0;
  v4 = 0;
  strcpy(v3, "*11110100001010000101111#");
  while ( 1 )
  {
    puts("you can choose one action to execute");
    puts("1 up");
    puts("2 down");
    puts("3 left");
    printf("4 right\n:");
    scanf("%d", &v5);
    if ( v5 == 2 )
    {
      ++*&v3[25];
    }
    else if ( v5 > 2 )
    {
      if ( v5 == 3 )
      {
        --v4;
      }
      else
      {
        if ( v5 != 4 )
LABEL_13:
          exit(1);
        ++v4;
      }
    }
    else
    {
      if ( v5 != 1 )
        goto LABEL_13;
      --*&v3[25];
    }
    for ( i = 0; i <= 1; ++i )
    {
      if ( *&v3[4 * i + 25] >= 5u )
        exit(1);
    }
    if ( v7[5 * *&v3[25] - 41 + v4] == 49 )
      exit(1);
    if ( v7[5 * *&v3[25] - 41 + v4] == 35 )
    {
      puts("\nok, the order you enter is the flag!");
      exit(0);
    }
  }
}
````

首先，它开头定义了一个字符数组`v3`，存放`*11110100001010000101111#`。

对代码分析可得，在经过多次输入操作后，满足`v7[5 * *&v3[25] - 41 + v4] == 35`后，也就是`v7[5 * *&v3[25] - 41 + v4] == '#'`，输出`ok, the order you enter is the flag!`，flag即是输入的命令。


AI分析，原来是个迷宫游戏：

````c
int __cdecl __noreturn main() {
    char game_map[27] = "*11110100001010000101111#"; // 5x5迷宫地图
    int current_col = 0;  // 当前列坐标
    int current_row = 0;  // 当前行坐标 (存储在game_map[25]的位置)
    int user_input;       // 用户输入的方向

    while(1) {
        // 打印操作选项
        puts("1 up\n2 down\n3 left\n4 right");
        scanf("%d", &user_input);

        // 根据输入调整坐标
        switch(user_input) {
            case 1: current_row--; break;    // 上移
            case 2: current_row++; break;    // 下移
            case 3: current_col--; break;    // 左移
            case 4: current_col++; break;    // 右移
            default: exit(1);                // 非法输入
        }

        // 边界检查（地图范围0-4）
        if(current_row < 0 || current_row >4 || current_col <0 || current_col >4) {
            exit(1); // 越界
        }

        // 获取当前位置的字符
        char current_cell = game_map[1 + 5*current_row + current_col]; // +1跳过首字符*

        if(current_cell == '1') {    // 撞到障碍物
            exit(1);
        } else if(current_cell == '#') { // 到达终点
            puts("Flag是你的操作序列!");
            exit(0);
        }
    }
}
````

对着箭画靶子，再来分析源代码：

`*&v3[25]`即是y轴坐标，输入2执行++，1执行--

`v4`即是x轴坐标，初始为零，输入3执行--，4执行++

`LABEL_13`用于处理异常

````c
for ( i = 0; i <= 1; ++i )  // 边界检查
    {
      if ( *&v3[4 * i + 25] >= 5u ) // 等价于 v3[25 + 4*i] 大于等于5
        exit(1); // 越界退出
    }
if ( v7[5 * *&v3[25] - 41 + v4] == '1' ) // 5 * 当前行 - 41 + 当前列
      exit(1); // 撞墙退出
if ( v7[5 * *&v3[25] - 41 + v4] == '#' )
      //输出成功
````
`v7` 的地址紧接在 `v3` 之后（栈空间连续）

`v7[0]` 对应 `v3[41]`（因为 `v7` 是 `_BYTE[12]`）

所以v7要刻意减去41，也就是转化为v3。

地图：

````
* 1 1 1 1
0 1 0 0 0
0 1 0 1 0
0 0 0 1 0
1 1 1 1 #
````

可以得到flag:

`222441144222`