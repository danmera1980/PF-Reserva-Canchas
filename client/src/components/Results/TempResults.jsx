import React from 'react'
import Map from '../Map/Map'

const markers = {
  features: [
  {
    type: "Feature",
    properties: {
      establishment: "Dan",
      site: "Mera",
      court: 'Court 1',
      address: 'street 1',
      sport: 'Futbol 11',
      price: '100'
    },
    geometry: {
      coordinates:[-68.845840, -32.889458], //longitude, latitude
      type: "Point"
    }
  }
]}

export default function TempResults() {
  return (
    <div className=''>
      <Map 
        location= {[-68.845840, -32.889458]}
        markers={markers}
      />
    </div>
  )
}
