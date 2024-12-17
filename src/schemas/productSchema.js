const { gql } = require('apollo-server');

const typeDefs = gql`
    type Brand {
        _id:    ID!
        name:   String!
        CountryOrigin: String!
        alias:  [String]!
        logo: String!
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

    type Query {
        products: [Product]!
        searchProducts(keyword: String!): [Product]!
        searchProductId(prodId: ID!): Product!
    }

    input CreateProductInput {
        name:       String!
        desc:       String!
        price:      Float!
        category:   String!
        brandId:    ID 
        brandAlias: String 
        quantity:   Int!
        images:     [String!]!
        facturapi:  String
    }

    input UpdateProductInput {
        name:       String
        desc:       String
        price:      Float
        category:   String
        brandId:    ID
        brandAlias: String
        quantity:   Int
        images:     [String]
    }

    type Mutation {
        createProduct(input: CreateProductInput!): Product!
        updateProduct(_id: ID!, updates: UpdateProductInput!): Product!
        deleteProduct(_id: ID!): Product!
    }
`;

module.exports = typeDefs;
