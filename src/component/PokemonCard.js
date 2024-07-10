import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon }) => {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(pokemon.url);
                setDetails(response.data);
            } catch (error) {
                console.error('Error fetching the details', error);
            }
        };

        fetchDetails();
    }, [pokemon.url]);

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <div className="pokemon-card">
            <Link to={`/pokemon/${details.name}`}>
                <h2>{details.name}</h2>
                <img src={details.sprites.front_default} alt={details.name} />
            </Link>
        </div>
    );
};

export default PokemonCard;
