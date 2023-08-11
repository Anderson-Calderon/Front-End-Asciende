
import {useState} from 'react';
import axios from 'axios';
import {alertaEditarAgregarError} from '../helpers/Alerta';


const RegistroAsistencia = ()=>{
	
	const [dniAsistencia,setDniAsistencia] = useState("");
	const [tipoAsistencia , setTipoAsistencia] = useState("");
	const [dataImagen,setDataImagen] = useState();
	const [hora,setHora] = useState("");

	console.log(dataImagen);

	const handleSubmit= async (e)=>{

		e.preventDefault();

		
		if(tipoAsistencia=="ingreso al trabajo"){


				await agregarAsistencia();

				


		}else if(tipoAsistencia=="almuerzo"){

			await editarHoraAsistenciaAlmuerzo();
		}else {

			await editarHoraAsistenciaSalida();

		}

		

	}

	const agregarAsistencia = async ()=>{

		try{

				await axios.post("http://localhost:4000/api/asistencias",{dni:dniAsistencia});
				

				alertaEditarAgregarError( "Asistencia Realizada" ,"Asistencia realizada con éxito","success","http://localhost:5173/");

				

			}catch(error){

				alertaEditarAgregarError( "Error" ,error.response.data.msg,"error","http://localhost:5173/");
				

			}



	}

	const editarHoraAsistenciaAlmuerzo = async()=>{

	try{

		const data = await axios.put("http://localhost:4000/api/asistencias",{dni:dniAsistencia,tipoAsistencia});

		

		alertaEditarAgregarError( "Asistencia Realizada" ,data.data.msg,"success","http://localhost:5173/");



	}catch(error){

		alertaEditarAgregarError( "Error" ,error.response.data.msg,"error","http://localhost:5173/");
		

	}

	}

	const editarHoraAsistenciaSalida = async()=>{


	const inputFile = document.querySelector("#captura-asistencia");
	

	const formData = new FormData();

	 formData.append('captura', inputFile.files[0]);
	 formData.append('dni', dniAsistencia);
	 formData.append('tipoAsistencia', tipoAsistencia);



	try{

		const data = await axios.put("http://localhost:4000/api/asistencias",formData);

		alertaEditarAgregarError( "Asistencia Realizada" ,data.data.msg,"success","http://localhost:5173/");
		
		
	}catch(error){
		alertaEditarAgregarError( "Error" ,error.response.data.msg,"error","http://localhost:5173/");
		

	}

	}



	
	return(


				<>

					<div id="back"></div>

<div className="login-box">
  
  <div className="login-logo">

    <img src="/imagenes/plantilla/logo-formulario.png" className="logo-formulario  img-responsive"  />

  </div>

  <div className="login-box-body">

    <p className="login-box-msg">Marcar Asistencia</p>

    <form 

    	onSubmit={(e)=>{handleSubmit(e)}}

    >

      <div className="form-group has-feedback">

        <input   
								onChange={(e)=>{setDniAsistencia(e.target.value)}} 
								id="dni-asistencia" 
								type="text" 
								className="form-control"
								placeholder="Ingresa Tu Identificador "
								required />
        <span className="glyphicon glyphicon-user form-control-feedback"></span>

      </div>

      <select 

								onChange={(e)=>{ let hora = new Date();
												 hora = hora.toLocaleTimeString('es-ES');
												 setHora(hora); 
												 setTipoAsistencia(e.target.value)}


								}  
								defaultValue=""  
								id="tipo-asistencia" 
								className="form-control mt-5"  
								required 

						>

					    	<option value="" disabled >--Seleccione--</option>
					    	<option value="ingreso al trabajo"  >Ingreso Al Trabajo</option>
					    	<option value="almuerzo"  >Almuerzo</option>
					    	<option value="salida del trabajo"  >Salida Del Trabajo</option>

					    </select>

					      {

						  	(tipoAsistencia=="salida del trabajo" && hora>="18:00:00") ?

						  	<div className="input-group mt-5">
							    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
							    <input   

							    	 onChange={(e)=>{setDataImagen(URL.createObjectURL(e.target.files[0]))}}
							    	 id="captura-asistencia" type="file" className="form-control" placeholder="Ingresa Tu foto" required />
							    	
						  </div> : tipoAsistencia=="salida del trabajo" && alertaEditarAgregarError( "Error" ,"Aún no puedes marcar tu hora de salida . La salida es a las 18:00","error","http://localhost:5173/")

						  }

						  <img  className="w-42 mt-5" src={dataImagen && dataImagen } />

      <div className="row mt-5">
       
        <div className="col-xs-4">

          <button type="submit" className="btn bg-sky-600 hover:bg-sky-500 text-white hover:text-white">Marcar Asistencia</button>
        
        </div>

      </div>

      

    </form>

  </div>

</div>



					


				</>


		   )

}

export default RegistroAsistencia ;