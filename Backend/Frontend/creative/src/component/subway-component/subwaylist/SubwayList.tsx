import React,{useEffect} from "react";
import styled from "styled-components";
import SubwayItems from "./SubwayItems.tsx";
import SubwayNumber from "../subwaynumber/SubwayNumber.tsx";
import { RootState } from "../../../store/index";

import { useDispatch, useSelector } from "react-redux";
import { SubwayActions } from "../../../store/Subway-slice.ts";
import { MapActions } from "../../../store/Map-slice.ts";

const StyledList = styled.ul`
display:flex;
flex-direction:column;
align-items: center;
box-sizing: border-box;
width: 100%;
min-height:40vh;
padding: 0;
margin:0;
z-index: 10;
overflow:scroll;
a{ 
    text-decoration:none; 
}
`

const SubwayList = (props:any) => {
    const dispatch = useDispatch();
    const {data} = props;
    const subwayCheck = useSelector((state:RootState) => state.subway.subwayCheck)
    const subway = data.formData.read()
    useEffect(()=>{
        dispatch(MapActions.positioning(subway[0]));
        dispatch(MapActions.makerchacking(subway[0]));
        dispatch(SubwayActions.addSubwayInfo(subway))
    },[subway])
    return (
        <StyledList>
            {subwayCheck && <SubwayNumber count={subway.length} />}
            {subwayCheck && subway.map((elemnet:any,index:number) =>
                <SubwayItems
                    key={elemnet.stCd + elemnet.stNm}
                    items={elemnet}
                    index={index}
                />)}
        </StyledList>
    )
}

export default SubwayList;