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


export const getTransferDetail = (stCd: any, stNm: any, railCd: any, lnCd: any) => {
    const getTransferDetailData = async () => {
            const subwaytransfer = await api.get(`/subway/transferMove/transferList/${stCd}/${stNm}/${railCd}/${lnCd}`)
            .then(res=>{
                const { data } = res;
                const { sourceStation, transferStation } = data;
                return { sourceStation, transferStation };  
            }).catch (error => {
                alert("환승역이 아닙니다!");
                window.location.href = `/#/subway/detail/${stCd}/${stNm}`;
            })
            return subwaytransfer;
    };

    return {
        transferDetail: wrapPromise(getTransferDetailData())
    };
};


export const getTransferInfo = (stCd: any, stNm: any, railCd: any, lnCd: any, prevStinCd: any, chthTgtLn: any, chtnNextStinCd: any) => {
    const getTransferInfoAPI  = async () => {
        const transferDetail = await api.get(`/subway/transferMove/transferInfo/${stCd}/${stNm}/${railCd}/${lnCd}/${prevStinCd}/${chthTgtLn}/${chtnNextStinCd}`)
            .then(res => res.data)
            .catch(error=>{
                console.log(error)
            })
        return transferDetail
    }

    return {
        transferinfo : wrapPromise(getTransferInfoAPI())
    };
};


export const SubmitSubwayStation = (value:any) => {
    if(typeof value==="undefined") return;
    const getSubmitValueApi = async () => {
         return await api.get(`/subway/stNm/${value}`)
            .then(res => res.data)
            .catch(error => {
                console.log(error)
                alert("해당하는 지하철이 없습니다. ")
            });
    }
    return {
        formData:wrapPromise(getSubmitValueApi())
    }
}