import express, {Request, Response, Router} from 'express'
import request from 'request'
import convert from 'xml-js'
import serviceKey from '../KEY/serviceKey.json'
import { NavigationResult, NavigationPath, RecommendPathList } from '../../interfaces/Navigation/navigation.interface'
import * as db from '../db'

const router:Router = express.Router();

const velocity:number = 46.8;

function deg2rad(deg:number){
  return (deg * Math.PI / 180);
}

function rad2deg(rad:number){
  return (rad * 180 / Math.PI);
}

function distance (lat1:number, lon1:number, lat2:number, lon2:number){
  if(lat1===lat2 && lon1==lon2){
    return 0;
  }
  else{
    let theta:number = lon1-lon2;
    let dist:number = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
    dist = Math.acos(dist);
    dist = rad2deg(dist);
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;

    //dist를 지름으로 한 원 내부의 직각삼각형 두 변의 길이
    return dist*Math.sqrt(2);
  }
}

/*

router.get('/bybus/:startX/:startY/:endX/:endY', async(req:Request, res:Response)=>{
    try{

      const startX: string = req.params.startX;
      const startY: string = req.params.startY;
      const endX: string = req.params.endX;
      const endY: string = req.params.endY;

      const url:string = "http://ws.bus.go.kr/api/rest/pathinfo/getPathInfoByBus";
      let queryParams:string = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey.serviceKey;
      queryParams += '&' + encodeURIComponent('startX') + '=' + startX;
      queryParams += '&' + encodeURIComponent('startY') + '=' + startY;
      queryParams += '&' + encodeURIComponent('endX') + '=' + endX;
      queryParams += '&' + encodeURIComponent('endY') + '=' + endY;

      request({
        url: url + queryParams,
        method: 'GET'
      }, async function (error:Error, response:any, body:string) {

        const parseJSON:string = convert.xml2json(body);

        const navigationList:any = JSON.parse(parseJSON).elements[0].elements[2].elements;

        const navigationInfo:Array<NavigationList> = [];
        console.log(parseJSON);
        navigationList.forEach((info:any) => {
          const tempInfo:NavigationList = {
            distance: "",   //총 이동 거리
            pathList: [],   //이동 경로
            timeList: [],   //이동 시간
            totalTime: "",  // 총 이동 시간
            walkTime: 0,    //총 도보 이동 시간
          };
          tempInfo.distance = info.elements[0].elements[0].text;
          tempInfo.totalTime = info.elements[2].elements[0].text;

          //첫 출발지랑 정류장/역 사이 거리
          let x1:number = Number(startX);
          let y1:number = Number(startY);
          let x2:number = Number(info.elements[1].elements[2].elements[0].text);
          let y2:number = Number(info.elements[1].elements[3].elements[0].text);
          let dist:number = distance(x1,y1,x2,y2);

          tempInfo.timeList.push(Math.floor(dist/velocity));
          tempInfo.walkTime += Math.floor(dist/velocity);

          for(let i:number=0;i<info.elements[1].elements.length/10;i++){
            
            tempInfo.pathList.push({
              fid: info.elements[1].elements[i%10].elements[0].text,
              fname: info.elements[1].elements[i%10+1].elements[0].text,
              fx: info.elements[1].elements[i%10+2].elements[0].text,
              fy: info.elements[1].elements[i%10+3].elements[0].text,
              routeId: info.elements[1].elements[i%10+4].elements[0].text,
              routeNm: info.elements[1].elements[i%10+5].elements[0].text,
              tid : info.elements[1].elements[i%10+6].elements[0].text,
              tname: info.elements[1].elements[i%10+7].elements[0].text,
              tx: info.elements[1].elements[i%10+8].elements[0].text,
              ty: info.elements[1].elements[i%10+9].elements[0].text,
            })

            //마지막 정류장/역과 목적지 사이 도보 이동거리
            x1 = Number(info.elements[1].elements[i%10+2].elements[0].text);
            y1 = Number(info.elements[1].elements[i%10+3].elements[0].text);
            x2 = Number(info.elements[1].elements[i%10+8].elements[0].text);
            y2 = Number(info.elements[1].elements[i%10+9].elements[0].text);

            dist = distance(x1,y1,x2,y2);

            tempInfo.timeList.push(Math.floor(dist/velocity));
            tempInfo.walkTime += Math.floor(dist/velocity);

          }

          //마지막 정류장/역과 목적지 사이 도보 이동거리
          x1 = Number(endX);
          y1 = Number(endY);
          x2 = Number(info.elements[1].elements[info.elements[1].elements.length-2].elements[0].text);
          y2 = Number(info.elements[1].elements[info.elements[1].elements.length-1].elements[0].text);

          dist = distance(x1,y1,x2,y2);

          tempInfo.timeList.push(Math.floor(dist/velocity));
          tempInfo.walkTime += Math.floor(dist/velocity);

          navigationInfo.push(tempInfo);
        });

        
        //정렬 기준 (1. 환승 경로 개수 / 2. 이동 시간)
        navigationInfo.sort((a:NavigationList,b:NavigationList)=>{
          
          if( a.pathList.length === b.pathList.length){
            return a.walkTime - b.walkTime;
          }
          
          return a.pathList.length - b.pathList.length
        })
        
        return res.status(200).json({
          navigationInfo: navigationInfo
        })

      });
    }
    catch(e){
      console.error(e);
      return res.status(500).json({
        error: e,
        errorString: e.toString(),
      });
  }
})

router.get('/bysubway/:startX/:startY/:endX/:endY', async(req:Request,res:Response)=>{
  try{

    //지하철 환승 이동 시간 필요
    const startX: string = req.params.startX;
    const startY: string = req.params.startY;
    const endX: string = req.params.endX;
    const endY: string = req.params.endY;

    const url:string = "http://ws.bus.go.kr/api/rest/pathinfo/getPathInfoBySubway";
    let queryParams:string = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey.serviceKey;
    queryParams += '&' + encodeURIComponent('startX') + '=' + startX;
    queryParams += '&' + encodeURIComponent('startY') + '=' + startY;
    queryParams += '&' + encodeURIComponent('endX') + '=' + endX;
    queryParams += '&' + encodeURIComponent('endY') + '=' + endY;

    request({
      url: url + queryParams,
      method: 'GET'
    }, async function (error:Error, response:any, body:string) {

      const parseJSON:string = convert.xml2json(body);

      console.log(parseJSON);
      
      const navigationList:any = JSON.parse(parseJSON).elements[0].elements[2].elements;

      const navigationInfo:Array<NavigationList> = [];
      navigationList.forEach((info:any) => {
        const tempInfo:NavigationList = {
          distance: "",   //총 이동 거리
          pathList: [],   //이동 경로
          timeList: [],   //이동 시간
          totalTime: "",  // 총 이동 시간
          walkTime: 0,    //총 도보 이동 시간
        };
        tempInfo.distance = info.elements[0].elements[0].text;
        tempInfo.totalTime = info.elements[2].elements[0].text;

        //첫 출발지랑 정류장/역 사이 거리
        let x1:number = Number(startX);
        let y1:number = Number(startY);
        let x2:number = Number(info.elements[1].elements[2].elements[0].text);
        let y2:number = Number(info.elements[1].elements[3].elements[0].text);
        let dist:number = distance(x1,y1,x2,y2);

        tempInfo.timeList.push(Math.floor(dist/velocity));
        tempInfo.walkTime += Math.floor(dist/velocity);

        for(let i:number=0;i<info.elements[1].elements.length/10;i++){
          
          const railLinkList:Array<string> = [];

          for(let j:number = 0;j<info.elements[1].elements[i%10+4].elements[0].elements.length;j++){
            railLinkList.push(info.elements[1].elements[i%10+4].elements[0].elements[j].text);
          }

          tempInfo.pathList.push({
            fid: info.elements[1].elements[i%10].elements[0].text,
            fname: info.elements[1].elements[i%10+1].elements[0].text,
            fx: info.elements[1].elements[i%10+2].elements[0].text,
            fy: info.elements[1].elements[i%10+3].elements[0].text,
            railLinkList: railLinkList,
            routeNm: info.elements[1].elements[i%10+5].elements[0].text,
            tid : info.elements[1].elements[i%10+6].elements[0].text,
            tname: info.elements[1].elements[i%10+7].elements[0].text,
            tx: info.elements[1].elements[i%10+8].elements[0].text,
            ty: info.elements[1].elements[i%10+9].elements[0].text
          })

          //마지막 정류장/역과 목적지 사이 도보 이동거리
          x1 = Number(info.elements[1].elements[i%10+2].elements[0].text);
          y1 = Number(info.elements[1].elements[i%10+3].elements[0].text);
          x2 = Number(info.elements[1].elements[i%10+8].elements[0].text);
          y2 = Number(info.elements[1].elements[i%10+9].elements[0].text);

          dist = distance(x1,y1,x2,y2);

          tempInfo.timeList.push(Math.floor(dist/velocity));
          tempInfo.walkTime += Math.floor(dist/velocity);

        }

        //마지막 정류장/역과 목적지 사이 도보 이동거리
        x1 = Number(endX);
        y1 = Number(endY);
        x2 = Number(info.elements[1].elements[info.elements[1].elements.length-2].elements[0].text);
        y2 = Number(info.elements[1].elements[info.elements[1].elements.length-1].elements[0].text);

        dist = distance(x1,y1,x2,y2);

        tempInfo.timeList.push(Math.floor(dist/velocity));
        tempInfo.walkTime += Math.floor(dist/velocity);

        navigationInfo.push(tempInfo);
      });

      
      //정렬 기준 (1. 환승 경로 개수 / 2. 이동 시간)
      navigationInfo.sort((a:NavigationList,b:NavigationList)=>{
        
        if( a.pathList.length === b.pathList.length){
          return a.walkTime - b.walkTime;
        }
        
        return a.pathList.length - b.pathList.length
      })
      
      return res.status(200).json({
        navigationInfo: navigationInfo
      })

    });
  }
  catch(e){
    console.error(e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
})

router.get('/bybusNsubway/:startX/:startY/:endX/:endY', async(req:Request,res:Response)=>{
  //버스 -> 지하철 / 지하철 -> 버스로 이동하는 시간 고려
  try{

    //지하철 환승 이동 시간 필요
    const startX: string = req.params.startX;
    const startY: string = req.params.startY;
    const endX: string = req.params.endX;
    const endY: string = req.params.endY;

    const url:string = "http://ws.bus.go.kr/api/rest/pathinfo/getPathInfoByBusNSub";
    let queryParams:string = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey.serviceKey;
    queryParams += '&' + encodeURIComponent('startX') + '=' + startX;
    queryParams += '&' + encodeURIComponent('startY') + '=' + startY;
    queryParams += '&' + encodeURIComponent('endX') + '=' + endX;
    queryParams += '&' + encodeURIComponent('endY') + '=' + endY;
    queryParams += '&' + encodeURIComponent('resultType=json');

    request({
      url: url + queryParams,
      method: 'GET'
    }, async function (error:Error, response:any, body:string) {

      console.log(body);
      const parseJSON:string = convert.xml2json(body);

      //console.log(parseJSON);

      const navigationList:any = JSON.parse(parseJSON).elements[0].elements[2].elements;

      const navigationInfo:Array<NavigationList> = [];
      navigationList.forEach((info:any) => {
        const tempInfo:NavigationList = {
          distance: "",   //총 이동 거리
          pathList: [],   //이동 경로
          timeList: [],   //이동 시간
          totalTime: "",  // 총 이동 시간
          walkTime: 0,    //총 도보 이동 시간
        };
        tempInfo.distance = info.elements[0].elements[0].text;
        tempInfo.totalTime = info.elements[2].elements[0].text;

        //첫 출발지랑 정류장/역 사이 거리
        let x1:number = Number(startX);
        let y1:number = Number(startY);
        let x2:number = Number(info.elements[1].elements[2].elements[0].text);
        let y2:number = Number(info.elements[1].elements[3].elements[0].text);
        let dist:number = distance(x1,y1,x2,y2);

        tempInfo.timeList.push(Math.floor(dist/velocity));
        tempInfo.walkTime += Math.floor(dist/velocity);

        for(let i:number=0;i<info.elements[1].elements.length/10;i++){
          
          tempInfo.pathList.push({
            fid: info.elements[1].elements[i%10].elements[0].text,
            fname: info.elements[1].elements[i%10+1].elements[0].text,
            fx: info.elements[1].elements[i%10+2].elements[0].text,
            fy: info.elements[1].elements[i%10+3].elements[0].text,
            routeId: info.elements[1].elements[i%10+4].elements[0].text,
            routeNm: info.elements[1].elements[i%10+5].elements[0].text,
            tid : info.elements[1].elements[i%10+6].elements[0].text,
            tname: info.elements[1].elements[i%10+7].elements[0].text,
            tx: info.elements[1].elements[i%10+8].elements[0].text,
            ty: info.elements[1].elements[i%10+9].elements[0].text,
          })

          //마지막 정류장/역과 목적지 사이 도보 이동거리
          x1 = Number(info.elements[1].elements[i%10+2].elements[0].text);
          y1 = Number(info.elements[1].elements[i%10+3].elements[0].text);
          x2 = Number(info.elements[1].elements[i%10+8].elements[0].text);
          y2 = Number(info.elements[1].elements[i%10+9].elements[0].text);

          dist = distance(x1,y1,x2,y2);

          tempInfo.timeList.push(Math.floor(dist/velocity));
          tempInfo.walkTime += Math.floor(dist/velocity);

        }

        //마지막 정류장/역과 목적지 사이 도보 이동거리
        x1 = Number(endX);
        y1 = Number(endY);
        x2 = Number(info.elements[1].elements[info.elements[1].elements.length-2].elements[0].text);
        y2 = Number(info.elements[1].elements[info.elements[1].elements.length-1].elements[0].text);

        dist = distance(x1,y1,x2,y2);

        tempInfo.timeList.push(Math.floor(dist/velocity));
        tempInfo.walkTime += Math.floor(dist/velocity);

        navigationInfo.push(tempInfo);
      });

      
      //정렬 기준 (1. 환승 경로 개수 / 2. 이동 시간)
      navigationInfo.sort((a:NavigationList,b:NavigationList)=>{
        
        if( a.pathList.length === b.pathList.length){
          return a.walkTime - b.walkTime;
        }
        
        return a.pathList.length - b.pathList.length
      })
      
      return res.status(200).json({
        navigationInfo: navigationInfo
      })

    });
  }
  catch(e){
    console.error(e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
})
*/

