const { gql } = require('apollo-server');

const typeDefs = gql`
    enum TipoUsuario {
        cliente
        admin
    }

    enum MetodoPago {
        Credito
        Debito
        Transferencia
        Deposito
    }

    type User {
        _id: ID!
        nombreCompleto: String!
        email: String!
        password: String!
        direccion: String!
        telefono: String!
        fechaRegistro: String!
        tipoUsuario: TipoUsuario!
        metodoPagoPreferido: [MetodoPago]!
    }

    type Query {
        users: [User]!
        user(_id: ID!): User
    }

    input CreateUserInput {
        nombreCompleto: String!
        email: String!
        password: String!
        direccion: String!
        telefono: String!
        tipoUsuario: TipoUsuario = cliente
        metodoPagoPreferido: [MetodoPago]!
    }

    input UpdateUserInput {
        nombreCompleto: String
        email: String
        password: String
        direccion: String
        telefono: String
        tipoUsuario: TipoUsuario
        metodoPagoPreferido: [MetodoPago]
    }

    type Mutation {
        createUser(input: CreateUserInput!): User!
        updateUser(_id: ID!, input: UpdateUserInput!): User!
        deleteUser(_id: ID!): User!
    }
`;

module.exports = typeDefs;
