import axios from "axios"

export const api = axios.create({
    baseURL: "http://34.168.80.42:3005"
})

