import React, { useEffect, useState } from 'react';
import Connect from './connect';

export default function Search(props) {
    const [searchQuery, setSearchQuery] = useState("");
    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    }
    // console.log("Access token:", props.authorizationCode);

    const handleSubmit = async event => {
        event.preventDefault();
        const token = await Connect.getToken(props.authorizationCode);
        props.setToken(token);
        console.log(token);

        const endpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track`;

        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token // Sử dụng token từ callback
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