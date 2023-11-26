export interface BusPathList {
    fid: string,
    fname: string,
    fx: string,
    fy: string,
    routeId?: string,
    routeNm: string,
    tid: string,
    tname: string,
    tx: string,
    ty: string,
}

export interface SubwayPathList {
    routeNm: string,        //호선
    fid: string,
    fname: string,
    fx: string,
    fy: string,
    tid: string,
    tname: string,
    tx: string,
    ty: string,
    railLinkList?: Array<string>,
}

export interface NavigationList {
    distance: string,
    pathList: Array<BusPathList>|Array<SubwayPathList>,
    timeList: Array<number>,
    totalTime: string,
    walkTime: number
}