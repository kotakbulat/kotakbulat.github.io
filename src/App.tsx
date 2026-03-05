import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import { routes } from './router/routes'



function App() {

  return (
    <>
      <BrowserRouter>
        <NavigationBar />

        <Routes>
          {routes.map((route) => (
            <Route 
              key={route.path}
              path={route.path}
              element={route.element}
              />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
