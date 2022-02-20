import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getfavs } from "../../redux/actions/users";
import Card from "../Card/Card";
import ReactLoading from "react-loading";


function Favorites(){
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.users.userFav)
    const userToken = useSelector((state) => state.register.userToken);

    useEffect(() => {
        dispatch(getfavs(userToken))
      }, [dispatch]);
    return(
        <div>
            {favorites.map((e) => {
                  return (
                    <div key={e.id} className="overflow-hidden pb-4">
                        {
                            favorites === null ? (
                                <ReactLoading
                                  type={"spin"}
                                  color={"#000000"}
                                  height={"8.5rem"}
                                  width={"8.5rem"}
                                />
                              ) : (
                                <Card
                                    name={e.name}
                                    establishment={e.site.establishment.name}
                                    images={e.image[0]}
                                    site={e.site.name}
                                    address={e.site.street}
                                    price={e.price}
                                    sport={e.sport}
                                    courtId={e.id}
                                />
                              )
                        }
                    </div>
                  );
                })}
        </div>
    )

}
export default Favorites;