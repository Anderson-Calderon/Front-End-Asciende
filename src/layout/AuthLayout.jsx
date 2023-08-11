import {Outlet} from 'react-router-dom';




import useAuth from '../hooks/useAuth';

import Login from '../components/Login';
import RegistroAsistencia from '../components/RegistroAsistencia';


const AuthLayout = ()=>{
	
	const {loginVisible,setLoginVisible} = useAuth();
	

	return(

				<>

					

					<div className="contenedor pt-10">

						<button 


							className="btn  border-solid border-white text-white hover:text-white" onClick={(e)=>{

							setLoginVisible(true)

							document.querySelector(".activo").classList.remove("activo");   e.target.classList.add("activo");

							}


							}  type="button" >

							LOGIN

						</button>

						<button 

							

							className="btn border-solid border-white activo text-white hover:text-white ml-5"  

							onClick={(e)=>{

							setLoginVisible(false)
							document.querySelector(".activo").classList.remove("activo");   e.target.classList.add("activo");

							}} type="button" >

							MARCAR ASISTENCIA

						</button>


					</div>


					{

						loginVisible ? 


												<Login />

											

									   : 

									  

									   	<RegistroAsistencia />

									  

					}


				</>



		  )


	

}

export default AuthLayout;