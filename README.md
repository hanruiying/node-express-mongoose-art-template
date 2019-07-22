# node-express-mongoose-art-template<br>
nodejs+express+mongoose+art-template写的简单的服务器端渲染的小例子<br>
<br>
参考文章：https://nodejs.lipengzhou.com/08-express.html#express-%E4%BB%8B%E7%BB%8D<br>
### 安装express<br>
* 创建并切换到 myapp 目录<br>
  `mkdir myapp`
  `cd myapp`
* 初始化 package.json 文件<br>
  `npm init -y`
* 安装 express 到项目中<br>
   `npm i express`
### 处理静态资源<br>
* 开放 public 目录中的资源, 不需要访问前缀<br>
`app.use(express.static('public'))`<br>

* 开放 files 目录资源，同上 <br>
`app.use(express.static('files'))`

* 开放 public 目录，限制访问前缀<br>
`app.use('/public', express.static('public'))`

* 开放 public 目录资源，限制访问前缀<br>
`app.use('/static', express.static('public'))`

* 开放 publi 目录，限制访问前缀 <br>
`path.join(__dirname, 'public') 会得到一个动态的绝对路径`<br>
`app.use('/static', express.static(path.join(__dirname, 'public')))`
### 安装模板引擎art-template<br>
* 安装<br>
`npm install art-template express-art-template`
* 配置<br>
// 第一个参数用来配置视图的后缀名，这里是 art ，则你存储在 views 目录中的模板文件必须是 xxx.art<br>
// app.engine('art', require('express-art-template'))<br>
// 这里我把 art 改为 html<br>
`app.engine('html', require('express-art-template'))`<br>
* 使用
```
app.get('/', function (req, res) {
    // render 方法默认会去项目的 views 目录中查找 index.html 文件
    // render 方法的本质就是将读取文件和模板引擎渲染这件事儿给封装起来了
    res.render('index.html', {
      title: 'hello world'
    })
  })
```
### 解析post请求表单数据<br>
* 安装<br>
`npm install --save body-parser`
* 配置<br>
```
var express = require('express')
// 0. 引包
var bodyParser = require('body-parser')
var app = express()
// 配置 body-parser
// 只要加入这个配置，则在 req 请求对象上会多出来一个属性：body
// 也就是说你就可以直接通过 req.body 来获取表单 POST 请求体数据了
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
```
* 使用<br>
```
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  // 可以通过 req.body 来获取表单 POST 请求体数据
  res.end(JSON.stringify(req.body, null, 2))
})
```
### mongoose数据库的使用
```
  安装： npm install mongoose
  使用：
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
  var kittySchema = new mongoose.Schema({
    name: String
  });
  var Kitten = mongoose.model('Kitten', kittySchema);
```
* 新增单条
```
  var Tank = mongoose.model('Tank', yourSchema);
  var small = new Tank({ size: 'small' });
  small.save(function (err) {
    if (err) return handleError(err);
    // saved!
  });
```
* 新增多条
```
  Tank.insertMany([{ size: 'small' }], function(err) {
  });
```
* 查询
```
find、findOne、findById
Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback);
```
* 删除
```
  Tank.deleteOne({ size: 'large' }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });
  deleteMany
```
* 更新
```
Tank.updateOne({ size: 'large' }, { name: 'T-90' }, function(err, res) {
  // Updated at most one doc, `res.modifiedCount` contains the number
  // of docs that MongoDB updated
});
```

