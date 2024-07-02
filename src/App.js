import React, { useEffect, useState } from 'react';
import './App.css';
import Search from './components/presentation/Search';
import Result from 'components/presentation/Result';
import Playlist from 'components/presentation/Playlist';
import queryString from 'query-string';


function App() {
  // const [accessToken, setAccessToken] = useState(null);
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  const client_id = '377e58f4414d457691d4bef860522a93';
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "code"

  const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

  function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  const [token, setToken] = useState("")
  const state = generateRandomString(16);

  const authUrl = `${AUTH_ENDPOINT}?client_id=${client_id}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&state=${state}&scope=${scope}`;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const authorizationCode = urlParams.get('code');

  // console.log(authorizationCode);

  return (
    <div className="App">
      <a href={authUrl}>Login to Spotify</a>
      <header className="App-header">
        <h1>Jammming</h1>
      </header>
      <main>
        <section className='Search'>
          <Search accessToken={token} setToken={setToken} setResults={setResults} authorizationCode={authorizationCode}/>
        </section>
        <section className='main'>
          <Result results={results} setPlaylist={setPlaylist} />
          <Playlist playlist={playlist} accessToken={token} setToken={setToken} />
        </section>
      </main>
    </div>
  );
}

export default App;
