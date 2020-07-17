const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/wshop';


// import Schema
const glob = require('glob');
const path = require('path');

// 连接schema信息
exports.initSchemas = ()=> {
    glob.sync(path.resolve(__dirname, './model', '*.js')).forEach(require);
};

// 连接数据库方法
exports.connect = ()=> {

    // connect DB
    mongoose.connect(db, {useNewUrlParser: true});

    // listen 
    mongoose.connection.on('disconnected', ()=>{
        mongoose.connect(db);
    });

    // listen error 
    mongoose.connection.on('error', err=>{
        console.log(err);
        mongoose.connect(db);
    }); 

    // listen OK 
    mongoose.connection.on('open', ()=>{
        console.log("mongoDB connect OK.");
    });
};
