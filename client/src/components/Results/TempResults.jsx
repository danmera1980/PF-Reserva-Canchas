import React from 'react'
import Map from '../Map/Map'

const markers = {
  features: [
  {
    type: "Feature",
    properties: {
      title: "Dan",
      description: "Mera"
    },
    geometry: {
      coordinates:[-68.845840, -32.889458], //longitude, latitude
      type: "Point"
    }
  }
]}

export default function TempResults() {
  return (
    <div>
      <Map 
        location= {[-68.845840, -32.889458]}
        markers={markers}
      />
    </div>
  )
}
