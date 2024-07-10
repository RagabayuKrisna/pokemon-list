import React, { useState } from 'react';
import axios from 'axios';

const MyPokemonList = ({ myPokemons, setMyPokemons }) => {
    const [editingIndex, setEditingIndex] = useState(null);
    const [newNickname, setNewNickname] = useState('');

    const handleRename = async (index) => {
        setEditingIndex(index);
        setNewNickname(myPokemons[index].nickname);
    };

    const handleSave = async (index) => {
        try {
            const response = await axios.post('http://localhost:3000/rename', {
                name: newNickname,
            });
            const updatedPokemons = [...myPokemons];
            updatedPokemons[index].nickname = response.data.newName;
            setMyPokemons(updatedPokemons);
            setEditingIndex(null);
            setNewNickname('');
        } catch (error) {
            console.error('Error renaming the Pokémon', error);
        }
    };

    const handleRelease = async (index) => {
        try {
            const response = await axios.get('http://localhost:3000/release');
            if (response.data.success) {
                const updatedPokemons = myPokemons.filter((_, i) => i !== index);
                setMyPokemons(updatedPokemons);
            } else {
                alert(`Failed to release the Pokémon. Number returned: ${response.data.number}`);
            }
        } catch (error) {
            console.error('Error releasing the Pokémon', error);
        }
    };

    return (
        <div className="my-pokemon-list">
            <h2>My Pokémon List</h2>
            {myPokemons.length === 0 ? (
                <p>No Pokémon caught yet!</p>
            ) : (
                <ul>
                    {myPokemons.map((pokemon, index) => (
                        <li key={index}>
                            {editingIndex === index ? (
                                <div>
                                    <input
                                        type="text"
                                        value={newNickname}
                                        onChange={(e) => setNewNickname(e.target.value)}
                                    />
                                    <button onClick={() => handleSave(index)}>Save</button>
                                    <button onClick={() => setEditingIndex(null)}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    {pokemon.nickname} ({pokemon.name})
                                    <button onClick={() => handleRename(index)}>Rename</button>
                                    <button onClick={() => handleRelease(index)}>Release</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyPokemonList;
