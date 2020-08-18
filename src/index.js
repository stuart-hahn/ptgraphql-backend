const { GraphQLServer } = require('graphql-yoga')

let tournaments = [
  {
    id: 'fnf-0',
    name: "Friday Night Football #1",
    url: 'twitch.tv/mutheadtv'
  },
  {
    id: 'fnf-1',
    name: "Friday Night Football #2",
    url: 'twitch.tv/mutheadtv'
  },
]

const typeDefs = `
type Query {
  info: String!
  feed: [Tournament!]!
}

type Tournament {
  id: ID!
  name: String!
  url: String!
}
`

const resolvers = {
  Query: {
    info: () => 'This is the API of a player tracker',
    feed: () => tournaments
  },
  Tournament: {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    url: (parent) => parent.url
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})
server.start(() => console.log('Server is up on http://localhost:4000'))