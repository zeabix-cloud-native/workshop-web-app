import { Box, CircularProgress, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { ProductCardWithStock } from "../components/ProductCardWithStock"
import { useMsal } from "@azure/msal-react"

import { loginRequest } from "../authConfig"
import { GetProductsWithStock } from "../services/productService"


import {
    InteractionRequiredAuthError,
    InteractionStatus,
} from "@azure/msal-browser";


export const ProductWithStockPage = (props) => {

    const { instance, inProgress, accounts } = useMsal();
    const [products, setProducts] = useState();


    useEffect(() => {
        if (!products && inProgress === InteractionStatus.None){
            instance.acquireTokenSilent(loginRequest)
            .then((accessTokenResponse) => {
                let accessToken = accessTokenResponse.accessToken;
                GetProductsWithStock(accessToken, props.id).then((p) => setProducts(p)).catch((error) => console.log(error))
            })
            .catch((error) => {
                if (error instanceof InteractionRequiredAuthError) {
                  instance
                    .acquireTokenPopup(loginRequest)
                    .then(function (accessTokenResponse) {
                      // Acquire token interactive success
                      let accessToken = accessTokenResponse.accessToken;
                      GetProductsWithStock(accessToken, props.id).then((p) => setProducts(p)).catch((error) => console.log(error))
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
        <Box>
             <ProductCardWithStock 
                name={products.name} 
                description={products.description} 
                image={products.image} 
                price={products.price} 
                sku={products.sku} 
                stock={products.stock} />
        </Box>

    )
}