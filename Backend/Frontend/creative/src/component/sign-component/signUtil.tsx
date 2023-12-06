import React from "react"
import { api } from "../auth/Api.ts"

interface coordinate {
    tmX:number,
    tmY:number
}


export const submitStartAndEnd = (start:coordinate,end:coordinate) =>{
    window.location.href = `/#/sign/detail/${start.tmY}/${start.tmX}/${end.tmY}/${end.tmX}`
}