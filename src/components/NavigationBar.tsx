import { NavLink } from "react-router-dom";
import { routes } from "../router/routes"; 
import "./NavigationBar.css"

function NavigationBar() {
    return (
        <nav className="navbar">
            {routes.map((route) => (
                <NavLink 
                    key={route.path} 
                    to={route.path}
                    className={({ isActive }) => 
                        isActive ? "navlink active" : "navlink"
                    }
                >
                    {route.name}
                </NavLink>
            ))}
        </nav>
    )
}


export default NavigationBar