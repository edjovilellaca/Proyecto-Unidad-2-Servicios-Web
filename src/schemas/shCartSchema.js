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
    }

    type Query {
        shoppingCart(userId: ID!): ShoppingCart
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

    type Mutation {
        createShoppingCart(userId: ID!): ShoppingCart!
        addItemToCart(userId: ID!, input: [AddToCartInput!]!): ShoppingCart!
        updateCartItem(userId: ID!, input: UpdateCartItemInput!): ShoppingCart!
        removeItemFromCart(userId: ID!, productId: ID!): ShoppingCart!
        clearCart(userId: ID!): ShoppingCart!
    }
`;

module.exports = typeDefs;
