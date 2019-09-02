import { MongoClient, ObjectId } from "mongodb";
import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import { makeExecutableSchema } from "graphql-tools";
// import cors from "cors";
const prepare = o => {
  o._id = o._id.toString();
  return o;
};
const app = express();

// app.use(cors());

const homePath = "/graphiql";
const URL = "http://localhost";
const PORT = 3001;
// const MONGO_URL = "mongodb://localhost:27017/blog";

export const start = async () => {
  try {
    const db = await MongoClient.connect(process.env.MONGODB_URI_GQT);

    const Questions = db.collection("questions");
    const Gardeners = db.collection("gardeners");

    const typeDefs = [
      `
      type Query {
        question(_id: String): Question
        questions: [Question]
        gardener(_id: String): Gardener
      }
      type Question {
        _id: String
        title: String
        content: String
        gardeners: [Gardener]
      }
      type Gardener {
        _id: String
        questionId: String
        content: String
        question: Question
      }
      type Mutation {
        createQuestion(title: String, content: String): Question
        createGardener(questionId: String, content: String): Gardener
      }
      schema {
        query: Query
        mutation: Mutation
      }
    `
    ];

    const resolvers = {
      Query: {
        question: async (root, { _id }) => {
          return prepare(await Questions.findOne(ObjectId(_id)));
        },
        questions: async () => {
          return (await Questions.find({}).toArray()).map(prepare);
        },
        gardener: async (root, { _id }) => {
          return prepare(await Gardeners.findOne(ObjectId(_id)));
        }
      },
      Question: {
        gardeners: async ({ _id }) => {
          return (await Gardeners.find({ questionId: _id }).toArray()).map(
            prepare
          );
        }
      },
      Gardener: {
        question: async ({ questionId }) => {
          return prepare(await Questions.findOne(ObjectId(questionId)));
        }
      },
      Mutation: {
        createQuestion: async (root, args, context, info) => {
          const res = await Questions.insertOne(args);
          return prepare(res.ops[0]); // https://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#~insertOneWriteOpResult
        },
        createGardener: async (root, args) => {
          const res = await Gardeners.insert(args);
          return prepare(await Gardeners.findOne({ _id: res.insertedIds[1] }));
        }
      }
    };

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    });

    app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

    app.use(
      homePath,
      graphiqlExpress({
        endpointURL: "/graphql"
      })
    );

    app.listen(PORT, () => {
      console.log(`Visit ${URL}:${PORT}${homePath}`);
    });
  } catch (e) {
    console.log(e);
  }
};
