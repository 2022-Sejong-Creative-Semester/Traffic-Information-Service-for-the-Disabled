import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { api } from "../../auth/Api.ts";
import { MapActions } from "../../../store/Map-slice.ts";
import { BusActions } from "../../../store/Bus-slice.ts";

const StyledForm = styled.form`
    display: flex;
    position: fixed;
    z-index: 10;
    top: 15vh;
    height: 1vh;
    width: 80vw;
    .busFormInput{
      width: 100%;
      padding: 1em;
      font-size: 80%;
      font-family: 'Pretendard-Regular';
      font-weight: 700;
      border: 0;
      border-radius: 30px;
    }
`

const BusForm:React.FC = () => {
  const dispatch = useDispatch();

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
    let [station]:any  = (event.target as HTMLInputElement);
    SubmitBusStation(station.value);
  };
  
  return (
    <StyledForm  onSubmit={BusStationData}>
      <input className="busFormInput" name="station" placeholder="정류장을 입력해주세요." />
    </StyledForm>
  );
};

export default BusForm;
