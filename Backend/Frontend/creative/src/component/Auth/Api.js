import axios from "axios"

export const api = axios.create({
    baseURL: "http://34.132.35.80:3005/"
})

