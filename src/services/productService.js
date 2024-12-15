const Product = require('../models/productModel');
const Brand = require('../models/brandModel');
const facturapi = require('../apis/facturapi');

module.exports = {
    getAllProducts: async () => {
        return await Product.find().populate('brand');
    }, 

    createProduct: async ({ name, desc, price, category, brandId, quantity, images }) => {
        const product = new Product({ name, desc, price, category, brand: brandId, quantity, images });
        const facturapiProduct = await facturapi.createProduct(product);

        product.facturapi = facturapiProduct.id;
        product._id = facturapiProduct.id;
        console.log(facturapiProduct);
        console.log(product);
        
        return await product.save();
    },

    searchProducts: async (keyword) => {
        console.log('keyword en service: ', keyword);
        try {
            return await Product.find({name: { $regex: keyword, $options: 'i' }});
        } catch (error) {
            throw new Error(`Products with the keyword '${keyword}' not found.`);
        }
    },

    updateProduct: async (_id, updates) => {
        const product = await Product.findById(_id);
        if (!product) throw new Error(`Product with ID: ${_id} not found.`);

        const facturapiData = {
            description: updates.desc || product.desc,
            price: updates.price || product.price,
            product_key: "50202306" 
        };

        await facturapi.updateProduct(product.facturapi, facturapiData);
        return await Product.findByIdAndUpdate(_id, updates, { new: true });
    },

    deleteProduct: async (_id) => {
        const product = await Product.findById(_id);
        if (!product) throw new Error(`Product with ID: ${_id} not found.`);

        const productDeleted = await facturapi.deleteProduct(product.facturapi);
        if (!productDeleted) throw new Error(`Product with ID: ${_id} couldn't be deleted from Facturapi.`);

        return await Product.findByIdAndDelete(_id);
    },

    getBrandById: async (brandId) => {
        return await Brand.findById(brandId);
    }
};
