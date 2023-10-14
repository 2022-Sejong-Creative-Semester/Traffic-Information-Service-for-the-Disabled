export interface BusStationInfo {
    arsId: string,
    stId: string,
    stNm: string,
    tmX: string,
    tmY: string
}

export interface BusStationList {
    type: string,
    name: string,
    elements?: Array<any>
}

export interface BusInfo {
    busrouteid: string,
    busrouteAbrv: string,
    bustype: string,
    adirection: string,
    nxtStn: string,
    arrmsg1: string,
    min: string,
    sec: string
}