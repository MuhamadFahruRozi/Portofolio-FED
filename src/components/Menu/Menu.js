import { Link } from "react-router-dom"
import { Nav } from "react-bootstrap"

const Menu = () => {
    
    return (
        <div className="menubar">
            <Nav>        
                <ul className="nav__links">
                    <li><Link className="goto" to="/">Home</Link></li>
                    <li><Link className="goto"  to="/project">Project</Link></li>
                    <li><Link className="goto"  to="/about">About</Link></li>
                    {/* <li><Link className="goto "  to="/profile"  >Profile</Link></li> */}
                </ul>
            </Nav>
        </div>
    )
}

export default Menu
