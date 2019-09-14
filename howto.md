# A Journey from React to MongoDB, via Apollo/GraphQL

(This is _very much_ a work in progress... therefore unfit for human consumption just yet)

## Part A: Set up accounts in MongoDB Atlas and ZEIT Now

There will be a number of things you'll need to note down for later, eg, paths, names, connection strings etc. I recommend keeping a running note of these as you go along: all my brain is inside [Evernote](https://www.evernote.com/referral/Registration.action?sig=7a898c0bc86cb052472a52f0c75e8d731bef8d6de0f69d5d07464906496bfe6d&uid=58498943).

### Step 1: Sign up for free account with [MongoDB Atlas](cloud.mongodb.com)

- create and set up a free 'cluster'
- choose Cloud Provider & Region, I chose the Free Tier from Ireland
- choose Cluster Tier, I chose M0 Sandbox (the free forever tier)
- choose Cluster Name, I kept the suggested 'Cluster0'
- finally, click 'Create Cluster' button at the bottom of the page (currently this seems to take a few minutes to create), go and make a cuppa

### Step 2: Sign up for free [ZEIT Now](https://zeit.co) account

- provides very easy deployment process
- can use Github or Gitlab integration, or just an email
- profile settings, choose a \<username>
- Github integration setup - via 'Integrations' top menu
- in terminal, install the Now CLI with `npm install -g now` (any of your repositories will be able to deploy to 'now')

## Part B: Set up the React front end `example-users`

### Step 3: Create new repository

- in terminal: `npx create-react-app example-users`
- this will create the dependencies `react`, `react-dom` and `react-scripts` for you
- this will also add build scripts to the package.json

### Step 4: Deploy example-users to now

- in terminal: `now` (yes really, just that)
- watch it deploy on your ZEIT dashboard at `zeit.co/YourZEITUsername`
  - dots go green once it's deployed
  - check out your newly deployed website (eg, `example-users.YourZEITUsername.now.sh`)

### Step 5: Connect local example-users repo to Github

