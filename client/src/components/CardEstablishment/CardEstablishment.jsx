import React, {useEffect, useState} from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import logo from "../../assets/img/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { getEstablishment } from "../../redux/actions/establishment";
import CardCourt from "../CardCourt.js/CardCourt";


export default function CardEstablishment(){
    const dispatch = useDispatch()
    const establishment = useSelector(state => state.establishment.establishmentDetail)
    
    useEffect(()=>{
        dispatch(getEstablishment(20356467454))
    },[])
    
    return(
        <div>
            <Header/>
            <div >
                <img
                    src={establishment.logoImage?establishment.logoImage:logo}
                    alt="logo_establecimiento"
                    className="w-full flex flex-wrap  p-3 max-w-3xl static"
                /> 
                <h1 className="font-bold text-2xl m-2 ">{establishment.name}</h1>              
                {
                    establishment.sites.map(site =>  site.courts.map(el => {
                        return(
                            <div>
                                <CardCourt 
                                    key={el.id}
                                    id={el.id} 
                                    name={el.name}
                                    images={el.image} 
                                    siteName={site.name}
                                    city={site.city}
                                    street={site.street}
                                    streetNumber={site.streetNumber}
                                    description={el.description}
                                    timeActiveFrom={establishment.timeActiveFrom}
                                    timeActiveTo={establishment.timeActiveTo} 
                                    price={el.price}
                                    sport={el.sport}
                                />
                            </div>
                        )
                    })
                    )}
            </div>
            <Footer/>
        </div>
    )
}