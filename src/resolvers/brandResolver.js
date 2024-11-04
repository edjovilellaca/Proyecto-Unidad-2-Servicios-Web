const brandService = require('../services/brandService');

const resolvers = {
    Query: {
        brands: () => {
            return brandService.getAllBrands();
        },
        brand: (_, { _id }) => {
            return brandService.getBrandById(_id);
        }
    },
    Mutation: {
        createBrand: async (_, { input }) => {
            try {
                return await brandService.createBrand(input);
            } catch (error) {
                console.error("Error in createBrand resolver:", error);
                throw new Error("Failed to create brand.");
            }
        },
        updateBrand: async (_, { _id, updates }) => {
            try {
                return await brandService.updateBrand(_id, updates);
            } catch (error) {
                console.error("Error in updateBrand resolver:", error);
                throw new Error("Failed to update brand.");
            }
        },
        deleteBrand: async (_, { _id }) => {
            try {
                return await brandService.deleteBrand(_id);
            } catch (error) {
                console.error("Error in deleteBrand resolver:", error);
                throw new Error("Failed to delete brand.");
            }
        }
    }
};

module.exports = resolvers;
