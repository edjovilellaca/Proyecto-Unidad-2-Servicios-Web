const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const shCartSchema = new mongoose.Schema({
    user:           {type: [String],    required: true },
    productos:      [cartItemSchema],
    subtotal:       {type: Number,      default: 0 },
    total:          {type: Number,      default: 0 },
    sDate:          {type: Date,        default: Date.now },
    cDate:          {type: Date,        default: Date.now },
    status:         {type: String,      default: "Activo" },         
});

const shCart = mongoose.model('shCart', shCartSchema);
const cartItem = mongoose.model('cartItem', cartItemSchema);
module.exports = shCart;