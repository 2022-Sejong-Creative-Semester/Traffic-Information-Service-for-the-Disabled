import axios from "axios"

export const api = axios.create({
    baseURL: "http://34.168.52.103:3005/"
})

