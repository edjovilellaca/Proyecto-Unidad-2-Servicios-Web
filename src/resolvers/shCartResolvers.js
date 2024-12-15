const shCartService = require('../services/shCartService');

const resolvers = {
    Query: {
        shoppingCart: (_, { userId }) => {
            try {
                return shCartService.getShoppingCartByUserId(userId);
            } catch (error) {
                throw new Error(`Error fetching cart: ${error.message}`);
            }
        },

        shoppingCartNo: (_, { userId }) => {
            try {
                return shCartService.getShoppingCartByUserIdNo(userId);
            } catch (error) {
                throw new Error(`Error fetching carts: ${error.message}`);
            }
        },

        allUserCarts: (_, { userId }) => {
            try {
                return shCartService.allUserCarts(userId);
            } catch (error) {
                throw new Error(`Error fetching all of the user ${userId} carts: ${error.message}`);
            }
        },

        allCarts: () => {
            try {
                return shCartService.getAllCarts();
            } catch (error) {
                throw new Error(`Error fetching all carts: ${error.message}`);
            }
        },
    },
    Mutation: {
        createShoppingCart: (_, { userId }) => shCartService.createShoppingCart(userId),
        addItemToCart: (_, { cartId, input }) => shCartService.addItemToCart(cartId, input),
        updateCartItem: (_, { userId, input }) => shCartService.updateCartItem(userId, input),
        removeItemFromCart: (_, { cartId, productId }) => shCartService.removeItemFromCart(cartId, productId),
        removeOneItemFromCart: (_, { cartId, productId }) => shCartService.removeOneItemFromCart(cartId, productId),
        clearCart: (_, { userId }) => shCartService.clearCart(userId),
        updateShCart: (_, { cartId, input }) => shCartService.updateShCart(cartId, input),
    }
};

module.exports = resolvers;
