# A Journey from React to MongoDB, via Apollo/GraphQL

(This is _very much_ a work in progress... therefore unfit for human consumption just yet)

## Part A: Setup steps

### Step 1: Sign up for free account with [MongoDB](cloud.mongodb.com)

- create and set up a free 'cluster'
- choose Cloud Provider & Region, I chose the Free Tier from Ireland
- choose Cluster Tier, I chose M0 Sandbox (the free forever tier)
- choose Cluster Name, I kept the suggested 'Cluster0'
- finally, click 'Create Cluster' button at the bottom of the page (currently this seems to take a few minutes to create), go and make a cuppa

### Step 2: Sign up for free [Zeit Now](https://zeit.co) account

- can use Github or Gitlab integration, or just an email
- profile settings, choose a \<username>
- Github integration setup - via 'Integrations' top menu
- in terminal, install the Now CLI with `npm install -g now` (any of your repositories will be able to deploy to 'now')

### Step 3: Create new repository

- in terminal: `npx create-react-app example-users`
- this will create the dependencies `react`, `react-dom` and `react-scripts`
- this will also add build scripts to the package.json

### Step 4: Deploy example-users to now

- `now` (yes really, just that)
- watch it deploy on your Zeit dashboard at `zeit.co/YourZeitUsername`
  - dots go green once it's deployed
  - check out your newly deployed website (eg, `example-users.YourZeitUsername.now.sh`)

### Step 5: Connect local example-users repo to Github

- on [github](github.com), add new repository
- give it the same name (eg, here it's `example-users`)
- in terminal `git remote add origin git@github.com:YourGithubUsername/example-users.git`
  then `git push -u origin master`
- so whenever you _either_ `push` to github, or just type `now` in terminal, your repo will be deployed to Zeit.

## Part B: Sample data into MongoDB

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
    - name: 'Bilbo Baggins'
    - email: 'bilbo.baggins@hobbiton.me'
  - then click 'Create'

### Step 7: Setup database user

- on MongoDB Atlas site, go to 'Database Access' on left menu
- click 'Add new user'
- create an Admin user

### Step 8: Setup Zeit / MongoDB integration

- on Zeit Now site, go to Integrations, browse Marketplace
- choose MongoDB Atlas
- on the Add MongoDB page, your Zeit Now account will be showing, click it to add the connection
- on the configuration page, edit the configuration name, perhaps to `MongoDB_connection`
- don't need to create a MongoDB Atlas account, as you already have one
- enter your MongoDB Atlas username (email)
- use the link 'account settings' to now go to MongoDB Atlas and set a public API key.
- click your username (on Mongo) to select 'Preferences', then choose 'Public API Access'

## Part C: Secrets, environment variables & connection strings

- Zeit secrets - have to do this in the relevant repo

### Allow any connections to your MongoDB Cluster

- on MongoDB Atlas, go to Clusters on left menu
- click 'Connect'
- choose 'Add a different IP address'
- set `0.0.0.0` to allow connection from anywhere, since Zeit Now does not support static IP addresses<sup>[[1]](#footnote1)</sup> (then says 'You're ready to connect')
- click 'Choose a connection method'
- choose 'Connect your application'
- choose Node.js and latest version
- copy the 'Connection string only' string, and note the instructions about swapping out your admin password in the string, save it somewhere, we'll need it in [STEP WHATEVER]

### Set programmatic API key in MongoDB Atlas

- click the Context picker in the top-left hand corner and choose your organisation
- pick Settings from the left hand menu
- toggle the 'Require IP Whitelist for Public API' setting to 'On'
- pick Access from left hand menu
- click the tab 'API keys'
- click 'Create API key' button
- add a description, perhaps 'Zeit Now connection'
- copy the public key, save it somewhere
- leave the permissions as 'Organisation member', click next button
- copy the private key, save it somewhere, click done

### Step 6: MongoDB connection string

## Part D: The Apollo server `example-server`

### Setup the repository

- create new folder in terminal `mkdir example-server`
- go into it `cd example-server`
- initialise as a node project `npm init -y`
- install dependencies `npm install apollo-server dotenv graphql mongoose`
- create `.env` file (empty for now), and put the following in a `.gitignore` file:

```
.env
/node_modules
```

- if using github, now's the time to add this new repository:

  - still in terminal `git init`
  - make first commit
  - from GitHub website, add repository `example-server`
  - leave everything default, click Create repository
  - do the _"…or push an existing repository from the command line"_ things eg:

  ```
  git remote add origin git@github.com:YourGithubUsername/example-server.git
  git push -u origin master
  ```

- add the following to `package.json`:

```
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

### Connect `example-server` to MongoDB Atlas

- the following numbered steps allow connection to MongoDB from your local _and_ from the deployed Zeit Now environment. The MongoDB connection string contains your login details, so is kept in a hidden file: `.env`. However once the repo is deployed on Zeit Now, `.env` is no longer available. So additionally, you need to setup a 'secret' via the Zeit Now CLI:

  1. **Create Zeit Now secret:**
     in terminal type: `now secrets add mongodb-connect mongodb+srv://\YourMongoDBAdminUsername:YourPassword@YourClusterName.mongodb.net/\YourDatabaseName?retryWrites=true` where 'mongodb-connect' here is the _name_ of the secret.

  2. **Create local environment variable:**
     add this line to your `.env` file: `MONGODB_CONNECT=mongodb+srv://\YourMongoDBAdminUsername:YourPassword@YourClusterName.mongodb.net/\YourDatabaseName?retryWrites=true`

  3. **Add Zeit Now secret to now.json:**
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

### Create index.js

<script src="https://gist.github.com/Greenie10/620e054b12897ca52de6f55240f25790.js"></script>

<a name="footnote1">[1]</a>: [Create and Deploy a MongoDB-Powered Node.js API with ZEIT Now](https://zeit.co/guides/deploying-a-mongodb-powered-api-with-node-and-now)

<a name="footnote2">[2]</a>: [Environment Variables and Secrets with Zeit Now](https://zeit.co/docs/v2/environment-variables-and-secrets/?query=sec)
