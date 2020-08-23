import { ApolloServer, gql, IResolvers } from 'apollo-server'
import sortBy from 'lodash/sortBy'
import find from 'lodash/find'
import filterLodash from 'lodash/filter'
import pokemon from './pokemon.json'
import Fuse from 'fuse.js'

interface Pokemon {
  id: string
  num: string
  name: string
  img: string
  types: string[]
  weaknesses: string[]
  height: string
  weight: string
  egg: string
  prevEvolutions?: Array<{ num: string; name: string }>
  nextEvolutions?: Array<{ num: string; name: string }>
  candy?: string
  candyCount?: number
}

const typeDefs = gql`
  type Pokemon {
    id: ID!
    num: ID!
    name: String!
    img: String!
    types: [String!]!
    weaknesses: [String!]!
    height: String!
    weight: String!
    egg: String!
    prevEvolutions: [Pokemon!]!
    nextEvolutions: [Pokemon!]!
    candy: String
    candyCount: Int
  }

  type Query {
    pokemonMany(skip: Int, limit: Int, filter: String): [Pokemon!]!
    pokemonOne(id: ID!): Pokemon
  }
`

// sortBy was a very easy way to restructure the pokemon object for fuse, a little messy but it works
const pokemonFuse = sortBy(pokemon, poke => parseInt(poke.id, 10))
// Fuse was one of the simpler implementations and usages I found. I am running out of time and decided to implement the quickest thing to turn this in in time.
const fuse = new Fuse(pokemonFuse, {
  keys: ['name',]
})

const resolvers: IResolvers<any, any> = {
  Pokemon: {
    prevEvolutions(rawPokemon: Pokemon) {
      return (
        rawPokemon.prevEvolutions?.map(evolution =>
          find(pokemon, otherPokemon => otherPokemon.num === evolution.num)
        ) || []
      )
    },
    nextEvolutions(rawPokemon: Pokemon) {
      return (
        rawPokemon.nextEvolutions?.map(evolution =>
          find(pokemon, otherPokemon => otherPokemon.num === evolution.num)
        ) || []
      )
    },
  },
  Query: {
    pokemonMany(
      _,
      { skip = 0, limit = 999, filter="" }: { skip?: number; limit?: number, filter: string }
    ): Pokemon[] {
      return filter ?
        fuse.search(filter).map(poke => poke.item)
        :
        sortBy(pokemon, poke => parseInt(poke.id, 10)).slice(
            skip,
            limit + skip
        )
    },
    pokemonOne(_, { id }: { id: string }): Pokemon {
      return (pokemon as Record<string, Pokemon>)[id]
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
