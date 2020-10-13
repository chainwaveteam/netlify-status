import React from 'react'
import Card from './Card'
import { NetlifySite } from './interfaces'

interface PropTypes {
  sites: NetlifySite[]
}

const Grid = ({ sites }: PropTypes) => {
  // Sort alphabetically
  const sortedSites = sites.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="App-grid">
      {sortedSites.map(site => <Card key={site.id} {...site} />)}
    </div>
  )
}

export default Grid
