const { PrismaClient } = require('@prisma/client')
const { GraphQLServer } = require('graphql-yoga')

const resolvers = {
  Query: {
    info: () => 'This is the API of a player tracker',
    feed: async (parent, args, context) => {
      return context.prisma.tournament.findMany()
    },
    tournament: async (parent, args, context) => {
      return context.prisma.tournament.findOne({
        where: { id: Number(args.id) }
      })
    }
  },
  Mutation: {
    createTournament: (parent, args, { prisma }) => {
      const newTournament = prisma.tournament.create({
        data: {
          name: args.name,
          url: args.url
        }
      })
      return newTournament
    },
    // updateTournament: (parent, args, { prisma }) => {
    //   const tournament = tournaments.find(t => t.id === args.id)
    //   if (!tournament) {
    //     throw new Error("Tournament not found")
    //   }
    //   if (args.name) {
    //     tournament.name = args.name
    //   }
    //   if (args.url) {
    //     tournament.url = args.url
    //   }
    //   return tournament
    // },
    // deleteTournament: (parent, args, { prisma }) => {
    //   const tournament = tournaments.find(t => t.id === args.id)
    //   if (!tournament) {
    //     throw new Error('Could not delete tournament')
    //   }
    //   tournaments = tournaments.filter(t => t.id !== tournament.id)
    //   return tournament
    // }
  }
}

const prisma = new PrismaClient()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma
  }
})
server.start(() => console.log('Server is up on http://localhost:4000'))