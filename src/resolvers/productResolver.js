const productService = require('../services/productService');

const resolvers = {
    Query: {
        products: async () => {
            try {
                return await productService.getAllProducts();
            } catch (error) {
                throw new Error(`Error fetching products: ${error.message}`);
            }
        },
        searchProducts: async (_, { keyword }) => {
            console.log('keyword en resolver: ', keyword);
            try {
                return await productService.searchProducts(keyword);
            } catch (error) {
                throw new Error(`Error fetching products: ${error.message}`);
            }
        }
    },
    Mutation: {
        createProduct: async (_, { input }) => {
            try {
                return await productService.createProduct(input);
            } catch (error) {
                throw new Error(`Error creating product: ${error.message}`);
            }
        },

        updateProduct: async (_, { _id, updates }) => {
            try {
                return await productService.updateProduct(_id, updates);
            } catch (error) {
                throw new Error(`Error updating product: ${error.message}`);
            }
        },

        deleteProduct: async (_, { _id }) => {
            try {
                return await productService.deleteProduct(_id);
            } catch (error) {
                throw new Error(`Error deleting product: ${error.message}`);
            }
        }
    }
};

module.exports = resolvers;
