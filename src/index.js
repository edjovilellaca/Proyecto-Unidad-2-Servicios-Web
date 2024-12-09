const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
<<<<<<< Updated upstream

=======
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
>>>>>>> Stashed changes
//Product
const productTypeDefs = require('./schemas/productSchema');
const productResolvers = require('./resolvers/productResolver');
//User
const userTypeDefs = require('./schemas/userSchema'); 
const userResolvers = require('./resolvers/userResolver');
//Brand
const brandTypeDefs = require('./schemas/brandSchema');
const brandResolvers = require('./resolvers/brandResolver');
//Shopping Cart
const shCartTypeDefs = require('./schemas/shCartSchema');
const shCartResolvers = require('./resolvers/shCartResolvers');

//Todo juntito
const typeDefs = [productTypeDefs, userTypeDefs, brandTypeDefs, shCartTypeDefs];
const resolvers = [productResolvers, userResolvers, brandResolvers, shCartResolvers];

//PalMongo
const startServer = async () => {
    await mongoose.connect('mongodb+srv://edjovilellaca:contra123@projects.qndkw.mongodb.net/CarritoCompras?retryWrites=true&w=majority&appName=projects');
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ]
     });
    server.listen().then(({ url }) => {
        console.log(`Servidor corriendo en ${url}`);
    });
};

startServer();
