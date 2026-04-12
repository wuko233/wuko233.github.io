---
title: SQL Murder Mystery——SQL谋杀之谜 游戏实况流程
date: 2026-04-10
slug: SQL_Murder_Mystery
image: cover.png
description:
categories: 
    - SQL
tags: 
    - SQL
    - 学习
    - 有意思的东西
---

> WARNING: 此文章并非游戏攻略 ~~（虽然也能当攻略看就是了）~~。本文旨在记录博主游玩`SQL Murder Mystery`并学习SQL语句的经历~这篇文章相关的知识点写在了这里！[https://note.wuko.top/web/2022-07-22-SQL.html](https://note.wuko.top/web/2022-07-22-SQL.html)

# 前

数据库课，老师在黑板上苦吃苦吃写着SQL（Structured Query Language）语句，底下同学们百般无聊，谁能想到数据库课居然是理论课而不是上机？

看着老师写着SQL，笔者的手也痒痒，也想用手机也试试写SQL语句。遂ssh连上自己的服务器实机写，但写了一会儿基础的创表查询等等，却感觉没啥意思，没有具体的目标要实现，也不太可能现场设计一个数据库来实现。想到之前玩过的学习`git`的网页游戏，会不会也有学习SQL的网页游戏呢？于是上网一搜，还真有：[SQL Murder Mystery ](https://mystery.knightlab.com/)

全英文页面，虽然勉勉强强能看懂，但还是双语版更舒服...

# link start

## 伊始

> There's been a Murder in SQL City! The SQL Murder Mystery is designed to be both a self-directed lesson to learn SQL A crime has taken place and the detective needs your help. The detective gave you the crime scene report, but you somehow lost it. You vaguely remember that the crime was a ​murder​ that occurred sometime on ​Jan.15, 2018​ and that it took place in ​SQL City​. Start by retrieving the corresponding crime scene report from the police department’s database. concepts and commands and a fun game for experienced SQL users to solve an intriguing crime. 

> 发生了一起犯罪案件，侦探需要你的帮助。侦探给了你犯罪现场报告，但你不小心弄丢了。你隐约记得这起案件是一起发生在​2018年1月15日​的​谋杀案​，案发地点在​SQL City​。请先从警察局的数据库中检索相应的犯罪现场报告。

那就先看看数据库里有哪些表吧：

```sql
SELECT name 
  FROM sqlite_master
 where type = 'table'
```

| name |
|------|
| crime_scene_report |
| drivers_license |
| facebook_event_checkin |
| interview |
| get_fit_now_member |
| get_fit_now_check_in |
| solution |
| income |
| person |

因为网站使用的是`SQLite`，所以可以使用如下命令来查看各个表的结构：

```sql
SELECT sql 
  FROM sqlite_master
 where name = '表名'
```

也可以一键查看：

```sql
SELECT sql 
FROM sqlite_master 
WHERE type='table';
```

返回：

```sql
CREATE TABLE crime_scene_report ( date integer, type text, description text, city text )

CREATE TABLE drivers_license ( id integer PRIMARY KEY, age integer, height integer, eye_color text, hair_color text, gender text, plate_number text, car_make text, car_model text )

CREATE TABLE facebook_event_checkin ( person_id integer, event_id integer, event_name text, date integer, FOREIGN KEY (person_id) REFERENCES person(id) )

CREATE TABLE interview ( person_id integer, transcript text, FOREIGN KEY (person_id) REFERENCES person(id) )

CREATE TABLE get_fit_now_member ( id text PRIMARY KEY, person_id integer, name text, membership_start_date integer, membership_status text, FOREIGN KEY (person_id) REFERENCES person(id) )

CREATE TABLE get_fit_now_check_in ( membership_id text, check_in_date integer, check_in_time integer, check_out_time integer, FOREIGN KEY (membership_id) REFERENCES get_fit_now_member(id) )

CREATE TABLE solution ( user integer, value text )

CREATE TABLE income (ssn CHAR PRIMARY KEY, annual_income integer)

CREATE TABLE person (id integer PRIMARY KEY, name text, license_id integer, address_number integer, address_street_name text, ssn CHAR REFERENCES income (ssn), FOREIGN KEY (license_id) REFERENCES drivers_license (id))
```

直接看官网的图表吧：

![](schema.png)

## 调查时间

已知：

> 这起案件是一起发生在​2018年1月15日​的​谋杀案​，案发地点在​SQL City。

先从`crime_scene_report`开始大调查吧！

注意到表结构里有`data`-`INTEGER`，可以用`where`直接筛选日期`20180115`和地点`SQL City`:

```sql
select *
from crime_scene_report
where date='20180115'
and city='SQL City';
```

| date | type | description | city |
|------|------|-------------|------|
| 20180115 | assault | Hamilton: Lee, do you yield? Burr: You shot him in the side! Yes he yields! | SQL City |
| 20180115 | assault | Report Not Found | SQL City |
| 20180115 | murder | Security footage shows that there were 2 witnesses. The first witness lives at the last house on "Northwestern Dr". The second witness, named Annabel, lives somewhere on "Franklin Ave". | SQL City |

> 监控录像显示有2名目击者。第一名目击者住在“西北大道”的最后一所房子。第二名目击者名叫安娜贝尔（Annabel），住在“富兰克林大道”的某个地方。——SQL City

找到了这个事件的报告，有两个目击者，直接从`person`表来查找一下这俩目击者的信息：

```sql
select *
from person
where address_street_name='Northwestern Dr'
    and address_number = (
        select max(address_number)
        from person
        where address_street_name = 'Northwestern Dr'
    )
or (address_street_name='Franklin Ave' 
    and name like '%Annabel%')
```

用到了子查询的语法~先从子查询中返回`Northwestern Dr`街地址编号最大的编号，再运行外层的where筛选出这个编号的详细信息，另一个则是用到了模糊搜索，`%`表示任意个字符，最后再把这俩目击者输出：

| id | name | license_id | address_number | address_street_name | ssn |
|----|------|------------|----------------|----------------------|---------|
| 14887 | Morty Schapiro | 118009 | 4919 | Northwestern Dr | 111564949 |
| 16371 | Annabel Miller | 490173 | 103 | Franklin Ave | 318771143 |

现在我们得到了两个目击者的姓名以及id!

---

现在用`interview`表查一下两个人对应的口供：

```sql
select *
from interview
where person_id in (14887, 16371);
```

| person_id | transcript | 翻译 |
|-----------|------------|------|
| 14887 | I heard a gunshot and then saw a man run out. He had a "Get Fit Now Gym" bag. The membership number on the bag started with "48Z". Only gold members have those bags. The man got into a car with a plate that included "H42W". | 我听到一声枪响，然后看到一个男人跑了出来。他背着一个“Get Fit Now Gym”的包。包上的会员编号以“48Z”开头。只有黄金会员才有这种包。那个男人上了一辆车，车牌号包含“H42W”。 |
| 16371 | I saw the murder happen, and I recognized the killer from my gym when I was working out last week on January the 9th. | 我目睹了谋杀过程，并且认出凶手是我健身房的人，我上周1月9日健身时见过他。 |

信息量挺大，基本上就能把人定位了，那就去查查这个健身房的会员和入场记录吧。

访问`get_fit_now_member`表，先来查下以`48Z`开头的黄金会员：

```sql
select *
from get_fit_now_member
where id like '48Z%' and membership_status like '%gold%';
```

| id | person_id | name | membership_start_date | membership_status |
|----|-----------|------|----------------------|-------------------|
| 48Z7A | 28819 | Joe Germuska | 20160305 | gold |
| 48Z55 | 67318 | Jeremy Bowers | 20160101 | gold |

好，确认了两个嫌疑人，接下来来查一下1月9日的健身房入场记录，通过`get_fit_now_check_in`:

```sql
select *
from get_fit_now_check_in
where check_in_date='20180109' and membership_id like '48Z%';
```

| membership_id | check_in_date | check_in_time | check_out_time |
|---------------|---------------|---------------|----------------|
| 48Z7A | 20180109 | 1600 | 1730 |
| 48Z55 | 20180109 | 1530 | 1700 |

666两人商量好了同时都出现了。看来只能从另一个线索车牌号出发了。

已知犯罪嫌疑人驾驶的车辆牌照中包含`H42W`，去`drivers_license`查一下：

```sql
select *
from person
join drivers_license on person.license_id = drivers_license.id
where person.id in (28819, 67318);
```

这次没用子查询，而是使用了`JOIN`，将两个不同的表连接到了一起，通过`person`的外键`license_id`与`drivers_license`的主键`id`关联，查询到了两个表的对应数据：

因为没用select选择，数据有点多，转化成竖行方便阅读：

| 表 | 列名 | 值 |
|----|------|-----|
| person | id | 67318 |
| person | name | Jeremy Bowers |
| person | license_id | 423327 |
| person | address_number | 530 |
| person | address_street_name | Washington Pl, Apt 3A |
| person | ssn | 871539279 |
| drivers_license | id | 423327 |
| drivers_license | age | 30 |
| drivers_license | height | 70 |
| drivers_license | eye_color | brown |
| drivers_license | hair_color | brown |
| drivers_license | gender | male |
| drivers_license | plate_number | 0H42W2 |
| drivers_license | car_make | Chevrolet |
| drivers_license | car_model | Spark LS |

找到真凶了！谋杀犯就是你！`Jeremy Bowers`！

```sql
INSERT INTO solution VALUES (1, 'Jeremy Bowers');
        
SELECT value FROM solution;
```

> Congrats, you found the murderer! But wait, there's more... If you think you're up for a challenge, try querying the interview transcript of the murderer to find the real villain behind this crime. If you feel especially confident in your SQL skills, try to complete this final step with no more than 2 queries. Use this same INSERT statement with your new suspect to check your answer.

> 恭喜你找到了凶手！但是等等，还有更多……如果你觉得自己能接受挑战，试着查询凶手的访谈记录，找出这起犯罪背后的真正主谋。如果你对自己的 SQL 技能特别有信心，尝试用不超过 2 个查询来完成这最后一步。使用同样的 INSERT 语句填入你的新嫌疑人来核对答案。

等等，真相只有一个，事情远不止这么简单！

## 幕后主使者

先来看下犯人的口供：

```sql
select *
from interview
where person_id=67318;
```

| person_id | transcript | 翻译 |
|-----------|------------|------|
| 67318 | I was hired by a woman with a lot of money. I don't know her name but I know she's around 5'5" (65") or 5'7" (67"). She has red hair and she drives a Tesla Model S. I know that she attended the SQL Symphony Concert 3 times in December 2017. | 我被一个很有钱的女人雇佣。我不知道她的名字，但我知道她身高大约5英尺5英寸（65英寸）或5英尺7英寸（67英寸）。她有一头红发，开一辆特斯拉Model S。我知道她在2017年12月参加了3次SQL交响音乐会。 |

整理一波信息：

1. 身高在65-67英尺
2. 红色头发
3. 特斯拉车主 Model S
4. 201712% 参加了3次SQL交响音乐会（SQL Symphony Concert）

分别构造查询：

```sql
select *
from drivers_license
where (height between 65 and 67)
    and hair_color='red'
    and car_make='Tesla'
    and car_model like '%Model S%';
```

这人还参加过音乐会，一般肯定会发个朋友圈啥的，所以调用脸谱网的数据表：

```sql
select person_id, count(*)
from facebook_event_checkin
where date between 20171201 and 20171231
    and event_name like '%SQL Symphony Concert%'
group by person_id
having count(*)=3;
```

因为他说最好能两次查询出来，所以我们来挑战一下，把上面俩查询拼在一起：

```sql
select p.name, dl.*, fb.*
from drivers_license as dl
join person as p on dl.id = p.license_id
join facebook_event_checkin as fb on p.id = fb.person_id
where dl.height between 65 and 67
    and dl.hair_color = 'red'
    and dl.car_make = 'Tesla'
    and dl.car_model like '%Model S%'
    and fb.event_name like '%SQL Symphony Concert%'
    and fb.date between 20171201 and 20171231;
```

写完这一长串好悬一口气没上来，查到了!

| name | id | age | height | eye_color | hair_color | gender | plate_number | car_make | car_model | person_id | event_id | event_name | date |
|------|----|-----|--------|-----------|------------|--------|--------------|----------|-----------|-----------|----------|----------------|--------|
| Miranda Priestly | 202298 | 68 | 66 | green | red | female | 500123 | Tesla | Model S | 99716 | 1143 | SQL Symphony Concert | 20171206 |
| Miranda Priestly | 202298 | 68 | 66 | green | red | female | 500123 | Tesla | Model S | 99716 | 1143 | SQL Symphony Concert | 20171212 |
| Miranda Priestly | 202298 | 68 | 66 | green | red | female | 500123 | Tesla | Model S | 99716 | 1143 | SQL Symphony Concert | 20171229 |

幕后主使者就是你！`Miranda Priestly`！

```sql
INSERT INTO solution VALUES (1, 'Miranda Priestly');
        
SELECT value FROM solution;
```

> Congrats, you found the brains behind the murder! Everyone in SQL City hails you as the greatest SQL detective of all time. Time to break out the champagne!

> 恭喜你，你找到了谋杀案的幕后主使！SQL City 的每个人都尊你为有史以来最伟大的 SQL 侦探。是时候开香槟庆祝了！

# 末

挺有意思的SQL练习小游戏，你还可以抛去主题去查看其他人的信息（我去，盒！），让我想起之前玩的`Hacknet`。这次用到的语法知识放到了我的在线笔记：[https://note.wuko.top/web/2022-07-22-SQL.html](https://note.wuko.top/web/2022-07-22-SQL.html)，感兴趣可以去看看。