const { gql } = require('apollo-server');

const typeDefs = gql`
    type CartItem {
        product: Product!
        quantity: Int!
    }

    type ShoppingCart {
        _id: ID!
        user: User!
        productos: [CartItem!]!
        subtotal: Float! 
        total: Float!
        createdAt: String!
        updatedAt: String!
        status: String!
    }

    type Query {
        shoppingCart(userId: ID!): ShoppingCart
        shoppingCartNo(userId: ID!): ShoppingCart
        allUserCarts(userId: ID!): [ShoppingCart]
        allCarts: [ShoppingCart]!
    }

    input AddToCartInput {
        productId: ID!
        quantity: Int!
    }

    input UpdateCartItemInput {
        productId: ID!
        quantity: Int!
    }

    input UpdateCartInput{
        status: String
    }

    type Mutation {
        createShoppingCart(userId: ID!): ShoppingCart!
        addItemToCart(cartId: ID!, input: [AddToCartInput!]!): ShoppingCart!
        updateCartItem(cartId: ID!, input: UpdateCartItemInput!): ShoppingCart!
        removeItemFromCart(cartId: ID!, productId: ID!): ShoppingCart!
        removeOneItemFromCart(cartId: ID!, productId: ID!): ShoppingCart!
        clearCart(cartId: ID!): ShoppingCart!
        updateShCart(cartId: ID!, input: UpdateCartInput!): ShoppingCart!
    }
`;

module.exports = typeDefs;
