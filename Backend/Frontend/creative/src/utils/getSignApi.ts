import { wrapPromise } from "../promise/warmPromise.ts";

import { api } from "../component/auth/Api.ts";


export const getSignBusNSub = (sTmY: any, sTmX: any, eTmY: any, eTmX: any) => {
    const getBusNSub = async () => {
        try {
            const res = await api.get(`/navigation/${sTmY}/${sTmX}/${eTmY}/${eTmX}/busNsub`);
            const { data } = res;
            return { signArr: [data] };
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    return {
        signBS:wrapPromise(getBusNSub())
    }
}