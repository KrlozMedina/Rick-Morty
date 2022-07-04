import React, { useState, useReducer, useMemo, useRef, useCallback} from 'react'
import '../styles/Characters.css';
import Search from './Search';
import useCharacters from '../hooks/useCharacters';

const initialState = {
  favorites: []
}

const API = ('https://rickandmortyapi.com/api/character?page=29');

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
  // const[characters, setCharacters] = useState([]);
  const[favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const[search, setSearch] = useState('');
  const searchInput = useRef(null);

  // const page = '1';
  // console.log(API)

   const characters = useCharacters(API)
  
  // useEffect(() => {
  //   fetch(API)
  //   .then(res => res.json())
  //   .then(data => setCharacters(data.results))
  // }, [])

  const handleClick = favorite => {
    dispatch({type: 'ADD_TO_FAVORITE', payload: favorite})
  }

  // const handleSearch = (event) => {
  //   setSearch(event.target.value);
  // }

  // const handleSearch = () => {
  //   setSearch(searchInput.current.value);
  // }

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, [])

  // const filteredUsers = characters.filter((user) => {
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // })

  const filteredUsers = useMemo(() => characters.filter((user) => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    }), [characters, search]
  )

  return (
    <div className='characters-container'>
      {/* <h1>Favoritos</h1> */}
      <section className='character-favorite'>
        {favorites.favorites.map(favorite => (
          <article key={favorite.id}>
            <img src={favorite.image} alt="" />
            <h2>{favorite.name}</h2>
          </article>
        ))}
      </section>

      <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

      {filteredUsers.map(character => (
        <article className='character-info' key={character.id}>
          <h2>{character.name}</h2>
          <h3>{character.status}</h3>
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