- on [github](github.com), add new repository
- give it the same name (eg, here it's `example-users`)
- in terminal:

  ```shell
  git remote add origin git@github.com:YourGithubUsername/example-users.git
  git push -u origin master
  ```

- so whenever you _either_ `push` to github, or just type `now` in terminal, your repo will be deployed to ZEIT.

## Part C: Setup database in MongoDB

### Step 6: Create database & 'table'

- on MongoDB Atlas site, go to Clusters on left menu
- click on 'Collections' in the Sandbox box
- click on 'Add my own data'
- create a database called `example`
- create a collection (aka 'table' in old-fashioned lingo) called `users`
- select your example database, and the users collection
  - click 'insert document' to add some sample data
  - `_id` is created for you
  - create key:value pairs for:
    - Name: 'Bilbo Baggins'
    - Email: 'bilbo.baggins@hobbiton.me'
  - then click 'Create'
  - note the case of the keys (eg, `Name`, not `name`)

### Step 7: Setup database admin user

- on MongoDB Atlas site, go to 'Database Access' on left menu
- click 'Add new user'
- create an Admin user

### Step 8: Setup ZEIT / MongoDB integration

- on ZEIT Now site, go to Integrations, browse Marketplace
- choose MongoDB Atlas
- on the Add MongoDB page, your ZEIT Now account will be showing, click it to add the connection
- on the configuration page, edit the configuration name, perhaps to `MongoDB_connection`
- don't need to create a MongoDB Atlas account, as you already have one
- enter your MongoDB Atlas username (email)
- use the link 'account settings' to now go to MongoDB Atlas and set a public API key.
- click your username (on Mongo) to select 'Preferences', then choose 'Public API Access'

## Part D: Secrets, environment variables & connection strings

### Step 9: Allow any connections to your MongoDB Cluster

- on MongoDB Atlas, go to Clusters on left menu
- click 'Connect'
- choose 'Add a different IP address'
- set `0.0.0.0` to allow connection from anywhere, since ZEIT Now does not support static IP addresses<sup>[[1]](#footnote1)</sup> (then says 'You're ready to connect')
- click 'Choose a connection method'
- choose 'Connect your application'
- choose Node.js and latest version
- copy the 'Connection string only' string, and note the instructions about swapping out your admin password in the string, save it somewhere, we'll need it in [STEP WHATEVER]

### Step 10: Set programmatic API key in MongoDB Atlas

- click the Context picker in the top-left hand corner and choose your organisation
- pick Settings from the left hand menu
- toggle the 'Require IP Whitelist for Public API' setting to 'On'
- pick Access from left hand menu
- click the tab 'API keys'
- click 'Create API key' button
- add a description, perhaps 'ZEIT Now connection'
- copy the public key, save it somewhere
- leave the permissions as 'Organisation member', click next button
- copy the private key, save it somewhere, click done

### Step 11: MongoDB connection string

## Part E: The Apollo server `example-server`

### Step 12: Setup the repository in GitHub

- create new folder in terminal `mkdir example-server`
- go into it `cd example-server`
- initialise as a node project `npm init -y`
- install dependencies `npm install apollo-server dotenv graphql mongoose`
- create `.env` file (empty for now), and put the following in a `.gitignore` file:

  ```javascript
  .env
  /node_modules
  ```

- if using github, now's the time to initialise this as a new repository:

  - still in terminal `git init`
  - make first commit
  - from GitHub website, add repository `example-server`
  - leave everything default, click Create repository
  - do the _"…or push an existing repository from the command line"_ things eg:

    ```shell
    git remote add origin git@github.com:YourGithubUsername/example-server.git
    git push -u origin master
    ```

### Step 13: Configure `package.json` scripts and `now.json`

- add the following to `package.json`:

  ```javascript
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "node ./index.js",
      "build": "exit 0"
    },
  ```

- create a file called `now.json` at the root of `example-server` repo, and add the following:

  ```json
  {
    "name": "example-server",
    "version": 2,
    "builds": [{ "src": "*.js", "use": "@now/node" }]
  }
  ```

### Step 14: Connect `example-server` to MongoDB Atlas

- the following numbered steps allow connection to MongoDB from your local environment _and_ from the deployed ZEIT Now environment. The MongoDB connection string contains your login details, so is kept in a hidden file: `.env` and is used when running the project locally. However once the repo is deployed on ZEIT Now, `.env` is no longer available. So as well as this local environment variable, you need to setup a 'secret' via the ZEIT Now CLI:

  1. **Create ZEIT Now secret:**
     in terminal type:

     ```shell
     now secrets add mongodb-connect mongodb+srv://YourMongoDBAdminUsername:YourPassword@YourClusterName.mongodb.net/YourDatabaseName?retryWrites=true
     ```

     where 'mongodb-connect' here is the _name_ of the secret.

  2. **Create local environment variable:**
     add this line to your `.env` file:

     ```shell
     MONGODB_CONNECT=mongodb+srv://YourMongoDBAdminUsername:YourPassword@YourClusterName.mongodb.net/YourDatabaseName?retryWrites=true
     ```

  3. **Add ZEIT Now secret to now.json:**
     add the following to your `now.json` file:

     ```json
      "env": {
        "MONGODB_CONNECT": "@mongodb-connect"
      },
      "build": {
        "env": {
          "MONGODB_CONNECT": "@mongodb-connect"
        }
      }
     ```

### Step 15: Set up Mongoose to connect to MongoDB

- create new file at the root called `config.js` with the following:

  ```javascript
  const mongoose = require("mongoose");
  require("dotenv").config();
  mongoose.Promise = global.Promise;

  const url = process.env.MONGODB_CONNECT;

  mongoose.connect(process.env.MONGODB_CONNECT, { useNewUrlParser: true });
  mongoose.connection.once("open", () =>
    console.log(`Connected to mongo at ${url}`)
  );
  ```

## Part F: Apollo GraphQL

### Step 16: Write `typeDefs` and `resolvers`

- create new file at the root called `index.js` with the following:

  ```javascript
  const { ApolloServer, gql } = require("apollo-server");
  require("./config");

  const { User } = require("./models");

  const typeDefs = gql`
    type User {
      id: ID!
      Name: String
      Email: String
    }

    type Query {
      getUsers: [User]
    }

    type Mutation {
      addUser(Name: String!, Email: String!): User
    }
  `;

  const resolvers = {
    Query: {
      getUsers: async () => await User.find({}).exec()
    },
    Mutation: {
      addUser: async (_, args) => {
        try {
          let response = await User.create(args);
          return response;
        } catch (e) {
          return e.message;
        }
      }
    }
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
  ```

### Step 17: Write `schema` and `model`

- create new file at the root called `models.js` with the following:

  ```javascript
  const mongoose = require("mongoose");
  const { Schema } = mongoose;

  const userSchema = new Schema({
    Name: String,
    Email: String
  });

  const User = mongoose.model("user", userSchema);

  module.exports = {
    User
  };
  ```

## Part G: Deploy and check `example-server` in playground

- push `example-server` to ZEIT, with either `now` on command line, or git commit and push
- once it's deployed (watch it deploying on your ZEIT dashboard) visit your site and hopefully the Apollo playground will appear
- check the schema tab shows sensible things (picture)
- you may need to wake up the MongoDB Atlas cluster, by simply reloading say the cluster page on the website (it's really just a testing playground, you'd have to pay for more of an instant response, always on tier)

  ```javascript
  query {
    getUsers {
      Name
      Email
    }
  }
  ```

- try the mutation (adding a user)

  ```javascript
  mutation {
    addUser(Name: "Jonty McJilly", Email: "jonty.mcjilly@poshtown.com") {
      Name
      Email
      id
    }
  }
  ```

<a name="footnote1">[1]</a>: [Create and Deploy a MongoDB-Powered Node.js API with ZEIT Now](https://zeit.co/guides/deploying-a-mongodb-powered-api-with-node-and-now)

<a name="footnote2">[2]</a>: [Environment Variables and Secrets with ZEIT Now](https://zeit.co/docs/v2/environment-variables-and-secrets/?query=sec)

```

```
