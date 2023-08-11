
import { useNavigate , useLocation , Link } from 'react-router-dom'
import {useEffect} from 'react';
import useAuth from '../hooks/useAuth';
const Sidebar = ()=>{
	
	let {pathname} = useAuth();
		
	useEffect(()=>{


			const elementoActivo = document.querySelector(".active");
			elementoActivo.classList.remove("active");

		
			if(pathname.replace("/","")=="inicio"){

				const nuevoElementoActivo = document.querySelector("#inicio");

				nuevoElementoActivo.classList.add("active");

			}else{

				pathname=pathname.replace("/inicio/","");

				document.querySelector("#"+pathname).classList.add("active");

			}

		

	},[]);






	return(








         <aside className="main-sidebar">

		   <section className="sidebar">

		    <ul className="sidebar-menu">

		      <li id="inicio" className="active">

		        <Link 

		        	onClick={(e)=>{establecerItemActivo(e)}}
		        	
		        	to="/inicio">

		          <i class="fa-solid fa-house"></i>
		          <span>   Inicios </span>

		        </Link>

		      </li>

		  

		      <li id="usuarios" className="">

		        <Link

		        	onClick={(e)=>{establecerItemActivo(e)}}
		        	to="/inicio/usuarios">

		          <i class="fa-solid fa-users"></i>
		          <span>   Usuarios </span>

		        </Link>

		      </li>

		      <li id="asistencias" className="">

		        <a 

		        	onClick={(e)=>{establecerItemActivo(e)}}
		        	href="/inicio/asistencias">

		          <i class="fa-solid fa-calendar-days"></i>
		          <span>   Asistencias </span>

		        </a>

		      </li>

		      <li id="areas" className="">

		        <a 

		        	onClick={(e)=>{establecerItemActivo(e)}}
		        	href="/inicio/areas">

		          <i class="fa-solid fa-layer-group"></i>
		          <span>   Áreas </span>

		        </a>

		      </li>

		  

		     
		   
		      

		    

		    </ul>

		   </section>

		</aside>





		  )

}


export default Sidebar;