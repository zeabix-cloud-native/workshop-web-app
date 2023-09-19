import { CircularProgress, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { ProductCard } from "../components/ProductCard"
import { useMsal } from "@azure/msal-react"

import { loginRequest } from "../authConfig"
import { GetProducts } from "../services/profileService"


import {
    InteractionRequiredAuthError,
    InteractionStatus,
} from "@azure/msal-browser";


export const ProductPage = () => {

    const { instance, inProgress, accounts } = useMsal();
    const [products, setProducts] = useState();


    useEffect(() => {
        if (!products && inProgress === InteractionStatus.None){
            instance.acquireTokenSilent(loginRequest)
            .then((accessTokenResponse) => {
                let accessToken = accessTokenResponse.accessToken;
                GetProducts(accessToken).then((p) => setProducts(p)).catch((error) => console.log(error))
            })
            .catch((error) => {
                if (error instanceof InteractionRequiredAuthError) {
                  instance
                    .acquireTokenPopup(loginRequest)
                    .then(function (accessTokenResponse) {
                      // Acquire token interactive success
                      let accessToken = accessTokenResponse.accessToken;
                      GetProducts(accessToken).then((p) => setProducts(p)).catch((error) => console.log(error))
                    })
                    .catch(function (error) {
                      // Acquire token interactive failure
                      console.log(error);
                    });
                }
                console.log(error);
              });
          }
    },[instance, accounts, inProgress, products])

    if (!products){
        return (
            <CircularProgress />
        )
    }

    

    return (
        <>
            <Grid container spacing={2}>
                {products.map((p, i) => {
                    return (
                    <Grid item xs={4}>
                        <ProductCard name={p.name} description={p.description} image={p.image} price={p.price} sku={p.sku} />
                    </Grid>
                    )
                })}
            </Grid>
        </>
    )
}