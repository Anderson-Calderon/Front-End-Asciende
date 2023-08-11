import {useState,useEffect,createContext} from 'react';
import axios from 'axios';


const AdminContext = createContext();


const AdminProvider = ({children})=>{
	

	const [areas,setAreas] = useState([]);
	const [usuarios,setUsuarios] = useState([]);
	const [asistencias,setAsistencias] = useState([]);

	

	useEffect( ()=>{

		
		const obtenerAreas = async ()=>{

			const {data} = await axios.get("http://localhost:4000/api/areas");

			setAreas(data);

		}

		const obtenerUsuarios = async ()=>{

			const {data} = await axios.get("http://localhost:4000/api/usuarios");
			

			setUsuarios(data);

		}

		const obtenerAsistencias = async ()=>{

			const {data} = await axios.get("http://localhost:4000/api/asistencias");
			setAsistencias(data);


		}


		obtenerAreas();
		obtenerUsuarios();
		obtenerAsistencias();

	},[]);


	return(


				<AdminContext.Provider

					value={

							{

								areas,
								setAreas,
								usuarios,
								setUsuarios,
								asistencias,
								setAsistencias


							}

						  }

				>

					{children}

				</AdminContext.Provider>


			)



}

export { AdminProvider}
export default AdminContext;