const { gql } = require('apollo-server');

const typeDefs = gql`
    type Brand {
        _id: ID!
        name: String!
        CountryOrigin: String!
        alias: [String]
        logo: String!
    }

    type Query {
        brands: [Brand]!
        brand(_id: ID!): Brand
    }

    input CreateBrandInput {
        name: String!
        CountryOrigin: String!
        alias: [String]
        logo: String!
    }

    input UpdateBrandInput {
        name: String
        CountryOrigin: String
        alias: [String]
        logo: String
    }

    type Mutation {
        createBrand(input: CreateBrandInput!): Brand!
        updateBrand(_id: ID!, input: UpdateBrandInput!): Brand!
        deleteBrand(_id: ID!): Brand!
    }
`;

module.exports = typeDefs;
