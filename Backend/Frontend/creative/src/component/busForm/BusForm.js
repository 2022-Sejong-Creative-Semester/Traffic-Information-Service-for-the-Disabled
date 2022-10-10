import BusButton from "./BusButton";
import BusInput from "./BusInput";
import styled from "styled-components";

const StyledForm = styled.form`
    display:flex;
`


const BusForm = () => {
    const BusStationData = (event) => {
        event.preventDefault();
        const { target: [input] } = event
        const { value } = input
        input.value = "";
        axios.get(`/station/${value}`, {

        }).then(res => {
            const { data } = res;
            console.log(data)

        }).catch(error => {
            alert("데이터를 받아오지 못했습니다.")
        });

    }

    return (
        <StyledForm>
            <BusButton />
            <BusInput />
        </StyledForm>
    )
}

export default BusForm