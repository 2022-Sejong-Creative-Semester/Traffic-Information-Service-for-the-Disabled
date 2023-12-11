import React from "react";
import { wrapPromise } from "../promise/warmPromise.ts";

import { api } from "../component/auth/Api.ts";

const getBusDetail = (stCd:any,stNm:any) =>{
    const getDetail = async () => {
        const asyncDetail = await api.get(`/subway/stationInfo/${stCd}/${stNm}`)
            .then(res => {
                const { data } = res;
                const { stationinfo } = data;
                return stationinfo
            })
        return asyncDetail;
    }
    return {
        subway:wrapPromise(getDetail())
    }
}

export default getBusDetail