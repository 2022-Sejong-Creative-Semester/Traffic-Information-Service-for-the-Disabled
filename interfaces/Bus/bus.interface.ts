interface Element {
    type: string,
    name: string,
    elements: {
        type: string,
        text: string
    }
}

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
    elements?: Array<Element>
}

export interface BusInfoList {
    type: string,
    name: string,
    elements: Array<Element>
}

export interface BusItemList {
    type: string,
    name: string,
    elements?: Array<BusInfoList>
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