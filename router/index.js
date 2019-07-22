const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
console.log(User, 'User');
// var user1 = new User({
//     name: 'zhanan',
//     age: 18,
//     like: 'girl'
// })

// user1.save(function(err, ret) {
//     if (err) {
//         console.log('保存失败');
//     } else {
//         console.log('保存成功');
//         console.log(ret, 'ret');
//     }
// })

router.get('/', function(req, res) {
    // 直接去找views文件加下的index.html文件进行解析
    User.find(function(err, ret) {
       if (err) {
           console.log(err, '查询失败');
       } else {
           console.log('查询成功');
           res.render('index.html', {
                user: ret 
            })
       }
    })
})

router.get('/add', function(req, res) {
    res.render('add.html')
})

router.post('/add', function(req, res) {
    new User(req.body).save(function(err, ret) {
        if (err) {
            console.log(err, 'err');
        } else {
            console.log('保存成功');
            console.log(ret, 'ret');
        }
    })
    res.redirect('/');
})

router.get('/edit', function(req, res) {
    User.findOne({_id: req.query.id}, function(err, ret) {
        console.log(ret, 'ret');
        res.render('edit.html', {
            user: ret
        })
    })
})
router.post('/edit', function(req, res) {
    User.updateOne({_id: req.body.id}, req.body ,function(err, ret) {
        if (err) {
            console.log('更新失败');
        } else {
            console.log('更新成功', ret);
            res.redirect('/');
        }
    })
})
router.get('/delete', function(req, ret) {
    User.deleteOne({_id: req.body.id}, function(err, res) {
        if (err) {
            console.log(err, 'err');
        } else {
            console.log(res, 'res');
            console.log('删除成功');
            res.redirect('/');
        }
    })
})
module.exports = router