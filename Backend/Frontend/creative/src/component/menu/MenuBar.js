import MenuButton from "./MenuButton"
import { Link } from "react-router-dom"
import styled from "styled-components"

const StyleMenuBar = styled.div`
display:flex;
flex-direction:column;
justify-content: space-between;
width: 800px;
height: 535px;
`


const MenuBar = () => {
    return (
        <StyleMenuBar>
            <Link to="/bus"><MenuButton name="저상버스" /></Link>
            <Link to="/subway"><MenuButton name="지하철" /></Link>
        </StyleMenuBar>
    )
}
export default MenuBar