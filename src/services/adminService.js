export const ListProfiles = (token) => {
    const apiEndpoint = process.env.REACT_APP_ADMIN_API_ENDPOINT + "/v2/profiles";

    return new Promise((resolve, reject) => {
        fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then((res) => {
            resolve(res.json())
        })
        .catch((error) => reject(error))
    })
}