const userService = require('../services/userService');

const resolvers = {
    Query: {
        users: () => userService.getAllUsers(),
        user: (_, { _id }) => userService.getUserById(_id)
    },
    Mutation: {
        createUser: (_, { input }) => userService.createUser(input),
        deleteUser: (_, { _id }) => userService.deleteUser(_id),
        updateUser: (_, { _id, updates }) => userService.updateUser(_id, updates)
    }
};

module.exports = resolvers;
