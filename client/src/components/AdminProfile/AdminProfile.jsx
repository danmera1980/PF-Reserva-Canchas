import { React, useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import { SERVER_URL } from "../../redux/actions/actionNames";
import UsersTable from "./UsersTable";
import { useSelector } from "react-redux";

function AdminProfile() {
const [users, setUsers] = useState(null);
const [visual, setVisual] = useState("");
const userToken = useSelector((state) => state.register.userToken);

const onButtonSelection = (option) => {
    setVisual(option);
    };

    useEffect(()=>{
        const headers = {
            Authorization: `Bearer ${userToken}`,
          };
       axios.get(`${SERVER_URL}/users` , { headers: headers })
       .then((res)=> {
           setUsers(res.data)
       })
        }, [userToken])     
    
      return (
        <div>
            <Header/>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[4.5rem]"
                    onClick={() => onButtonSelection("users")}
                    >
                    Ver usuarios
                </button>
                    <div>
                    {(() => {
                        switch (visual) {
                        case "users":
                        return <UsersTable users={users}/>
                        default:
                        return <h1>Shordana</h1>    
                         }
                         
                            })()}
                    </div>
            <Footer/>
        </div>
    )
}

export default AdminProfile;