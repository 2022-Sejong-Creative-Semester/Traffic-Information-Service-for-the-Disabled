import { wrapPromise } from "../promise/warmPromise.ts";

import { api } from "../component/auth/Api.ts";


export const getSignBusNSub = (sTmY: any, sTmX: any, eTmY: any, eTmX: any) => {
    const getBusNSub = async () => {
        try {
            const res = await api.get(`/navigation/${sTmY}/${sTmX}/${eTmY}/${eTmX}/busNsub`);
            const { data } = res;
            return { signArr: [data] };
        } catch (error) {
            alert("잘못된 위치 입니다!")
            window.location.href = "/#/sign"
            console.log(error);
        }
    };
    return {
        signBS:wrapPromise(getBusNSub())
    }
}