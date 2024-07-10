import "./App.css"
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import PokemonList from "./component/PokemonList";
import PokemonDetail from "./component/PokemondDetail";
import MyPokemonList from "./component/MyPokemonList";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [myPokemons, setMyPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        setPokemons(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchData();
  }, []);

  const addPokemon = (pokemon) => {
    setMyPokemons([...myPokemons, pokemon]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <h1>Pokémon List</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/my-pokemon-list">My Pokémon List</Link>
        </nav>
        <Routes>
          <Route path="/" element={<PokemonList pokemons={pokemons} />} />
          <Route path="/pokemon/:name" element={<PokemonDetail addPokemon={addPokemon} />} />
          <Route
            path="/my-pokemon-list"
            element={<MyPokemonList myPokemons={myPokemons} setMyPokemons={setMyPokemons} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
