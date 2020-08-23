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
    pokemonMany(skip: Int, limit: Int, filter: String, filterType: String, filterWeakness: String): [Pokemon!]!
    pokemonOne(id: ID!): Pokemon
  }
`

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
      { skip = 0, limit = 999, filter="", filterType="", filterWeakness="" }: { skip?: number; limit?: number, filter: string, filterType: string, filterWeakness: string }
    ): Pokemon[] {
      // sortBy was a very easy way to restructure the pokemon object for fuse, a little messy but it works
      let pokemonFuse = sortBy(pokemon, poke => parseInt(poke.id, 10))
      if(filterType !== '' && filterWeakness !== ''){
        pokemonFuse = pokemonFuse.filter(poke => {
          if(poke.types.includes(filterType) && poke.weaknesses.includes(filterWeakness)){
            return poke
          }
        })
      } else if (filterType !== ''){
        pokemonFuse = pokemonFuse.filter(poke => {
          if(poke.types.includes(filterType)){
            return poke
          }
        })
      } else if (filterWeakness !== ''){
        pokemonFuse = pokemonFuse.filter(poke => {
          if(poke.weaknesses.includes(filterWeakness)){
            return poke
          }
        })
      }

      if(filter || filterWeakness || filterType){
        // Fuse was one of the simpler implementations and usages I found. I did not plan to spend a lot of time configuring the fuzzy search for accuracy, or complexity beyond searching the pokemon name (because this is a proof of concept not a live web app that customers use). With this in mind,it made sense to go with a very simple implementation for this task, such as Fuse.
        const fuse = new Fuse(pokemonFuse, {
          keys: ['name']
        })
        return filter ?
        fuse.search(filter).map(poke => poke.item).slice(
          skip,
          limit + skip
        )
          :
        sortBy(pokemonFuse, poke => parseInt(poke.id, 10)).slice(
          skip,
          limit + skip
        )
      }
      return sortBy(pokemon, poke => parseInt(poke.id, 10)).slice(
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
