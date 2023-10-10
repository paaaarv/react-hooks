// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import { ErrorBoundary } from 'react-error-boundary';


function Fallback({error, resetErrorBoundary}) {
    return(
      <div role="alert" > 
      <p> Something went wrong.</p>
        {error.message} 
        <button> Try again </button>
      </div>
    )
}
function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)

  const [state, setState] = React.useState({
    pokemon: null, 
    error: null, 
    status: 'idle', 
  })

  const {pokemon, error, status} = state; 


   React.useEffect(() => {
    if (pokemonName) {
      setState({
        status: 'pending'
      })
      fetchPokemon(pokemonName).then(
        pokemon => {
          setState({
            pokemon,
            status: 'resolved',
          })
        },
        error => {
            setState({
              error,
              status: 'rejected'
            })
        },
      )}
    }, [pokemonName])


  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

    switch(status){
      case 'rejected': 
        throw error; 
      case 'idle': 
        return 'Submit a pokemon'
        break;
      case 'pending':
        if (!pokemon) {
          return <PokemonInfoFallback name = {pokemonName} />
        }
        break;
      default: 
          return <PokemonDataView pokemon = {state.pokemon}/>
      
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary key={pokemonName} FallbackComponent={Fallback}> 
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
