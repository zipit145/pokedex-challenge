import React from 'react'
import styled from 'styled-components'
import { RouteComponentProps, Link } from '@reach/router'
import { useQuery, gql } from '@apollo/client'
import { Container as NesContainer } from 'nes-react'


const Container = styled(NesContainer)`
  && {
    background: white;
    margin: 2rem 25%;

    ::after {
      z-index: unset;
      pointer-events: none;
    }
  }
`

const List = styled.ul`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
`

const ListItem = styled.li`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1rem;

  > *:first-child {
    margin-right: 1rem;
  }
`

const POKEMON_MANY = gql`
  query($skip: Int, $limit: Int, $filter: String, $filterType: String, $filterWeakness: String) {
    pokemonMany(skip: $skip, limit: $limit, filter: $filter, filterType: $filterType, filterWeakness: $filterWeakness) {
      id
      name
      num
      img
    }
  }
`


const Pokemon: React.FC<RouteComponentProps & { clickLink: Function }> = ({
  clickLink,
}) => {
  const [filter, setFilterTerm] = React.useState(undefined)
  const [onChangeTerm, setChangeTerm] = React.useState(undefined)
  const [filterTypeInit, setTypeInit] = React.useState(undefined)
  const [filterType, setType] = React.useState(undefined)
  const [filterWeaknessInit, setWeaknessInit] = React.useState(undefined)
  const [filterWeakness, setWeakness] = React.useState(undefined)

  function onChangeType(e: any) {
    setTypeInit(e.target.value)
  }
  function onChangeWeakness(e: any) {
    setWeaknessInit(e.target.value)
  }
  function onChangeInput(e: any) {
    setChangeTerm(e.target.value)
  }
  function onClickSearch(e: any){
    setWeakness(filterWeaknessInit)
    setFilterTerm(onChangeTerm)
    setType(filterTypeInit)
    setChangeTerm(undefined)
    setWeaknessInit(undefined)
    setTypeInit(undefined)
    e.preventDefault()
  }
  const { loading, error, data } = useQuery(POKEMON_MANY, {
    variables: {filter: filter, filterType: filterType, filterWeakness: filterWeakness}
  })
  const pokemonList:
    | Array<{ id: string; name: string; img: string; num: string }>
    | undefined = data?.pokemonMany

  if (loading) {
    return <p>Loading...</p>
  }
  if (error || !pokemonList) {
    return <p>Error!</p>
  }

  return (
    <Container rounded>
      <form>
        <input placeholder="search for pokemon here" onChange={onChangeInput}></input>
        <select onChange={onChangeWeakness}>
          <option disabled selected>weakness</option>
          <option value="Fire">Fire</option>
          <option value="Water">Water</option>
          <option value="Grass">Grass</option>
          <option value="Psychic">Psychic</option>
          <option value="Flying">Flying</option>
          <option value="Ice">Ice</option>
          <option value="Ground">Ground</option>
          <option value="Rock">Rock</option>
          <option value="Electric">Electric</option>
        </select>
        <select onChange={onChangeType}>
          <option disabled selected>type</option>
          <option value="Fire">Fire</option>
          <option value="Water">Water</option>
          <option value="Grass">Grass</option>
          <option value="Psychic">Psychic</option>
          <option value="Flying">Flying</option>
          <option value="Ice">Ice</option>
          <option value="Ground">Ground</option>
          <option value="Rock">Rock</option>
          <option value="Electric">Electric</option>
        </select>
        <button onClick={onClickSearch}>Search for Specific Pokemon</button>
      </form>
      <List>
        {pokemonList.map(pokemon => (
          <Link to={pokemon.id} onMouseDown={clickLink as any}>
            <ListItem>
              <img src={pokemon.img} />
              {pokemon.name} - {pokemon.num}
            </ListItem>
          </Link>
        ))}
      </List>
    </Container>
  )
}

export default Pokemon
