const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ObjectId = Schema.Types.ObjectId;

const cartSchema = new Schema({
    id: ObjectId,
    productId: {
        type: ObjectId,
        ref: 'Product'
    },
    userId: ObjectId,
    createDate: {type: Date, default: Date.now()}
});


mongoose.model('Cart', cartSchema);