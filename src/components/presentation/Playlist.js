import React, { useState } from "react";
import styles from 'components/presentation/css/Result.module.css';
import Connect from "./connect";

export default function Playlist(props) {
    const [playlistName, setPlaylistName] = useState('');

    const createPlaylist = async () => {
        // console.log(props.accessToken);

        Connect.getToken(async token => {
            console.log("Access token:", token);
            props.setToken(token);

            try {
                fetch('https://api.spotify.com/v1/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + props.accessToken
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Network response was not ok.');
                    })
                    .then(data => {
                        const userId = data.id; // Lấy ID của người dùng từ dữ liệu trả về
                        console.log('User ID:', userId);
                        // Tiếp tục thực hiện các yêu cầu API khác sau khi có thông tin người dùng
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });

                const createPlaylistEndpoint = 'https://api.spotify.com/v1/users/377e58f4414d457691d4bef860522a93/playlists';
                const playlistData = {
                    name: 'My New Playlist',
                    description: 'This is my awesome playlist!'
                };

                fetch(createPlaylistEndpoint, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + props.accessToken,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(playlistData)
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Network response was not ok.');
                    })
                    .then(data => {
                        const playlistId = data.id; // Lấy ID của playlist mới từ dữ liệu trả về
                        console.log('Playlist ID:', playlistId);
                        // Tiếp tục thực hiện các yêu cầu API khác sau khi tạo playlist
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });

            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    return (
        <div>
            <h2>New Playlist</h2>
            {props.playlist.map((track) => (
                <div>
                    <div key={track.id} className={styles.track}>
                        <div className={styles.alignLeft}>
                            <h1>{track.name}</h1>
                            <p>{track.artists.map(artist => artist.name).join(' - ')}</p>
                        </div>
                    </div>
                    <hr />
                </div>

            ))}
            <button onClick={createPlaylist}>Save to Spotify</button>
        </div>
    )
}