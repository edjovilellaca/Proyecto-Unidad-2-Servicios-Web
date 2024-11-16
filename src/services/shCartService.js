const ShoppingCart = require('../models/shCartModel');
const Product = require('../models/productModel');
const facturapi = require('../apis/facturapi');
const user = require('../models/userModel');

const Mailjet = require('node-mailjet');
const { json } = require('express');
const mailjet = Mailjet.apiConnect(
    'd662ab6c8b76e9a00a4ac2504b54357f',
    'c3794a6df37d1282e45b83dbbfc97519',
    {
      config: {},
      options: {}
    } 
);

module.exports = {
    getShoppingCartByUserId: async (userId) => {
        return await ShoppingCart.findOne({ user: userId }).populate('productos.product');
    },
    
    getAllCarts: async () => {
        return await ShoppingCart.find().populate('productos.product');
    },

    delShoppinCart: async (cartId) => {
        return await ShoppingCart.findByIdAndDelete({ _id: cartId });
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

    updateShCart: async (cartId, updates) => {
        const cart = await ShoppingCart.findById(cartId).populate('productos.product');
        if (!cart) throw new Error(`Carrito con ID: ${cartId} no encontrado.`);
    
        const userName = await getUserNameByCart(cart);
    
        const productDetailsHTML = cart.productos
            .map(item => `
                <tr>
                    <td>${item.product.name}</td>
                    <td>${item.product.desc}</td>
                    <td>${item.quantity}</td>
                    <td>${item.product.price.toFixed(2)}</td>
                </tr>
            `)
            .join('');
    
        const htmlContent = `
            <h1>Felicidades ${userName}</h1>
            <h2>Recibo de venta</h2>
            <table border="1" style="border-collapse: collapse; width: 100%;">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                    </tr>
                </thead>
                <tbody>
                    ${productDetailsHTML}
                </tbody>
            </table>
            <p>Total: $${cart.total.toFixed(2)}</p>
            <br>
            <p>Fecha de compra: ${cart.cDate}</p>
        `;
    
        const request = mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: "edjovilellaca@ittepic.edu.mx",
                            Name: "El Jefazo"
                        },
                        To: [
                            {
                                Email: "edjovilellaca@ittepic.edu.mx",
                                Name: "ugabuga"
                            }
                        ],
                        Subject: "Si jala!",
                        TextPart: `Recibo de compra para ${userName}`,
                        HTMLPart: htmlContent,
                    }
                ]
            });
    
        request
            .then((result) => {
                console.log('Correo enviado exitosamente:', result.body);
            })
            .catch((err) => {
                console.error('Error al enviar correo:', err.statusCode, err.message);
            });
        return await ShoppingCart.findByIdAndUpdate(cartId, updates, { new: true });
    }
    
};

async function getUserNameByCart(cart) {
    try {
        const userr = await user.findById(cart.user);
        if (!userr) {
            throw new Error('Usuario no encontrado.');
        }
        
        return userr.nombreCompleto;
    } catch (error) {
        console.error('Error al obtener el nombre del usuario:', error.message);
        throw error;
    }
};

const getCartWithProductDetails = async (cartId) => {
    try {
        const cart = await ShoppingCart.findById(cartId).populate('productos.product');
        if (!cart) throw new Error('Carrito no encontrado.');

        return cart;
    } catch (error) {
        console.error('Error al obtener el carrito:', error.message);
        throw error;
    }
};