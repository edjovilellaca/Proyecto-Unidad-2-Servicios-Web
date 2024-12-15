const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

// Product
const productTypeDefs = require('./schemas/productSchema');
const productResolvers = require('./resolvers/productResolver');
// User
const userTypeDefs = require('./schemas/userSchema'); 
const userResolvers = require('./resolvers/userResolver');
// Brand
const brandTypeDefs = require('./schemas/brandSchema');
const brandResolvers = require('./resolvers/brandResolver');
// Shopping Cart
const shCartTypeDefs = require('./schemas/shCartSchema');
const shCartResolvers = require('./resolvers/shCartResolvers');

// Combined Schema and Resolvers
const typeDefs = [productTypeDefs, userTypeDefs, brandTypeDefs, shCartTypeDefs];
const resolvers = [productResolvers, userResolvers, brandResolvers, shCartResolvers];

const startServer = async () => {
    await mongoose.connect('mongodb+srv://edjovilellaca:contra123@projects.qndkw.mongodb.net/CarritoCompras?retryWrites=true&w=majority&appName=projects');

    const app = express();

    app.use(cors({
        origin: ['http://localhost:5173', 'https://proyecto-unidad-2-servicios-web-1.onrender.com'],
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS'],
    }));

    const server = new ApolloServer({ typeDefs, resolvers });

    server.applyMiddleware({ app, cors: false });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en https://proyecto-unidad-2-servicios-web-1.onrender.com${server.graphqlPath}`);
    });
};

startServer();
