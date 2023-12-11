import { wrapPromise } from "../promise/warmPromise.ts";

import { api } from "../component/auth/Api.ts";

export const getSubwayDetail = (stCd:any,stNm:any) =>{
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
        detail:wrapPromise(getDetail())
    }
}

export const getBathChair = (stCd: any, stNm: any, railCd: any, lnCd: any) => {
    const getBathChairDetail = async () => {
        const asyncBathChair = await api.get(`/subway/convenience/${stCd}/${stNm}/${railCd}/${lnCd}`)
            .then(res => {
                const { data } = res;
                return data;
            });
        return asyncBathChair;
    };

    return {
        ele: wrapPromise(getBathChairDetail())
    };
};


export const getBathChairConvinence = (stCd: any, stNm: any, railCd: any, lnCd: any) => {
    const getliftMoveData = async () => {
        const liftMoveData = await api.get(`/subway/liftMove/${stCd}/${stNm}/${railCd}/${lnCd}`)
            .then(res => res.data);
        return liftMoveData
    };

    return {
        liftMove: wrapPromise(getliftMoveData())
    };
};
