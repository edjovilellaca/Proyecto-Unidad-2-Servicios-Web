
const Product = require('../models/productModel');
const Brand = require('../models/brandModel');

module.exports = {
    getAllProducts: async () => {
        return await Product.find();
    }, 

    createProduct: async ({ name, desc, price, category, brandId, quantity, images }) => {
        const product = new Product({ name, desc, price, category, brand: brandId, quantity, images });
        return await product.save();
    },

    updateProduct: async (_id, updates) => {
        const updatedProduct = await Product.findByIdAndUpdate(_id, updates, { new: true }).populate('brand');
        if (!updatedProduct) {
            throw new Error(`Product with ID: ${_id} not found.`);
        }
        return updatedProduct;
    },

    deleteProduct: async (_id) => {
        const deletedProduct = await Product.findByIdAndDelete(_id);
        if (!deletedProduct) {
            throw new Error(`Product with ID: ${_id} not found.`);
        }
        return deletedProduct;
    },

    getBrandById: async (brandId) => {
        return await Brand.findById(brandId);
    }
};
