import { MongoClient, ObjectId } from "mongodb";
import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import { makeExecutableSchema } from "graphql-tools";
import cors from "cors";
import { prepare } from "../util/index";

const app = express();

app.use(cors());

const homePath = "/graphiql";
const URL = "http://localhost";
const PORT = 3001;
const MONGO_URL = "mongodb://localhost:27017/blog";

export const start = async () => {
  try {
    const db = await MongoClient.connect(MONGO_URL);

    const Questions = db.collection("questions");
    const Answers = db.collection("answers");

    const typeDefs = [
      `
      type Query {
        question(_id: String): Question
        questions: [Question]
        answer(_id: String): Answer
        gardener(_id: String): Gardener
        gardeners: [Gardener]
        show(_id: String): Show
        shows: [Show]
      }
      type Question {
        _id: String
        content: String
        showId: String
        answers: [Answer]
      }
      type Answer {
        _id: String
        questionId: String
        gardenerId: String
        content: String
        question: Question
      }
      type Gardener {
        _id: String
        name: String
      }
      type Show {
        _id: String
        location: String
        date: Date
      }
      type Mutation {
        createQuestion(showId: String, content: String): Question
        createAnswer(questionId: String, gardenerId: String, content: String): Answer
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
        answer: async (root, { _id }) => {
          return prepare(await Answers.findOne(ObjectId(_id)));
        }
      },
      Question: {
        answers: async ({ _id }) => {
          return (await Answers.find({ questionId: _id }).toArray()).map(
            prepare
          );
        }
      },
      Answer: {
        question: async ({ questionId }) => {
          return prepare(await Questions.findOne(ObjectId(questionId)));
        }
      },
      Mutation: {
        createQuestion: async (root, args, context, info) => {
          const res = await Questions.insertOne(args);
          return prepare(res.ops[0]); // https://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#~insertOneWriteOpResult
        },
        createAnswer: async (root, args) => {
          const res = await Answers.insert(args);
          return prepare(await Answers.findOne({ _id: res.insertedIds[1] }));
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
