import cors from "cors";
import express from "express";
import { createServer } from 'http';
import { ApolloServer } from '@apollo/server';
import { schema } from './graphql/schema.js';
import { connectDB } from './config/database.js';
import { resolvers } from './graphql/resolvers.js';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { GraphQLError } from "graphql";

await connectDB();
const app = express();
const httpServer = createServer(app);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await server.start();

let corsOptions = {
  origin: '*'
}

app.use(
  '/api',
  cors<cors.CorsRequest>(corsOptions),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      try {
        /* const token = req.headers.cookie?.split('=')[1] || null;

        if (!token) throw new Error('Usuario no autenticado');

        const user = await verifyToken(token);
        
        if (!user) throw new Error('Token no válido');
 */
        return {};
      } catch (error: any) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }
    }
  }),
);

httpServer.listen(4000, () => {
  console.log(`Server ready at http://localhost:4000/api`);
});