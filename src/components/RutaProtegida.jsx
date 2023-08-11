
import {useState,useEffect} from 'react';
import axios from 'axios';

const RutaProtegida =  ()=>{
	


	const [areas , setAreas] = useState([]);
	const [nombreArea , setNombreArea] = useState("");
	const [usuario,setUsuario] = useState({});




	useEffect( ()=>{

		const crearArea = async ()=>{


									try{


										//const areasTrabajo = await  axios.post("http://localhost:4000/api/areas",{nombre:"Tecnología"});

										//console.log(areasTrabajo);


										}catch(error){

											console.log("ESTE ES EL ERROR");
											console.log(error);

										}

										

								}
		crearArea();



		const obtenerareas = async ()=>{

			const {data} = await axios.get("http://localhost:4000/api/areas");

			setAreas(data);

		}

		obtenerareas();

	},[]);

	const eliminarArea =  (idArea)=>{

 	Swal.fire({
			  title: 'Eliminar Área?',
			  text: "Estás seguro de eliminar esta área ?",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Sí , Eliminar!',
			  cancelButtonText: 'No'
			}).then(async (result) => {
			  if (result.isConfirmed) {



			   	const obj = await axios.delete("http://localhost:4000/api/areas/"+idArea);


			   	 	Swal.fire({
					  title: 'Área Eliminada',
					  text: "Área eliminada correctamente",
					  icon: 'success',
					  confirmButtonColor: '#3085d6',
					  confirmButtonText: 'OK',
					 
					}).then(async (result) => {
			  			if (result.isConfirmed) {

			  					location.href="http://localhost:5173/inicio"


			  				}

			  			});


			  }




			}) 


	}
	

	const editarAreaInputs = (area)=>{

		const {nombre , _id:id} = area;
		const editarAreaInput = document.querySelector("#nombre-area"),
			  editarIdInput = document.querySelector("#areaId");

		editarAreaInput.value=nombre;
		editarIdInput.value=id;



	}

	const editarArea = async (e)=>{

		e.preventDefault();
		const nombreArea = document.querySelector("#nombre-area").value,
			  idArea = document.querySelector("#areaId").value;

		

		const data = await axios.put("http://localhost:4000/api/areas/"+idArea,{nombreArea});



		Swal.fire({
					  title: 'Área Editada',
					  text: "Área editada correctamente",
					  icon: 'success',
					  confirmButtonColor: '#3085d6',
					  confirmButtonText: 'OK',
					 
					}).then(async (result) => {
			  			if (result.isConfirmed) {

			  					location.href="http://localhost:5173/inicio"


			  				}

			  			});


		
	}

	const agregarArea = async (e)=>{

		e.preventDefault();
		
		const data = await axios.post("http://localhost:4000/api/areas",{nombre:nombreArea});

		Swal.fire({
					  title: 'Área Agregada',
					  text: "Área agregada correctamente",
					  icon: 'success',
					  confirmButtonColor: '#3085d6',
					  confirmButtonText: 'OK',
					 
					}).then(async (result) => {
			  			if (result.isConfirmed) {

			  					location.href="http://localhost:5173/inicio"


			  				}

			  			});


	}

	const agregarUsuario = async (e)=>{

		e.preventDefault();
		

		 await axios.post("http://localhost:4000/api/usuarios",usuario);


			   	 	Swal.fire({
					  title: 'Usuario Agregado',
					  text: "Usuario Agregado correctamente",
					  icon: 'success',
					  confirmButtonColor: '#3085d6',
					  confirmButtonText: 'OK',
					 
					}).then(async (result) => {
			  			if (result.isConfirmed) {

			  					location.href="http://localhost:5173/inicio"


			  				}

			  			});

}

	return(


			<>

				<h1 className="text-center">PANEL ADMINISTRADOR</h1>

				<h1>PANEL CREAR USUARIO</h1>

				<button type="button" className="btn btn-info btn-lg bg-indigo-600" data-toggle="modal" data-target="#modalAgregarUsuario"  >AGREGAR</button>

				<table>
					
					<thead>
						
						<tr>

							<td>N° DNI</td>
							<td>Nombre</td>
							<td>Apellido</td>
							<td>Area</td>

						</tr>

					</thead>

					<tbody>
						
						<tr>

							<td>76375494</td>
							<td>Anderson</td>
							<td>Calderòn</td>
							<td>Tecnología</td>

						</tr>

					</tbody>


				</table>	


				<h1 className="text-2xl text-center mt-10">PANEL CREAR AREA TRABAJO</h1>

					<button type="button" className="btn btn-info btn-lg bg-indigo-600" data-toggle="modal" data-target="#modalAgregar"  >AGREGAR</button>

				<table>
						
					<thead>
						
						<tr>
							
							<td className="text-center py-5 px-10">ÁREA</td>
							<td className="text-center py-5 px-10">ACCIONES</td>


						</tr>

					</thead>

					<tbody>

						
						
						{


							areas && areas.map((area)=>{


													const {nombre} = area;

													return(


																<tr  key={area._id}>
							
																	<td>{nombre}</td>
																	<td>
																			
																	

																		<button 

																			onClick={()=>{editarAreaInputs(area)}}
																		type="button" className="btn btn-info btn-lg bg-indigo-600" data-toggle="modal" data-target="#modalEditar" >EDITAR</button>



																		<button  onClick={()=>{eliminarArea(area._id)}} >ELIMINAR</button>

																	</td>

																</tr>


															)
														

												})
													

							


						}

					</tbody>


				</table>






<div id="modalAgregarUsuario" className="modal fade" role="dialog">
  <div className="modal-dialog">

   
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Agregar Usuario</h4>
      </div>
      <div className="modal-body">
        <form

        	onSubmit={(e)=>{agregarUsuario(e)}}
        	

        >

		  <div className="input-group">
		    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
		    <input   

		    		onChange={(e)=>{setUsuario({...usuario,nombre:e.target.value})}}
		    		id="nombre-usuario" 
		    		type="text" 
		    		className="form-control" 
		    		name="text" 
		    		placeholder="Nombre Del Usuario" 
		    		required 

		    />

		  


		  </div>

		  <div className="input-group mt-5">
		    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
		    <input   

		    		onChange={(e)=>{setUsuario({...usuario,apellido:e.target.value})}}
		    		id="apellido-usuario" 
		    		type="text" 
		    		className="form-control" 
		    		name="text" 
		    		placeholder="Apellido Del Usuario" 
		    		required 

		    />

		  


		  </div>

		  <div className="input-group mt-5">
		    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
		    <select 

		    		onChange={(e)=>{setUsuario({...usuario,area:e.target.value})}}
		    		id="area-usuario" 
		    		defaultValue=''
		    		className="form-control" 
		    		
		    		placeholder="Apellido Del Usuario" 
		    		required 

		    >

		    <option disabled value='' >--Seleccione--</option>

		    {

		    	areas.map((area)=>{



		    						return(

		    								<option key={area._id} value={area.nombre}>
		    									
		    									{

		    										area.nombre

		    									}

		    								</option>

		    								)

		    					})

		    }

		</select>

		  


		  </div>


		  <div className="input-group mt-5">
		    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
		    <input   

		    		onChange={(e)=>{setUsuario({...usuario,dni:e.target.value})}}
		    		id="dni-usuario" 
		    		type="text" 
		    		className="form-control" 
		    		name="text" 
		    		placeholder="N° DNI" 
		    		required 

		    />

		  


		  </div>

		  {

		   usuario.area=="Gerencia" &&

		  	 <div className="input-group mt-5">
			    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
			    <input   

			    		onChange={(e)=>{setUsuario({...usuario,password:e.target.value})}}
			    		id="usuario-usuario" 
			    		type="password" 
			    		className="form-control" 
			    		
			    		placeholder="Tu Contraseña" 
			    		required 

			    />

			  


			 </div>

		  }


		  

		  <input type="submit" className="mt-5 bg-indigo-500 hover:bg-indigo-600 btn text-white hover:text-white" value="Agregar Usuario"  />

		  
		</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>




<div id="modalEditar" className="modal fade" role="dialog">
  <div className="modal-dialog">

   
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Editar Area</h4>
      </div>
      <div className="modal-body">
        <form

        	onSubmit={(e)=>{editarArea(e)}}

        >

		  <div className="input-group">
		    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
		    <input id="nombre-area" type="text" className="form-control" name="text" placeholder="Nombre Del Área" required />
		  </div>


		   <input id="areaId" type="hidden" className="form-control" name="text" placeholder="id Del Área"/>

		  <input type="submit" className="mt-5 bg-indigo-500 hover:bg-indigo-600 btn text-white hover:text-white" value="Editar Área"  />

		  
		</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>



<div id="modalAgregar" className="modal fade" role="dialog">
  <div className="modal-dialog">

   
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Agregar Area</h4>
      </div>
      <div className="modal-body">
        <form

        	onSubmit={(e)=>{agregarArea(e)}}

        >

		  <div className="input-group">
		    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
		    <input   onChange={(e)=>{setNombreArea(e.target.value)}} id="nombre-area" type="text" className="form-control" name="text" placeholder="Nombre Del Área" required />
		  </div>


		  

		  <input type="submit" className="mt-5 bg-indigo-500 hover:bg-indigo-600 btn text-white hover:text-white" value="Agregar Área"  />

		  
		</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>



			</>


		  )

}

export default RutaProtegida;