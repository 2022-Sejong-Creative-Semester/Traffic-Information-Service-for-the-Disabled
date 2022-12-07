import MenuBusButton from "./MenuBusButton"
import MenuSubwayButton from "./MenuSubwayButton"
import { Link } from "react-router-dom"
import styled from "styled-components"
import MenuExplan from "./MenuExplan"

const StyleMenuBar = styled.div`
display:flex;
justify-content: space-between;
width: 1920px;
padding-top:5vw;
height: 633px;
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