---
title: 超详细教程：B站批量取关不活跃用户脚本
date: 2025-08-10
slug: bili-follow-cleaner
categories: 
    - Python
tags: 
    - B站
    - python
---

**工具名称：** bili-follow-cleaner（B站关注清理器）  
**功能说明：** 自动扫描B站关注列表，批量取关超过设定天数未发动态的用户  
**仓库地址：** [https://github.com/wuko233/bili-follow-cleaner](https://github.com/wuko233/bili-follow-cleaner)

---

2025年8月18日

**更新了release，现在windows用户可以直接下载已经编译好的程序直接运行：**

下载脚本程序 → [![Release](https://img.shields.io/github/v/release/wuko233/bili-follow-cleaner)](https://github.com/wuko233/bili-follow-cleaner/releases)

---

## 🔰 第一步：安装Python环境（5分钟）
> 这是运行脚本的基础，就像手机需要操作系统才能运行APP

1. **Windows用户**  
   - 访问[Python官网](https://www.python.org/downloads/)
   - 点击黄色按钮下载 **Python 3.9+** 版本
   - 安装时务必勾选 `Add Python to PATH`（重要！）
   - 完成安装后，按 `Win+R` 输入 `cmd` 打开黑窗口
   - 输入 `python --version` 出现版本号即成功

2. **Mac用户**  
   - 打开终端（应用程序→实用工具→终端）
   - 粘贴安装命令：  
     ```bash
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     brew install python@3.10
     ```

3. **Linux用户**

都用Linux了，不会的话罚你装十遍archOvO

---

## 📥 第二步：获取脚本文件（2分钟）
1. 下载脚本压缩包 → **[点我下载（github）](https://github.com/wuko233/bili-follow-cleaner/archive/refs/heads/main.zip)** **[点我下载（cf镜像，内地推荐）](http://go.wuko.top/https://github.com/wuko233/bili-follow-cleaner/archive/refs/heads/main.zip)**
2. 解压后得到文件夹（建议放在桌面方便查找）
3. 记住文件夹路径（如 `C:\Users\你的名字\Desktop\bili-follow-cleaner`）

---

## ⚙ 第三步：安装必要组件（3分钟）

1. 打开命令提示符（Windows）或终端（Mac）

2. 输入安装命令（逐行执行）：

   ```bash
   # 安装基础组件
   pip install httpx requests

   # 安装B站API库
   pip install bilibili-api
   ```

---

## 🚀 第四步：运行脚本（首次需登录）

1. 在脚本文件夹空白处 **按住Shift+右键** → 选择"在此处打开命令窗口"
2. 输入启动命令：
   ```bash
   python main.py
   ```
3. **扫码登录流程：**
   - 终端会出现二维码 → 用B站APP扫码
   - 登录成功后自动保存凭证（生成 `cookies.json` 文件）
   - 下次运行无需重复登录

---

## ⚡ 第五步：参数设置指南（关键步骤）

运行后会出现配置菜单，按提示操作：

```markdown
1. 每页爬取数量 → 默认50（直接回车）
2. 白名单用户 → 输入要保护的UID（如喜欢的UP主）
3. 不活跃阈值 → 输入天数（365=1年未更新）
4. 跳过最近关注 → 输入数字（保护新关注的UP主）
5. 移除无动态用户 → 输入 `n`
6. 请求延迟 → 默认5-20秒（直接回车）
```
> 💡 示例：想清理2年未更新的用户，在"不活跃阈值"输入 `730`

---

## ✅ 第六步：执行清理

1. 确认参数后开始运行
2. 脚本会自动：
   - 扫描所有关注用户
   - 检查最后发动态时间
   - 跳过白名单和互关用户
   - 记录日志到 `unfollow.log`
3. 完成后显示统计结果：
   ```
   共扫描328个关注
   取关成功47个，失败0个！
   总耗时：0:12:45
   ```

---

## ⚠ 重要注意事项

1. **安全提示**  
   - 不要分享 `cookies.json` 文件（包含登录凭证）
   - 首次使用建议设置高阈值（如365天）测试

2. **风控规避**  
   - 单次清理建议不超过100人
   - 遇到错误代码 `-352` 需增大延迟参数

3. **数据恢复**  
   误删用户可对照日志，通过B站官网手动重新关注：
   ```
   空间主页 → 关注 → 全部关注 → 查找用户
   ```

---

## 💻 进阶技巧（非必须）

| 操作 | 方法 |
|------|------|
| 修改白名单 | 用记事本打开 `main.py` → 搜索 `ignore_list` → 添加UID |
| 重新登录 | 删除文件夹里的 `cookies.json` 重新运行 |
| 查看日志 | 打开同目录下的 `unfollow.log` 文件 |

> ✨ **脚本优势**：自动跳过互关用户/特别关注，避免误删亲友账号

---

**免责声明：** 本工具为开源项目，仅供学习交流，过度使用可能导致账号异常，请遵守B站用户协议。清理前建议导出关注列表备份。

后面打算做个js版的...先挖个坑。

> 好用！觉得好用可以给我一个star吗qwq：[仓库](https://github.com/wuko233/bili-follow-cleaner)

> 欢迎大佬指点或pr，代码水平不够QAQ

> 遇到问题？欢迎在评论区留言！  