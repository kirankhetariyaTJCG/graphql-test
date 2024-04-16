// const express = require('express');
// const bodyParser = require('body-parser');
// const { ApolloServer } = require('apollo-server-express');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const typeDefs = require('./graphql/schema/schema');
// const userResolvers = require('./graphql/resolvers/userResolver');
// const productResolvers = require('./graphql/resolvers/productResolver');

// const app = express();
// app.use(bodyParser.json());

// // MongoDB connection
// mongoose.connect('mongodb+srv://kirankhetariya:jQnp8fQgv1WQooDx@cluster0.4yqahrj.mongodb.net/?retryWrites=true&w=majority');

// const db = mongoose.connection;

// db.on('error', (error) => {
//   console.error(`MongoDB connection error: ${error}`);
// });

// db.once('open', () => {
//   console.log('Connected to MongoDB');
//   startServer();
// });


// // Apply middleware before Apollo Server
// app.use((req, res, next) => {
//   // Your middleware logic here
//   next();
// });


// let server; 

// function startServer() {
//   if (!server) { 
//     server = new ApolloServer({
//       typeDefs,
//       resolvers: [userResolvers, productResolvers],
//       context: ({ req }) => {
//         // console.log("req-----------", req)
//         const token = req.headers.authorization || '';
//         try {
//           const user = jwt.verify(token, 'bfuyt083ys'); 
//           console.log("user", user)
//           return { user };
//         } catch (error) {
//           console.log("error", error.message)
//           return {};
//         }
//       },
//     });

//     server.start().then(() => {
//       server.applyMiddleware({ app });

//       const PORT = process.env.PORT || 3000;

//       app.listen(PORT, () => {
//         console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
//       });
//     });
//   }
// }

const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/schema/schema');
const userResolvers = require('./graphql/resolvers/userResolver');
const productResolvers = require('./graphql/resolvers/productResolver');

const app = express();

// Add Body-Parser Middleware
app.use(bodyParser.json());
app.use(cors())
// MongoDB connection
mongoose.connect('mongodb+srv://kirankhetariya:jQnp8fQgv1WQooDx@cluster0.4yqahrj.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', (error) => {
  console.error(`MongoDB connection error: ${error}`);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
  startServer();
});

// Apply middleware before Apollo Server
app.use((req, res, next) => {
  // Your middleware logic here
  next();
});

let server;

function startServer() {
  if (!server) {
    server = new ApolloServer({
      typeDefs,
      resolvers: [userResolvers, productResolvers],
      context: ({ req }) => {
        const token = req.headers.authorization || '';
        try {
          const user = jwt.verify(token, 'nodejs');
          return { user };
        } catch (error) {
          // console.log("error", error.message)
          return {};
        }
      },
    });

    server.start().then(() => {
      server.applyMiddleware({ app });

      const PORT = process.env.PORT || 5500;

      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
      });
    });
  }
}
