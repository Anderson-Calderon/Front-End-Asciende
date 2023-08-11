
import {createContext , useState , useEffect} from 'react';
import { useNavigate , useLocation } from 'react-router-dom'

const AuthContext = createContext();


const AuthProvider = ({children})=>{
	
	const {pathname} = useLocation();

	

	const [loginVisible,setLoginVisible] = useState(false);
	const [auth,setAuth] = useState({});
	const [cargando , setCargando] = useState(true);

	const navigate = useNavigate()

	useEffect(()=>{

		setCargando(false);

		const datosUsuario = JSON.parse(localStorage.getItem("datos-usuario"));

		if(datosUsuario){

			setAuth(datosUsuario);

			if(pathname=="/" && datosUsuario){

				navigate('/inicio')
			}

		}

	},[]);

	return(

			<AuthContext.Provider

				value={


							{

								loginVisible,
								setLoginVisible,
								auth,
								setAuth,
								cargando,
								pathname

							}


						}

			>

				{children}

			</AuthContext.Provider>


			)

}

export {AuthProvider};

export default AuthContext