router.get('/:startX/:startY/:endX/:endY/:type',async(req:Request,res:Response)=>{
  try{
    const startX:number = req.params.startX;
    const startY:number = req.params.startY;
    const endX:number = req.params.endX;
    const endY:number = req.params.endY;
    const pathType:number =  (req.params.type === "subway" ? 1 : (req.params.type === "bus" ? 2 : 0));
    
    const url:string = 'https://api.odsay.com/v1/api/searchPubTransPathT';
    let queryParams:string = '?' + encodeURIComponent('lang') + '=' + encodeURIComponent('0');
    queryParams += '&' + encodeURIComponent('SX') + '=' + startX;
    queryParams += '&' + encodeURIComponent('SY') + '=' + startY;
    queryParams += '&' + encodeURIComponent('EX') + '=' + endX;
    queryParams += '&' + encodeURIComponent('EY') + '=' + endY;
    queryParams += '&' + encodeURIComponent('apiKey') + '=' + encodeURIComponent(serviceKey.OdsayKey);
    queryParams += '&' + encodeURIComponent('SearchPathType') + '=' + pathType;
        
    request({
      url: url + queryParams,
      method: 'GET'
    }, async function (error:Error, response:any, body:string) {

      if(JSON.parse(body).hasOwnProperty("error")){
        console.error(JSON.parse(body).error);
        return res.status(500).json({
          error: JSON.parse(body).error
        })
      }
      
      //JSON parse
      const NavigationList:NavigationResult = JSON.parse(body).result;

      //console.log(error);
      //console.log(response);

      //275 -> 10분
      //10분 ->
      //버스 환승 ->
      //
      //1. 도보 시간, 2. 환승 개수, 3. 총 이동 시간
      NavigationList.path.sort((a:NavigationPath, b:NavigationPath)=>{

        //가중치 계산
        const weight_A:number = a.info.totalWalk/300 * 30 + a.info.totalTime + a.info.busTransitCount*10 + a.info.subwayTransitCount*5;
        const weight_B:number = b.info.totalWalk/300 * 30 + b.info.totalTime + b.info.busTransitCount*10 + b.info.subwayTransitCount*5;

        if(weight_A === weight_B){
          if(a.info.totalWalkTime === b.info.totalWalkTime){
            if(a.info.busTransitCount + a.info.subwayTransitCount === b.info.busTransitCount + b.info.busTransitCount){
              return a.info.totalTime - b.info.totalTime;
            }
            else{
              return a.info.busTransitCount + a.info.subwayTransitCount - b.info.busTransitCount + b.info.busTransitCount;
            }
            
          }
          else{
            return a.info.totalWalkTime - b.info.totalWalkTime;
          }
        }
        else {
          return weight_A - weight_B;
        }
      })

      //상위 5개 경로만 반환
      NavigationList.path = NavigationList.path.slice(0,5);

      NavigationList.path.forEach(async (element) => {
        //일반인 기준 이동시간 저장
        const t = element.info.totalWalkTime;
        //도보 이동 시간 계산
        element.info.totalWalkTime = Math.floor((element.info.totalWalk * Math.sqrt(2) / velocity) + 0.9999999999);
        //추가 시간 포함
        element.info.totalTime += element.info.totalWalkTime - t;

        //info 정리
        delete element.info.trafficDistance;
        delete element.info.totalStationCount;
        delete element.info.busStationCount;
        delete element.info.subwayStationCount;
        delete element.info.totalDistance;
        delete element.info.checkIntervalTime;
        delete element.info.checkIntervalTimeOverYn;

        //subPath 정리
        await element.subPath.forEach(async(element)=>{
          //도보인 경우
          if(element.trafficType === 3){
            //교통약자 평균 이동속도에 맞게 이동시간 조정
            element.sectionTime = Math.floor((element.distance * Math.sqrt(2) / velocity) + 0.9999999999);
          }
          //버스인 경우
          else if(element.trafficType === 2){
            delete element.lane[0].busCityCode;
            delete element.lane[0].busProviderCode;
            delete element.startStationCityCode;
            delete element.startStationProviderCode;
            delete element.startID;
            delete element.endStationCityCode;
            delete element.endStationProviderCode;
            delete element.endID;

            element.passStopList.stations.forEach(element=>{
              delete element.stationID;
              delete element.stationCityCode;
              delete element.stationProviderCode;
              delete element.isNonStop;
            })
          }
          //지하철인 경우
          else if(element.trafficType === 1){
            delete element.lane[0].subwayCityCode;
            if(element.lane[0].name === "수도권 분당선(급행)"){
              element.lane[0].subwayCode = 10;
            }
            else if(element.lane[0].name === "수도권 신분당선"){
              element.lane[0].subwayCode = 11;
            }

            const getSationInfo = (name:string, subwayCode:number) => new Promise((res,rej)=>{
              const SQL:string = "Select * from subcode_1 where STIN_NM LIKE ? and LN_CD = ?;";
              const connection:any = db.return_connection();
              
              connection.query(SQL, ['%' + name + '%',subwayCode],function(err:Error,results:any,fields:any){
                if (err) {
                  console.log(err);
                  return rej(err);
                }
                else{
                  return res({
                    stCd: results[0].STIN_CD,
                    lnCd: results[0].LN_CD,
                    railCd: results[0].RAIL_OPR_ISTT_CD,
                    stNm: results[0].STIN_NM
                  })
                }
              })
            })

            const startInfo:any = await getSationInfo(element.passStopList.stations[0].stationName, element.lane[0].subwayCode);
            const endInfo:any = await getSationInfo(element.passStopList.stations[element.passStopList.stations.length-1].stationName, element.lane[0].subwayCode);

            element.passStopList.stations[0].stNm = startInfo.stNm;
            element.passStopList.stations[0].stCd = startInfo.stCd;
            element.passStopList.stations[0].lnCd = startInfo.lnCd;
            element.passStopList.stations[0].railCd = startInfo.railCd;

            element.passStopList.stations[element.passStopList.stations.length-1].stNm = endInfo.stNm;
            element.passStopList.stations[element.passStopList.stations.length-1].stCd = endInfo.stCd;
            element.passStopList.stations[element.passStopList.stations.length-1].lnCd = endInfo.lnCd;
            element.passStopList.stations[element.passStopList.stations.length-1].railCd = endInfo.railCd;

          }
        })
      });
      
      return setTimeout(() => res.status(200).json(NavigationList.path), 1000);

    });
    
  }
  catch(e){
    console.error(e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
})
export = router;