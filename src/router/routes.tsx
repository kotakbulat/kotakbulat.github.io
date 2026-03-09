import Home from "../pages/Home";
import Blog from "../pages/Blog";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Playground from "../pages/Playground";
import TestOnly from "../pages/test-only";
import Project from "../pages/Project";

export const routes = [
    {
        path: "/",
        name: "Home",
        element: <Home />,
    },
    {
        path: "/blog",
        name: "Blog",
        element: <Blog />,
    },
    {
        path: "/project",
        name: "Project",
        element: <Project />,
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
    {
        path: "/playground",
        name: "Playground",
        element: <Playground />,
    },
    {
        path: "/testing",
        name: "Testing Page",
        element: <TestOnly />,
    },
    
]