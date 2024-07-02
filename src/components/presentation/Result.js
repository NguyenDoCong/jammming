import React from "react";
import styles from 'components/presentation/css/Result.module.css';

export default function Result(props) {
    const handleClick = (track) => {
        props.setPlaylist(prev => [...prev, track]);
        // console.log(track.id);
    }

    return (
        <div>
            <h1>Results</h1>
            {props.results.map((track) => (
                <div>
                    <div key={track.id} className={styles.track}>
                        <div className={styles.alignLeft}>
                            <h1>{track.name}</h1>
                            <p>{track.artists.map(artist => artist.name).join(' - ')}</p>
                            <p>{track.items}</p>
                        </div>
                        <span className={styles.gap}></span>
                        <button onClick={()=>handleClick(track)}>+</button>
                    </div>
                    <hr />
                </div>

            ))}

        </div>
    )
}