const shCartService = require('../services/shCartService');

const resolvers = {
    Query: {
        shoppingCart: async (_, { userId }) => {
            const carts = await shCartService.getShoppingCartByUserId(userId);
            if (!carts || carts.length === 0) {
                throw new Error('No shopping carts found for the given user');
            }
            return carts[0];
        },
        shoppingCartNo: (_, { userId }) => shCartService.getShoppingCartByUserIdNo(userId),
        allUserCarts: (_, { userId }) => shCartService.allUserCarts(userId),
        getAllCarts: () => shCartService.getAllCarts(),
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
