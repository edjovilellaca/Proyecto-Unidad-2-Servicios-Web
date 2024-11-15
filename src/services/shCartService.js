const ShoppingCart = require('../models/shCartModel');
const Product = require('../models/productModel');
const facturapi = require('../apis/facturapi');

module.exports = {
    getShoppingCartByUserId: async (userId) => {
        return await ShoppingCart.findOne({ user: userId }).populate('productos.product');
    },
    
    getAllCarts: async () => {
        return await ShoppingCart.find().populate('productos.product');
    },

    createShoppingCart: async (userId) => {
        
        const cart = new ShoppingCart({
            user: userId,
            productos: [],
            subtotal: 0,
            total: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    
        return await cart.save();
    },

    addItemToCart: async (cartId, input) => {
        const cart = await ShoppingCart.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado.');
    
        for (const item of input) {
            const product = await Product.findById(item.productId);
            console.log('product: ', product);
            if (!product) throw new Error('Producto no encontrado.');
    
            const existingItem = cart.productos.find(cartItem => cartItem.product.equals(product._id));
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                cart.productos.push({ 
                    product: product._id,
                    name: product.name,
                    desc: product.desc,
                    quantity: item.quantity,
                    price: product.price,
                    category: product.category,
                });
            }
    
            cart.total += product.price * item.quantity;
        }

        console.log('-------------------------------------------------');
        console.log('Carrito completo: ', cart);
    
        return await cart.save();
    },

    updateCartItem: async (userId, input) => {
        const cart = await ShoppingCart.findOne({ user: userId });
        if (!cart) throw new Error('Carrito no encontrado.');

        const item = cart.productos.find(item => item.product.equals(input.productId));
        if (!item) throw new Error('Producto no encontrado en el carrito.');

        const product = await Product.findById(input.productId);
        cart.total -= product.price * item.quantity;
        item.quantity = input.quantity;
        cart.total += product.price * input.quantity;

        return await cart.save();
    },

    removeItemFromCart: async (userId, productId) => {
        const cart = await ShoppingCart.findOne({ user: userId });
        if (!cart) throw new Error('Carrito no encontrado.');

        const itemIndex = cart.productos.findIndex(item => item.product.equals(productId));
        if (itemIndex === -1) throw new Error('Producto no encontrado en el carrito.');

        const product = await Product.findById(productId);
        cart.total -= product.price * cart.productos[itemIndex].quantity;
        cart.productos.splice(itemIndex, 1);

        return await cart.save();
    },

    clearCart: async (userId) => {
        const cart = await ShoppingCart.findOne({ user: userId });
        if (!cart) throw new Error('Carrito no encontrado.');

        cart.productos = [];
        cart.total = 0;

        return await cart.save();
    },

    updateShCart: async (_id, updates) => {
        const cart = await ShoppingCart.findById(_id);
        if (!cart) throw new Error(`Shopping cart with ID: ${_id} not found.`);

        //Si el valor de status se cambia a ser activo, este será modificado a un recibo y registrado en facturapi
        //Revisar pestaña de recibos para comprobar     https://dashboard.facturapi.io/receipts
        if(toString(shCart.status).match('Activo')){
            const facturapiReceipt = await facturapi.createCart(shCart);
            shCart.facturapi = facturapiReceipt.id;
            console.log(facturapiReceipt);
        }
        const facturapiData = {
            description: updates.desc || product.desc,
            price: updates.price || product.price,
            product_key: "50202306" 
        };

        await facturapi.updateProduct(product.facturapi, facturapiData);
        return await ShoppingCart.findByIdAndUpdate(_id, updates, { new: true });
    },
};