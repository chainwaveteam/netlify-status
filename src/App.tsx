import './App.css';

import React from 'react';

import useNetlify, { NetlifyDataSuccess } from './useNetlify'
import { NetlifyUser } from './interfaces'
import Card from './Card'

const API_KEY = process.env.REACT_APP_NETLIFY_ACCESS_TOKEN

const AppHeader = ({ full_name, site_count, slug }: NetlifyUser) => (
  <header className="App-header">
    <h1>
      {`Bonjour ${full_name} 👋`}
    </h1>
    <p>
      {`Tu as `}
      <strong>{site_count}</strong>
      {` sites sur `}
      <a href={`https://app.netlify.com/teams/${slug}/sites`}>
        Netlify.com
      </a>
    </p>
  </header>
)

const AppContent = () => {
  const { status, ...data } = useNetlify(API_KEY)
  switch (status) {
    case "idle":
      return <div className="App-loader" />

    case "success":
      const { sites, user } = data as NetlifyDataSuccess
      return (
        <>
          <AppHeader {...user} />

          <div className="App-grid">
            {sites.map(site => <Card key={site.id} {...site} />)}
          </div>
        </>
      )
  
    default:
      return <p>Oups, il y a eu un problème...</p>
  }
}

const App = () => (
  <div className="App">
    <AppContent />
  </div>
) 

export default App
