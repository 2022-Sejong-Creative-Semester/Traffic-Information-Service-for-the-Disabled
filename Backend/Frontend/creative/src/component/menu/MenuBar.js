import MenuBusButton from "./MenuBusButton"
import MenuSubwayButton from "./MenuSubwayButton"
import { Link } from "react-router-dom"
import styled from "styled-components"
import MenuExplan from "./MenuExplan"

const StyleMenuBar = styled.div`
display:flex;
justify-content: space-between;
width: 100%;
padding-top:5vw;
height: 633px;
@media (max-width:500px){
    flex-direction: column; 
    justify-content:  space-evenly;
}
`


const MenuBar = () => {
    return (
        <StyleMenuBar>
            <Link to="/bus"><MenuBusButton /></Link>
            <MenuExplan />
            <Link to="/subway"><MenuSubwayButton /></Link>
        </StyleMenuBar>
    )
}
export default MenuBar