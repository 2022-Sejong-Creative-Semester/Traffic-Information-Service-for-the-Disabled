import styled from "styled-components";
import { Link } from "react-router-dom";



const StyldeSubwayItems = styled.li`
display:flex;
justify-content:space-around;
align-items:center;
width:700px;
list-style:none;
border-bottom: 1px solid #D2D2D2;
color:black;
:hover{
    cursor: pointer;
}
.name{
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 60px;
}
.line{
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
}
`

const SubwayItems = ({ items }) => {


    return (
        <Link to={`/subway/detail/${items.stCd}/${items.stNm}`}>
            <StyldeSubwayItems>
                <p className="name">{items.stNm}</p>
                <p className="line">{items.lnNm}</p>
            </StyldeSubwayItems>
        </Link>
    )
}

export default SubwayItems