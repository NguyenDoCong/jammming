import React from "react";
import styles from 'components/presentation/css/Result.module.css';

export default function Playlist(props) {
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
            <button>Save to Spotify</button>
        </div>
    )
}