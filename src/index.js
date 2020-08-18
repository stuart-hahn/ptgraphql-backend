const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
type Query {
  info: String!
}
`

const resolvers = {
  Query: {
    info: () => 'This is the API of a player tracker'
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})
server.start(() => console.log('Server is up on http://localhost:4000'))