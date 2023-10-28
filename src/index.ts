import express from "express";
import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4'


async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;
  app.use(express.json());
  // ! Creating GraphQL Server
  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
        say(name:String):String
      }
    `,
    resolvers: {
      Query: {
        hello: () => `Hey There, I am a GraphQl server`,
        say:(_,{name}:{name:String}) =>`Hey ${name} How are you ?`
      }
    }
  })

  // TODO: Start GraphQL Server
  await gqlServer.start();

  // ! Server Listening 
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

  app.use('/graphql', expressMiddleware(gqlServer))

  // End Point
  app.use('/', (req, res) => {
    res.json({ success: 'Server is Up Successfully' })
  })
}
startServer();
