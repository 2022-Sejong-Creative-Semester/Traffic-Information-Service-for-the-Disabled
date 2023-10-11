import React, {useRef} from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { api } from "../../auth/Api.ts";
import { MapActions } from "../../../store/Map-slice.ts";
import { BusActions } from "../../../store/Bus-slice.ts";

const StyledForm = styled.form`
    display:flex;
    width: 100%;
    height: 140px;
    border: 4px solid #CDD029;
    .busFormInput{
      width: 80%;
      height: 80%;
      padding: 15px;
      font-size: 2.5vw;
      border:0;
      font-family: 'Pretendard-Regular';
      font-weight: 700;
    }
    .busFormBtn{
      width: 20%;
      height: 100%;
      background: #CDD029;
      border: 1px solid #CDD029;
      padding:0;
    }
    @media (max-width:500px){
        width: 98vw;
        height: 15vw;
        .busFormInput{
          font-family: 'Pretendard-Regular';
          width: 80%;
          height: 15vw;
          font-size: 6vw;
          padding: 1%;
        }
    }
`


const BusForm:React.FC = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const SubmitBusStation = (value: string|null) => {
    api
      .get(`/bus/stNm/${value}`)
      .then((res) => {
        const { data } = res;
        dispatch(BusActions.initialState());
        dispatch(MapActions.makerchacking(data));
        dispatch(BusActions.addStationInfo(data));
        dispatch(MapActions.positioning(data[0]));
        dispatch(MapActions.Onbusmode());
      })
      .catch((error) => {
        console.log(error);
        alert("해당 정류장이 없습니다.");
      });
  };
  const BusStationData = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    SubmitBusStation(inputRef.current!.value);
  };
  return (
    <StyledForm  onSubmit={BusStationData}>
      <input className="busFormInput" ref={inputRef} placeholder="정류장을 입력해주세요." />
      <button className="busFormBtn"><img className="GRASS" src="./image/GRASS.png" alt="GRASS" /></button>
    </StyledForm>
  );
};

export default BusForm;
