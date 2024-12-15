const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const productTypeDefs = require('./schemas/productSchema');
const productResolvers = require('./resolvers/productResolver');

const userTypeDefs = require('./schemas/userSchema');
const userResolvers = require('./resolvers/userResolver');

const brandTypeDefs = require('./schemas/brandSchema');
const brandResolvers = require('./resolvers/brandResolver');

const shCartTypeDefs = require('./schemas/shCartSchema');
const shCartResolvers = require('./resolvers/shCartResolvers');

const typeDefs = [productTypeDefs, userTypeDefs, brandTypeDefs, shCartTypeDefs];
const resolvers = [productResolvers, userResolvers, brandResolvers, shCartResolvers];

const startServer = async () => {
    try {
        await mongoose.connect('mongodb+srv://edjovilellaca:contra123@projects.qndkw.mongodb.net/CarritoCompras?retryWrites=true&w=majority&appName=projects');
        console.log('✅ MongoDB connected successfully.');

        const server = new ApolloServer({
            typeDefs,
            resolvers,
            cors: {
                origin: [
                    'http://localhost:5173', 
                    'https://studio.apollographql.com', // Allow Apollo Studio Sandbox
                    'https://proyecto-unidad-2-servicios-web.onrender.com'
                ],
                credentials: true, 
            },
            persistedQueries: false,
        });

        const PORT = process.env.PORT || 4000;
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        await server.listen();
    } catch (error) {
        console.error('❌ Error starting the server:', error.message);
    }
};

startServer();
