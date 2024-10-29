---
layout: mypost
title: 记:Python导入不同路径文件
categories: [PYTHON]
---

最近写QQbot脚本的时候，遇到了一个问题：

需要在a.py文件中导入同目录下另一个文件夹plugins中的b.py文件。

[![7371ns.jpg](https://s4.ax1x.com/2022/01/14/7371ns.jpg)](https://imgtu.com/i/7371ns)

网上的方法稍加变动，最后实现了：

a.py:

````python
import sys

sys.path.append(sys.path[0] + "/plugins/")
import b

print(b.test())
`````

b.py:

````python
def test():
    text = "hi"
    return text
````

输出: `hi`

原理大概理解了:

先在终端里查看`sys.path`:

````python
>> print(sys.path)

>> ['/storage/emulated/0/1USER/termux/python', '/data/data/com.termux/files/usr/lib/python310.zip', '/data/data/com.termux/files/usr/lib/python3.10', '/data/data/com.termux/files/usr/lib/python3.10/lib-dynload', '/data/data/com.termux/files/usr/lib/python3.10/site-packages']
````

会发现默认的模块路径是一个列表，并且第一个就是我们所在的路径。

那么接下来想要导入不同路径的py文件，可以把它看做一个模块，再导入。

先在b.py所在路径创建一个`__init__.py`文件，模块默认必须得有此文件，可以为空也可以初始化一些数据。

然后在a.py中使用`append()`在`sys.path`列表中添加b.py所在的路径`/storage/emulated/0/1USER/termux/python/plugins/`，因为为了确保在不同设备运行，所以先获取运行的绝对路径`sys.path[0]`，然后再在后面加上`/plugins/`，所以就是:

````python
sys.path.append(sys.path[0] + "/plugins/")
````
最后导入b.py就可以了！

