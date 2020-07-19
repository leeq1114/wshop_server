const Koa = require('koa');
const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
const fs = require('fs');

router.get('/insertType', async ctx =>{
    fs.readFile('./data/type.json', 'utf8', (err, data) =>{
        data = JSON.parse(data);
        let count = 0;
        const Type = mongoose.model('Type');
        data.map((value, index) =>{
            let type = new Type(value);
            type.save().then(()=>{
                count++;
            }).catch(err=>{
                console.log('failed :' + err);
            }).finally(()=>{
                console.log('succeed: '+ count);
            });
        });
    });
    ctx.body = '2222222222';
});

router.get('/getTypes', async ctx=>{
    const Type = mongoose.model('Type');
    await Type.find({}).then(res=>{
        ctx.body = res;
    }).catch(err =>{
        console.log(err);
    });
});

module.exports = router;