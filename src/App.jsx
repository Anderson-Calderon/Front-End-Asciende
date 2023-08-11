import { useState } from 'react'
import './App.css'

import {BrowserRouter , Routes , Route} from 'react-router-dom';

import RutaProtegida from './components/RutaProtegida';


import RutaAdmin from './layout/RutaAdmin';
import Inicio from './paginas/inicio';
import Usuarios from './paginas/Usuarios';
import Areas from './paginas/Areas';
import Asistencias from './paginas/Asistencias';


import AuthLayout from './layout/AuthLayout';

import {AdminProvider} from './context/AdminProvider';
import {AuthProvider} from './context/AuthProvider';

function App() {
  const [count, setCount] = useState(0)

  return (
    

              <BrowserRouter>


                <AuthProvider>

                  <AdminProvider>
                  
                    <Routes>

                      <Route path="" element={<AuthLayout />} >




                      </Route>

                        

                      


                      <Route path="/inicio" element={<RutaAdmin />} >

                      	<Route index element={<Inicio />} />

                      	<Route path="usuarios" element={<Usuarios />} />
                      	<Route path="areas" element={<Areas />} />
                        <Route path="asistencias" element={<Asistencias />} />


                      </Route>

                    </Routes>

                  </AdminProvider>

                </AuthProvider>

              </BrowserRouter>


          )
}

export default App
