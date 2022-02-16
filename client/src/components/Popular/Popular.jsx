import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SERVER_URL } from "../../redux/actions/actionNames";
import Card from '../Card/Card';
import './Popular.scss';

const popularTitle = 'Canchas populares cerca de tú ubicación'

export default function Popular({currentLocation}) {
  const [ sitesNear, setSitesNear ] = useState([])

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/findlocation?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}&zoom=${currentLocation.zoom}&sport=${currentLocation.sport}`)
      .then(res => {
        setSitesNear(res.data)
      })
  },[]);

  return (
    <div className='popular dark:bg-darkPrimary text-center sm:text-left'>
        <h2 className='text-2xl font-semibold text-lightSecondary dark:text-darkAccent'>{popularTitle}</h2>
        <p className='text-black dark:text-white'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis earum fugiat nostrum, soluta quis labore recusandae aut dicta maxime ratione sit, quia cupiditate similique. Iure esse alias impedit unde dolorum?</p>
        <div className='my-5 gap-4 overflow-x-auto overflow-y-hidden flex scroll-smooth scroll-auto'>
        {sitesNear.map(m => m.sites.map(site => {
          return(
          <div key={site.id} className='w-64 flex-none'>
            <Card 
              id= {m.cuit}
              name= {site.name}
              images= {site.courts[0].image}
              establishment= {m.name}
              cuit={m.cuit}
              court= {site.courts[0].name}
              courtId={site.courts[0].id}
              address= {site.street}
              price= {site.courts[0].price}
              sport= {site.courts[0].sport}
              button={true}
            />
          </div>
        )}))}
      </div>
    </div>

  );
}
