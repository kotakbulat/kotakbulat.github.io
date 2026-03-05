import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";


export const routes = [
    {
        path: "/",
        name: "Home",
        element: <Home />,
    },
    {
        path: "/about",
        name: "About",
        element: <About />,
    },
    {
        path: "/contact",
        name: "Contact",
        element: <Contact />,
    },
]