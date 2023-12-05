import React,{useState} from "react"

import classes from "./SubwayTransferPage.module.css"
import Header from "../../component/header/Header.tsx"
import SubwayPanel from "../../component/subway-component/subwaypanel/SubwayPanel.tsx"
import SubwayBar from "../../component/subway-component/subwaymenubar/SubwayBar.tsx"
import SubwayTransferDetail from "../../component/subway-component/subwaytransfer/SubwayTransferDetail.tsx"
import MenuBar from "../../component/menu/MenuBar.tsx"

import { useParams } from "react-router-dom"

const SubwayTranferPage = () => {
    const param = useParams();
    const [image,setImage] = useState()
    console.log(image)
    return (
        <div className={classes.subwaypage}>
            <Header />
            <div className={classes.main}>
                <SubwayPanel text={["지하철편의시설"]} menu={<SubwayBar />} />
                <SubwayTransferDetail param={param} setImage={setImage}/>
            </div>
            <img className={classes.detailImge} alt={image} src={image}></img>
            <MenuBar/>
        </div>
    )
}



export default SubwayTranferPage 
