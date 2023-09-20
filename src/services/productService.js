export const GetProductsWithStock = (token, id) => {
    const apiEndpoint = process.env.REACT_APP_PRODUCT_API_ENDPOINT + "/v1/products/" + id;

    return new Promise((resolve, reject) => {
        fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Access-Control-Allow-Origin': '*',
                'Accept-Encoding': 'gzip, deflate',
            }
        })
        .then((res) => {
            resolve(res.json())
        })
        .catch((error) => reject(error))
    })
}