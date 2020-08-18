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

let idCount = tournaments.length

const resolvers = {
  Query: {
    info: () => 'This is the API of a player tracker',
    feed: () => tournaments,
    tournament: (parent, args) => {
      const tournament = tournaments.find(t => t.id === args.id)
      return tournament
    }
  },
  Mutation: {
    createTournament: (parent, args) => {
      const tournament = {
        id: `fnf-${idCount++}`,
        name: args.name,
        url: args.url
      }
      tournaments.push(tournament)
      return tournament
    },
    updateTournament: (parent, args) => {
      const tournament = tournaments.find(t => t.id === args.id)
      if (!tournament) {
        throw new Error("Tournament not found")
      }
      if (args.name) {
        tournament.name = args.name
      }
      if (args.url) {
        tournament.url = args.url
      }
      return tournament
    },
    deleteTournament: (parent, args) => {
      const tournament = tournaments.find(t => t.id === args.id)
      if (!tournament) {
        throw new Error('Could not delete tournament')
      }
      tournaments = tournaments.filter(t => t.id !== tournament.id)
      return tournament
    }
  }
  // Tournament: {
  //   id: (parent) => parent.id,
  //   name: (parent) => parent.name,
  //   url: (parent) => parent.url
  // }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})
server.start(() => console.log('Server is up on http://localhost:4000'))