import React, {useRef} from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { api } from "../../auth/Api";
import { MapActions } from "../../../store/Map-slice";
import { BusActions } from "../../../store/Bus-slice";

const StyledForm = styled.form`
    display:flex;
    width: 34.6vw;
    height: 11vh;
    border: 4px solid #CDD029;
    @media (max-width:500px){
        width: 98vw;
        height: 15vw;
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
      <input ref={inputRef} placeholder="정류장을 입력해주세요." />
      <button><img className="GRASS" src="./image/GRASS.png" alt="GRASS" /></button>
    </StyledForm>
  );
};

export default BusForm;
