import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PokemonDetail = ({ addPokemon }) => {
    const [pokemon, setPokemon] = useState(null);
    const [nickname, setNickname] = useState('');
    const [isCaught, setIsCaught] = useState(false);
    const { name } = useParams();

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                setPokemon(response.data);
            } catch (error) {
                console.error('Error fetching the Pokémon', error);
            }
        };

        fetchPokemon();
    }, [name]);

    const catchPokemon = () => {
        const success = Math.random() < 0.5;
        if (success) {
            setIsCaught(true);
        } else {
            alert('Failed to catch the Pokémon. Try again!');
        }
    };

    const handleAddPokemon = () => {
        addPokemon({ name: pokemon.name, nickname });
        setNickname('');
        setIsCaught(false);
    };

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <div className="pokemon-detail">
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Type: {pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}</p>
            <p>Moves: {pokemon.moves.map((moveInfo) => moveInfo.move.name).join(', ')}</p>
            {!isCaught ? (
                <button onClick={catchPokemon}>Catch Pokémon</button>
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="Enter nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <button onClick={handleAddPokemon}>Add to My Pokémon List</button>
                </div>
            )}
        </div>
    );
};

export default PokemonDetail;
