import React from "react";
import BusButton from "./BusButton";
import BusInput from "./BusInput";
import styled from "styled-components";
import { api } from "../../auth/Api.";
import { MapActions } from "../../../store/Map-slice";
import { BusActions } from "../../../store/Bus-slice";
import { useDispatch } from "react-redux";

const StyledForm = styled.form`
  display: flex;
  width: 34.6vw;
  height: 11vh;
  border: 4px solid #cdd029;
  @media (max-width: 500px) {
    width: 98vw;
    height: 15vw;
  }
`;

const BusForm:React.FC = () => {
  const dispatch = useDispatch();
  const SubmitBusStation = (value) => {
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
  const BusStationData = (event) => {
    event.preventDefault();
    const {
      target: [input],
    } = event;
    const { value } = input;
    input.value = "";
    SubmitBusStation(value);
  };
  return (
    <StyledForm onSubmit={BusStationData}>
      <BusInput />
      <BusButton />
    </StyledForm>
  );
};

export default BusForm;
