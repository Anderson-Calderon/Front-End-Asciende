import {useState} from 'react';
import {Outlet,Navigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

const RutaAdmin = ()=>{
	
	

	const {auth,setAuth,cargando} = useAuth();

	

	const cerrarSesion = ()=>{

		localStorage.removeItem("datos-usuario");
		setAuth({});

	}

	if(cargando) return "Cargando ..."

	return(

			<>

			{

				auth._id ? (

								<>

									<Header />
									<SideBar />

										
										<Outlet />	

										

								</>

									) : <Navigate to="/" />

			}


									
				

			</>

				


		   )



}


export default RutaAdmin;