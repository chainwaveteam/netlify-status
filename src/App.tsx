import './App.css';

import React from 'react';

import useNetlify from './useNetlify'

const API_KEY = process.env.REACT_APP_NETLIFY_ACCESS_TOKEN

function App() {
  const { user, sites, status } = useNetlify(API_KEY)

  return (
    <div className="App">

      {status === 'error' && (
        <p>
          Oups, il y a eu un problème...
        </p>
      )}

      {status === 'idle' && (
        <div className="App-loader" />
      )}

      {status === 'success' && (
        <>
          <h1>
            {`Bonjour ${user?.full_name || 'unknown'} 👋`}
          </h1>
          <p>
            {`Tu as ${user?.site_count || 0} sites sur Netlify.com`}
          </p>
          <ul className="App-list">
            {sites ? sites.map(site => (
              <li key={site.id}>
                <a 
                  href={site.url}
                  className="App-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${site.name}`}
                </a>
              </li>
            )) : (
              <p>
                Aucun résultat
              </p>
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
