import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../../redux/actions/actionNames";
import Card from "../Card/Card";
import "./Carrousel.scss";

export default function Popular({ currentLocation }) {
  const [sitesNear, setSitesNear] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${SERVER_URL}/findlocation?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}&zoom=${currentLocation.zoom}&sport=${currentLocation.sport}`
      )
      .then((res) => {
        setSitesNear(res.data);
      });
  }, []);

  return (
    <div className="my-5 gap-4 flex carrousel">
      {sitesNear?.map((m) =>
        m.sites.map((site) => {
          return (
            <div key={site.id} className="flex-none">
              <Card
                id={m.cuit}
                name={site.name}
                images={site.courts[0].image}
                establishment={m.name}
                cuit={m.cuit}
                court={site.courts[0].name}
                courtId={site.courts[0].id}
                address={site.street}
                price={site.courts[0].price}
                sport={site.courts[0].sport}
                button={true}
              />
            </div>
          );
        })
      )}
    </div>
  );
}
