import express, {Request, Response, Router} from 'express'
import request from 'request'
import convert from 'xml-js'
import serviceKey from '../KEY/serviceKey.json'
import {NavigationInfo} from '../../interfaces/Navigation/navigation.interface'

const router:Router = express.Router();

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

        const restruct = async () => new Promise((res:any,rej:any)=>{
          
        })

        const navigationInfo:Array<NavigationInfo> = JSON.parse(parseJSON).elements[0].elements[2].elements;

        /*
        //정렬 기준 (1. 환승 경로 개수 / 2. 이동 시간)
        navigationInfo.sort((a:itemList,b:itemList)=>{
          
          if( a.elements.pathList.elements.length === b.elements.pathList.elements.length){
            return parseInt(a.elements.time.elements[0].text) - parseInt(b.elements.time.elements[0].text);
          }
          
          return a.elements.pathList.elements.length - b.elements.pathList.elements.length
        })
        */
        console.log(navigationInfo);

        return res.status(200).json({
          body: navigationInfo
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

router.get('/bysubway', async(req:Request,res:Response)=>{

})

router.get('/bybusNsubway', async(req:Request,res:Response)=>{

})

export = router;