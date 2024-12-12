const shCartService = require('../services/shCartService');

const resolvers = {
    Query: {
        shoppingCart: (_, { userId }) => shCartService.getShoppingCartByUserId(userId),
        shoppingCartNo: (_, { userId }) => shCartService.getShoppingCartByUserIdNo(userId),
        allCarts: () => shCartService.getAllCarts(),
    },
    Mutation: {
        createShoppingCart: (_, { userId }) => shCartService.createShoppingCart(userId),
        addItemToCart: (_, { cartId, input }) => shCartService.addItemToCart(cartId, input),
        updateCartItem: (_, { userId, input }) => shCartService.updateCartItem(userId, input),
        removeItemFromCart: (_, { cartId, productId }) => shCartService.removeItemFromCart(cartId, productId),
        removeOneItemFromCart: (_, { cartId, productId }) => shCartService.removeItemFromCart(cartId, productId),
        clearCart: (_, { userId }) => shCartService.clearCart(userId),
        updateShCart: (_, { cartId, input }) => shCartService.updateShCart(cartId, input),
    }
};

module.exports = resolvers;
