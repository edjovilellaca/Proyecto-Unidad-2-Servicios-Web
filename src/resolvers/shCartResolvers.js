const shCartService = require('../services/shCartService');

const resolvers = {
    Query: {
        shoppingCart: (_, { userId }) => shCartService.getShoppingCartByUserId(userId),
        allCarts: () => shCartService.getAllCarts(),
    },
    Mutation: {
        createShoppingCart: (_, { userId }) => shCartService.createShoppingCart(userId),
        addItemToCart: (_, { userId, input }) => shCartService.addItemToCart(userId, input),
        updateCartItem: (_, { userId, input }) => shCartService.updateCartItem(userId, input),
        removeItemFromCart: (_, { userId, productId }) => shCartService.removeItemFromCart(userId, productId),
        clearCart: (_, { userId }) => shCartService.clearCart(userId),
        updateShCart: (_, { cartId, input }) => shCartService.updateShCart(cartId, input),
    }
};

module.exports = resolvers;
