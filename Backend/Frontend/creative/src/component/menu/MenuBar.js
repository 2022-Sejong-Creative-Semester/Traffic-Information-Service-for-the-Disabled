import MenuBusButton from "./MenuBusButton"
import MenuSubwayButton from "./MenuSubwayButton"
import styled from "styled-components"
import MenuExplan from "./MenuExplan"

const StyleMenuBar = styled.div`
display:flex;
justify-content: space-between;
width: 100%;
padding-top:5vw;
height: 633px;
text-decoration:none;
@media (max-width:500px){
    flex-direction: column; 
    justify-content:  space-evenly;
}
`


const MenuBar = () => {
    return (
        <StyleMenuBar>
            <MenuBusButton />
            <MenuExplan />
            <MenuSubwayButton />
        </StyleMenuBar>
    )
}
export default MenuBar