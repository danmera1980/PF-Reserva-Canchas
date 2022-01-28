/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { getCountryById, getActivitiesByCountryID } from "../../redux/actions";
import './user.scss';

function User(props){
    
    return(
        <div>
            User
        </div>
    )
};

export default User;