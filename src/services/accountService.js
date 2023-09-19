

export const SetupAccount =  (token, address, mobile, dob) => {
    const apiEndpoint = process.env.REACT_APP_PROFILE_API_ENDPOINT + '/v2/profiles'

    let req = JSON.stringify({
                'address': address,
                'mobile': mobile,
                'dob': dob
            })

    return new Promise((resolve, reject) => {
        fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: req
        })
        .then((res) => {
            resolve(res.json())
        })
        .catch((error) => reject(error))
    })
}

export const GetProfileByOID = (token) => {
    const apiEndpoint = process.env.REACT_APP_PROFILE_API_ENDPOINT + '/v2/profiles/me'

    return new Promise((resolve, reject) => {
        fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then((res) => {
            resolve(res.json())
        })
        .catch((error) => reject(error))
    })
}

export const GetSummaryProfileByOID = (token) => {
    const apiEndpoint = process.env.REACT_APP_PROFILE_API_ENDPOINT + process.env.REACT_APP_SUMMARY_PROFILE_PATH

    return new Promise((resolve, reject) => {
        fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then((res) => {
            resolve(res.json())
        })
        .catch((error) => reject(error))
    })
}