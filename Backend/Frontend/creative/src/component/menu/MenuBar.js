import MenuButton from "./MenuButton"
import { Link } from "react-router-dom"


const MenuBar = () => {
    return (
        <div>
            <Link to="/bus"><MenuButton name="저상버스" /></Link>
            <Link to="/subway"><MenuButton name="지하철" /></Link>
        </div>
    )
}
export default MenuBar