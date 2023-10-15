export interface SubwayStationNameList {
    railCd: string,
    lnCd: string,
    lnNm?: string,
    stCd: string,
    stNm: string
}

export interface SubwayStationInfo {
    railCd: string,
    lnCd: string
    stCd: string
    stNm: string
    roadNm: string
    tmX: string
    tmY: string,
    wNum: string
    eName: string
    fCode: string
}

export interface SubwayStationInfoRequest {
    lnCd: string,
    lonmAdr?: string,
    mapCordX?: string,
    mapCordY?: string,
    railOprIsttCd: string,
    roadNmAdr: string,
    stinCd: string,
    stinLocLat: string,
    stinLocLon: string,
    stinNm: string,
    stinNmEng?: string,
    stinNmJpn?: string,
    stinNmRom?: string,
    stinNmSimpcina?: string,
    stinNmTradcina?: string,
    strkZone?: string
}

export interface SubwayStationLiftPos {
    bndWgt?: string,
    dtlLoc?: string,
    exitNo?: string,
    grndDvNmFr?: string,
    grndDvNmTo?: string,
    len?: string,
    lnCd?: string,
    railOprIsttCd?: string,
    runStinFlorFr?: string,
    runStinFlorTo?: string,
    stinCd?: string,
    wd?: string
}

export interface SubwayStationLiftMove {
    lnCd: string,
    mvContDtl: string,
    mvDst: string,
    mvPathDvCd: string,
    mvPathDvNm: string,
    mvPathMgNo: number,
    mvTpOrdr: number,
    railOprIsttCd: string,
    stinCd: string,
}

export interface SubwayStationLiftInfo {
    direction: string,
    info?: Array<SubwayStationLiftMove>
}

export interface SubwayStationElevatorPosInfo {
    dtlLoc: string,
    exitNo: string,
    grndDvNmFr: string,
    grndDvNmTo: string,
    lnCd: string,
    railOprIsttCd: string,
    rglnPsno: string,
    rglnWgt: string,
    runStinFlorFr: string,
    runStinFlorTo: string,
    stinCd: string
}

export interface SubwayStationElevatorMove {
    lnCd: string,
    mvContDtl: string,
    mvDst: string,
    mvPathDvCd: string,
    mvPathDvNm: string,
    mvPathMgNo: string,
    mvTpOrdr: number,
    railOprIsttCd: string,
    stinCd: string,
}

export interface SubwayStationElevatorMoveInfo {
    direction: string,
    info?: Array<SubwayStationElevatorMove>
}

export interface SubwayStationTransferStationInfo {
    stCd: string,
	stNm: string,
    railCd: string,
    lnCd: string,
}

export interface SubwayStationTransferInfo {
    sourceStation: Array<SubwayStationTransferStationInfo>,
    transferStation: Array<SubwayStationTransferStationInfo>
}

export interface SubwayStationTransferMoveList {
    chtnMvTpOrdr: string,
    edMovePath: string,
    elvtSttCd: string,
    elvtTpCd: string,
    imgPath: string,
    mvContDtl: string,
    mvPathMgNo: string,
    stMovePath: string
}

export interface SubwayStationConvenience {
    dtlLoc: string,
    grndDvCd: string,
    gubun: string,
    imgPath: string,
    mlFmlDvCd: string,
    stinFlor: string,
    trfcWeakDvCd: string
}

export interface SubwayStationConvenienceInfo {
    /*
    EV: Array<SubwayStationConvenience>,
    WCLF: Array<SubwayStationConvenience>
    */
}