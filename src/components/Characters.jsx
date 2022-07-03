import React, { useState, useEffect, useReducer, useMemo, useRef} from 'react'
import '../styles/Characters.css';

const initialState = {
  favorites: []
}

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
  const[characters, setCharacters] = useState([]);
  const[favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const[search, setSearch] = useState('');
  const searchInput = useRef(null);

  // const page = '1';
  const API = ('https://rickandmortyapi.com/api/character?page=26');
  // console.log(API)

  useEffect(() => {
    fetch(API)
    .then(res => res.json())
    .then(data => setCharacters(data.results))
  }, [])

  const handleClick = favorite => {
    dispatch({type: 'ADD_TO_FAVORITE', payload: favorite})
  }

  // const handleSearch = (event) => {
  //   setSearch(event.target.value);
  // }

  const handleSearch = () => {
    setSearch(searchInput.current.value);
  }

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

      <div className='character-search'>
        {/* <button onClick={prevPage}>Prev</button> */}

        <input type="text" 
        value={search}
        ref={searchInput} 
        onChange={handleSearch}
        placeholder='Buscar' />

        {/* <button onClick={nextPage}>Next</button> */}
      </div>

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
