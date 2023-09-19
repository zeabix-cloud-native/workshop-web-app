
import React from 'react';

const GetProfileV1 = async (id, token) => {
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT + "/v1/profiles/" + id
    const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    return response.json();
}

export const GetProfile = (id, token) => {
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT + "/v1/profiles/" + id

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

export const GetProducts = (token) => {
    const apiEndpoint = process.env.REACT_APP_PRODUCT_API_ENDPOINT + "/v1/products"

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