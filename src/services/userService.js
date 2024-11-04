const User = require('../models/userModel');

module.exports = {
    getAllUsers: async () => {
        return await User.find();
    },

    getUserById: async (_id) => {
        return await User.findById(_id);
    },

    createUser: async (input) => {
        const user = new User(input);
        return await user.save();
    },

    deleteUser: async (_id) => {
        const user = await User.findByIdAndDelete(_id);
        if (!user) throw new Error(`User with ID: ${_id} not found.`);
        return user;
    },

    updateUser: async (_id, updates) => {
        const user = await User.findByIdAndUpdate(_id, updates, { new: true });
        if (!user) throw new Error(`User with ID: ${_id} not found.`);
        return user;
    }
};
