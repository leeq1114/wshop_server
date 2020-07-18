const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    userId : Schema.Types.ObjectId,
    userName : {unique: true, type: String},
    password : String,
    createDate : {type: Date, default: Date.now()}
});

// 数据保存之前加盐加密，save方法重写
userSchema.pre('save', function(next){
    // 随机生成salt，10是迭代次数
    bcrypt.genSalt(10, (err, salt)=>{
        if(err) return next();
        bcrypt.hash(this.password, salt, (err, hash)=>{
            if(err) return next(err);
            this.password = hash;
            next();
        });
    });
});

userSchema.methods = {
    comparePassword: (oldPassword, password)=> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(oldPassword, password, (err, isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err);
            });
        });
    }
}
// realese model
mongoose.model('User', userSchema);



