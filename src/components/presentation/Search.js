import React, { useEffect, useState } from 'react';

export default function Search(props) {
    const [searchQuery, setSearchQuery] = useState("");
    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    }
    const handleSubmit = async event => {
        event.preventDefault();
        const endpoint = `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`;

        try {
            const response = await fetch(endpoint, {
                method: 'GET', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.accessToken
                }
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                props.setResults(jsonResponse.tracks.items);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    value={searchQuery}
                    name='searchQuery'
                    placeholder='Enter a song title'
                    type='text'
                    onChange={handleChange} />
                <br />
                <input type="submit" value="Search" />

            </form>
        </>
    );
}