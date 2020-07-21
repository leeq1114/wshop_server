const Koa = require('Koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
let router = new Router();




router.post('/addCart', async (ctx)=>{
    const Cart = mongoose.model('Cart');
    let newCart = new Cart(ctx.request.body);
    console.log(ctx.request.body);

    await newCart.save().then(()=>{
        console.log("addCart OK!");
        ctx.body = {
            code : 200,
            message : 'addCart succeed'
        };
    }).catch(err=>{
        console.log(err);
        ctx.body = {
            code : 500,
            message : 'addCart fail!'
        };
    });
});


router.get('/getCartInfo', async (ctx)=>{
    const Cart = mongoose.model('Cart');
    await Cart.find({userId: ctx.query.userId}).populate('productId').exec().then(res=>{
        console.log("getCartInfo OK!");
        ctx.body = res;
    }).catch(err=>{
        console.log(err);
        ctx.body = err;
    });
});


router.get('/delItem', async ctx=>{
    const Cart = mongoose.model('Cart');
    console.log("delItem: " + ctx.query._id);
    await Cart.deleteOne({_id: ctx.query._id}).then(()=>{
        console.log('delItem OK.');
        ctx.body = {
            code : 200,
            message : 'delItem succeed'
        };
    }).catch(err=>{
        console.log(err);
        ctx.body = {
            code : 500,
            message : 'delItem failed.'
        };
    });
});

module.exports = router;