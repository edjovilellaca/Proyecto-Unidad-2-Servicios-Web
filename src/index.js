const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

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

    const server = new ApolloServer({ 
        typeDefs, 
        resolvers, 
        cors: {
            origin: [
                'http://localhost:5173',            
                'https://studio.apollographql.com',
            ],
            credentials: true,             
        },
    });
    
    server.listen().then(({ url }) => {
        console.log(`Servidor corriendo en ${url}`);
    });
};

startServer();
