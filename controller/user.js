const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');

router.post('/registUser', async(ctx) => {
    // console.log('service is OK.');
    // ctx.body = "OK!!!";

    // 获取mongoose定义的User model
    const User = mongoose.model('User');
    // 接收post请求封装成User对象
    let newUser = new User(ctx.request.body);
    // 使用save保存用户信息
    await newUser.save().then(res=>{
        console.log(res);
        ctx.body = {
            code : 200,
            message : 'succeed'
        };
    }).catch(err =>{
        console.log(err);
        ctx.body = {
            code : 500,
            message : err
        };
    });
});


router.post('/loginUser', async(ctx) => {
    // console.log('service is OK.');
    // ctx.body = "OK!!!";

    // 获取mongoose定义的User model
    const User = mongoose.model('User');
    // 接收post请求封装成User对象
    let oldUser = new User(ctx.request.body);
    let userName = oldUser.userName;
    let password = oldUser.password;

    // 
    await User.findOne({userName : userName}).exec().then(async result=>{
        if (result) {
            let newUser = new User();
            await newUser.comparePassword(password, result.password)
            .then(isMatch=>{
                // succeed
                if (isMatch) {
                    ctx.body = {
                        code : 200,
                        message : '登录成功',
                        userInfo: {
                            name: result.userName
                        }
                    }
                } else {
                    ctx.body = {
                        code : 201,
                        message : '登录失败'
                    }
                }
            })
        } else {
            ctx.body = {
                code : 201,
                message : '用户名不存在'
            }
        }
        
    }).catch(err =>{
        console.log(err);
        
    });
});


module.exports= router;