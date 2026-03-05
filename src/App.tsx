import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavigationBar from './components/NavigationBar/NavigationBar'
import { routes } from './router/routes'



function App() {

  return (
    <>
      <BrowserRouter>
        <NavigationBar />

        <div style={{ marginTop:"30px", padding: "20px"}}> 
          <Routes>
            {routes.map((route) => (
              <Route 
                key={route.path}
                path={route.path}
                element={route.element}
                />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
