/*export interface BusPathList {
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
}*/

export interface NavigationInfo {
    trafficDistance: number,
    totalWalk: number,
    totalTime: number,
    payment: number,
    busTransitCount: number,
    subwayTransitCount: number,
    mapObj: string,
    firstStartStation: string,
    lastEndStation: string,
    totalStationCount: number,
    busStationCount	:number,
    subwayStationCount: number,
    totalDistance: number,
    totalWalkTime: number,
    checkIntervalTime: number,
    checkIntervalTimeOverYn: number
}

interface NavigationLane {
    name?: string,
    busNo?: string,
    type?: number,
    busID?: number,
    busLocalBlID?: number,
    busCityCode?: number,
    busProviderCode?: number,
    subwayCode?: number,
    subwayCityCode?: number
}

interface StationList{
    index: number,
    stationID: number,
    stationName: string,
    stationCityCode?: number,
    stationProviderCode?: number,
    localStationID?: string,
    arsID?: string,
    x: string,
    y: string,
    isNonStop?: string
}

interface NavigationPassStopList{
    stations: Array<StationList>,
}

interface NavigationSubPath {
    trafficType: number,
    distance: number,
    sectionTime: number,
    stationCount?: number,
    lane?: Array<NavigationLane>
    startName: string,
    startX: number,
    startY: number,
    endName: string,
    endX: number,
    endY: number,
    way?: string,
    wayCode?: number,
    door?: string,
    startID: number,
    startStationCityCode?: number,
    startStationProviderCode?: number,
    startLocalStationID?: string,
    startArsID?: string,
    endID: number,
    endStationCityCode?: number,
    endStationProviderCode?: number,
    endLocalStationID?: string,
    endArsID?: string,
    startExitNo?: string,
    startExitX?: number,
    startExitY?: number,
    endExitNo?: number,
    endExitX?: number,
    endExitY?: number,
    passStopList: NavigationPassStopList
}

export interface NavigationPath {
    pathType: number,
    pathClass?: string,
    info: NavigationInfo,
    subPath: Array<NavigationSubPath>
}

export interface NavigationResult {
    searchType: number,
    outTrafficCheck: number,
    busCount: number,
    subwayCount: number,
    subwayBusCount: number,
    pointDistance: number,
    startRadius: number,
    endRadius: number,
    path: Array<NavigationPath>
}

export interface RecommendPathList {
    test: string
}