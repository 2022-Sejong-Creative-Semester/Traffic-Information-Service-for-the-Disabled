export interface PathList {
    fid: string,
    fname: string,
    fx: string,
    fy: string,
    routeId: string,
    routeNm: string,
    tid: string,
    tname: string,
    tx: string,
    ty: string,
}

export interface NavigationInfo {
    distance: number,
    pathList: Array<PathList>,
    time: number
}