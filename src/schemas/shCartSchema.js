const { gql } = require('apollo-server');

const typeDefs = gql`
    type CartItem {
        product: Product!
        quantity: Int!
    }

    type Product {
        _id:        ID!
        name:       String!
        desc:       String!
        price:      Float!
        category:   String!
        brand:      Brand!    
        quantity:   Int!
        cDate:      String!
        images:     [String!]!
        facturapi:  String
    }

    type ShoppingCart {
        _id: ID!
        user: User!
        productos: [CartItem!]!
        subtotal: Float! 
        total: Float!
        sDate: String!
        cDate: String!
        status: String!
    }

    type Query {
        shoppingCart(userId: ID!): ShoppingCart
        shoppingCartNo(userId: ID!): [ShoppingCart]
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
