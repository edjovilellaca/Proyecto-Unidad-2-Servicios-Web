require('dotenv').config();
const ShoppingCart = require('../models/shCartModel');
const Product = require('../models/productModel');
const facturapi = require('../apis/facturapi');
const user = require('../models/userModel');
const stripe = require('../apis/stripe');
const accountSid = process.env.TULIOKEY1;
const authToken = process.env.TULIOKEY2;
console.log('AccountSid: ', accountSid);
console.log('authToken: ', authToken);
const client = require('twilio')(accountSid, authToken);

const {createPDFAndUploadToS3} = require('../apis/generarPDF');
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
        console.log('pa activar el render');
        return await ShoppingCart.findOne({ user: userId, status: "Activo" }).populate('productos.product');
    },

    getShoppingCartByUserIdNo: async (userId) => {
        console.log('pa activar el render');
        return await ShoppingCart.find({ user: userId, status: "Inactivo" }).populate('productos.product');
    },
    
    allUserCarts: async (userId) => {
        return await ShoppingCart.find({ user: userId }).populate('productos.product');
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

    updateCartItem: async (cartId, input) => {
        const cart = await ShoppingCart.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado.');

        const item = cart.productos.find(item => item.product.equals(input.productId));
        if (!item) throw new Error('Producto no encontrado en el carrito.');

        const product = await Product.findById(input.productId);
        cart.total -= product.price * item.quantity;
        item.quantity = input.quantity;
        cart.total += product.price * input.quantity;

        return await cart.save();
    },

    removeItemFromCart: async (cartId, productId) => {
        const cart = await ShoppingCart.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado.');

        const itemIndex = cart.productos.findIndex(item => item.product.equals(productId));
        if (itemIndex === -1) throw new Error('Producto no encontrado en el carrito.');

        const product = await Product.findById(productId);
        cart.total -= product.price * cart.productos[itemIndex].quantity;
        cart.productos.splice(itemIndex, 1);

        return await cart.save();
    },

    removeOneItemFromCart: async (cartId, productId) => {
        const cart = await ShoppingCart.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado.');

        const itemIndex = cart.productos.findIndex(item => item.product.equals(productId));
        console.log("ItemIndex: ", itemIndex);
        if (itemIndex === -1) throw new Error('Producto no encontrado en el carrito.');

        if (itemIndex) {
            console.log('Cantidad antes: ', cart.productos[itemIndex].quantity);
            if(cart.productos[itemIndex].quantity == 0){
                cart.productos.splice(itemIndex, 1);
            }
            cart.productos[itemIndex].quantity -= cart.productos[itemIndex].quantity;
            console.log('Cantidad despues: ', cart.productos[itemIndex].quantity);
        }

        const product = await Product.findById(productId);
        cart.total -= product.price * cart.productos[itemIndex].quantity;
        return await cart.save();
    },

    clearCart: async (cartId) => {
        const cart = await ShoppingCart.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado.');

        cart.productos = [];
        cart.total = 0;

        return await cart.save();
    },

    updateShCart: async (cartId, updates) => {
        const cart = await ShoppingCart.findById(cartId).populate('productos.product');
        if (!cart) throw new Error(`Carrito con ID: ${cartId} no encontrado.`);
    
        const userName = await getUserNameByCart(cart);

        if(toString(cart.status).match('Activo')){
            return await ShoppingCart.findByIdAndUpdate(cartId, updates, { new: true });
        }
        
        const [facturapipi, factuPDF] = await facturapi.createReceipt(cart, userName);

        const linkPago = await stripe.paymentLink(cart.productos);
    
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
            <h1>Felicidades ${userName.nombreCompleto}</h1>
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
        `;

        const adInfo1 = cart.total.toFixed(2);
        const adInfo2 = cart.cDate;

        /* const pdfUrl = await createPDFAndUploadToS3(facturapipi, productDetailsHTML, adInfo1, adInfo2);
        console.log('PDF available at:', pdfUrl);

        const casiTodoTodito = htmlContent + `<p>${pdfUrl}</p>`; */

        const casiTodoTodito2 = htmlContent + `<p>PDF de Facturapi: ${factuPDF[0]}</p>`;
        const todoTodito = casiTodoTodito2 + `<p>XML de Facturapi: ${factuPDF[1]}</p>`;
    
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
                                Email: userName.email,
                                Name: "ugabuga"
                            }
                        ],
                        Subject: "Si jala!",
                        TextPart: `Recibo de compra para ${userName}`,
                        HTMLPart: todoTodito,
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

        const productosPalMensaje = cart.productos
            .map(item => `
                Product: ${item.product.name}
                Description: ${item.product.desc}
                Quantity: ${item.quantity}
                Price: ${item.product.price.toFixed(2)}

            `)
            .join('');    

        const mensaje = `
        🎉 Thank you for your purchase, ${userName.nombreCompleto}!
        🧾 Receipt Details:
            
        - Receipt ID: 
        ${facturapipi.id}

        - Items: 
        ${productosPalMensaje}

        For any questions, feel free to contact us.
        Checkout your purchase PDF from Facturapi at: 
        ${factuPDF[0]}
        
        Checkout your purchase XML from Facturapi at: 
        ${factuPDF[1]}
        `;

        client.messages
            .create({
                body: mensaje,
                from: '+17754851842',
                to: `+52${userName.telefono}`
            })
            .then(message => console.log(`Message sent with SID: ${message.sid}`))
            .catch(err => console.error(`Error sending message: ${err.message}`));

        return await ShoppingCart.findByIdAndUpdate(cartId, updates, { new: true });
    }
    
};

async function getUserNameByCart(cart) {
    try {
        const userr = await user.findById(cart.user);
        if (!userr) {
            throw new Error('Usuario no encontrado.');
        }
        
        return userr;
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