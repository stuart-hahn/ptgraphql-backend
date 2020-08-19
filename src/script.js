const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  const newTournament = await prisma.tournament.create({
    data: {
      name: "Friday Night Football #1",
      url: "muthead.com"
    }
  })
  const allTournaments = await prisma.tournament.findMany()
  console.log(allTournaments)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })