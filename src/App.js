import React, { useEffect, useState } from 'react';
import './App.css';
import Search from './components/presentation/Search';
import Result from 'components/presentation/Result';
import Playlist from 'components/presentation/Playlist';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const clientId = '377e58f4414d457691d4bef860522a93';
    const clientSecret = 'd16be2785dc24bff8c1159ddf2e34c03';
    const basicAuth = btoa(`${clientId}:${clientSecret}`);

    const tokenEndpoint = 'https://accounts.spotify.com/api/token';

    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    };

    fetch(tokenEndpoint, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Không thể lấy Access Token');
        }
        return response.json();
      })
      .then(data => {
        setAccessToken(data.access_token);
      })
      .catch(error => {
        console.error('Lỗi:', error);
      });
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <h1>Jammming</h1>
      </header>
      <main>
        <section className='Search'>
          <Search accessToken={accessToken} setResults={setResults} />
        </section>
        <section className='main'>
          <Result results={results} setPlaylist={setPlaylist} />
          <Playlist playlist={playlist}/>
        </section>
      </main>
    </div>
  );
}

export default App;
