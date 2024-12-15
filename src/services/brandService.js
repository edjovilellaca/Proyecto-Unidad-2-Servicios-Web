const Brand = require('../models/brandModel');

module.exports = {
    getAllBrands: async () => {
        return await Brand.find();
    },
    getBrandById: async (_id) => {
        return await Brand.findById(_id);
    },
    createBrand: async (input) => {
        const { name, alias, CountryOrigin, logo } = input;
        const brand = new Brand({ name, alias, CountryOrigin, logo });
        return await brand.save();
    },
    updateBrand: async (_id, updates) => {
        const updatedBrand = await Brand.findByIdAndUpdate(_id, updates, { new: true });
        if (!updatedBrand) {
            throw new Error(`Brand with ID: ${_id} not found.`);
        }
        return updatedBrand;
    },
    deleteBrand: async (_id) => {
        const deletedBrand = await Brand.findByIdAndDelete(_id);
        if (!deletedBrand) {
            throw new Error(`Brand with ID: ${_id} not found.`);
        }
        return deletedBrand;
    }
};
