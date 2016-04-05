###CRAWL
######使用
1. 将本项目下周到本地: git clone git@github.com:winterZhao/crawl.git
2. 安装依赖 npm install;
3. 执行 npm start;
4. 本地新建数据库 'crawl';
5. 浏览器窗口开启 'localhost:3000';


######项目内容
1. 发出HTTP请求获取指定数据;

2. 使用jQuery语法操作网页元素;

3. 将数据保存到mysql;

4. 建立web服务器展示；

5. 自动执行更新任务；



#####所需模块
1. async;
2. request;
3. iconv-lite //作用:将gbk编码格式转换为utf8
4. cheerio  //node端操作DOM元素
5. crontab  //按照一定时间自动执行某项任务，类似setInterval;npm install cron;
6. debug    //日志记录器;
7. child-process  //用于启动一个新的子进程;
【node是单线程单进程的】:无法做到多进程,但可以开个子进程;
