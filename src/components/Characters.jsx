import React, { useState, useReducer, useMemo, useRef, useCallback} from 'react'
import Search from './Search';
import useCharacters from '../hooks/useCharacters';
import '../styles/Characters.css';

const initialState = {
  favorites: []
}

const API = ('https://rickandmortyapi.com/api/character?page=1');

const favoriteReducer = (state, action) => {
  switch (action.type){
    case 'ADD_TO_FAVORITE':
      return{
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    default:
      return state;
  }
}

const Characters = () => {
  const[favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const[search, setSearch] = useState('');
  const searchInput = useRef(null);
  const characters = useCharacters(API)

  const handleClick = favorite => {
    dispatch({type: 'ADD_TO_FAVORITE', payload: favorite})
  }

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, [])

  const filteredUsers = useMemo(() => characters.filter((user) => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  }), [characters, search])

  return (
    <div className='characters-container'>
      <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

      <section className='character-favorite'>
        {favorites.favorites.map(favorite => (
          <article key={favorite.id}>
            <img src={favorite.image} alt="" />
            <h2>{favorite.name}</h2>
          </article>
        ))}
      </section>

      {filteredUsers.map(character => (
        <article className='character-info' key={character.id}>
          <h2>{character.name}</h2>
          <div style={{display: "inline-flex"}}>
            <h3 style={
              (character.status==="Alive" && {color: "green"}) ||
              (character.status==="Dead" && {color: "red"}) ||
              (character.status==="unknown" && {color: "gray"})
            }>{character.status}</h3>
          </div>
          <img src={character.image} alt="" />
          <p><b>Especie: </b>{character.species}</p>
          <p><b>Genero: </b>{character.gender}</p>
          <p><b>Planeta de origen: </b>{character.origin.name}</p>
          <p><b>Ultima ubicacion: </b>{character.location.name}</p>
          <button type='button' onClick={() => handleClick(character)}>Agregar a favoritos</button>
        </article>
      ))}
    </div>
  )
}

export default Characters