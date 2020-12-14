const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const bodyParser = require('body-parser')

const resolvers = require('./resolvers')
const models = require('./models')
const typeDefs = require('./schema')

const app = express()

const port = 4000

app.use(cors())
app.use(bodyParser.json())

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ models })
})

server.applyMiddleware({
  app, path: '/'
})

// The `listen` method launches a web server.
app.listen(port, () => {
  console.log(`🚀  Server ready at port ${port}`)
})
