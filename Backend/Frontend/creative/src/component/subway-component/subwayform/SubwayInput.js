import styled from "styled-components"
import axios from "axios"


const StyledInput = styled.input`
width: 621px;
height: 60px;
padding: 15px;
font-size: 50px;
border:0;
`

const SubwayInput = () => {

    const submitSubway = (value) => {
        axios.get(`/subway/stNm/${value}`)
            .then(res => {
                const { data } = res;
                console.log(data)
            })
    }
    const subwaychange = (event) => {
        const { target: { value } } = event
        submitSubway(value)
    }


    return (
        <StyledInput onChange={subwaychange} placeholder="역 이름을 입력해주세요." />
    )
}

export default SubwayInput