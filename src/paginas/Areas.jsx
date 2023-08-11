import {useState,useEffect} from 'react';
import useAdmin from '../hooks/useAdmin';
import axios from 'axios';
import {alertaEditarAgregarError} from '../helpers/Alerta';

const Areas = ()=>{
	
	const {areas,setAreas} = useAdmin();
	const [nombreArea , setNombreArea] = useState("");



	useEffect(()=>{
	




    setTimeout(()=>{


      $(".tablas").DataTable({
     "destroy": true,
    "language": {

      "sProcessing":     "Procesando...",
      "sLengthMenu":     "Mostrar _MENU_ registros",
      "sZeroRecords":    "No se encontraron resultados",
      "sEmptyTable":     "Ningún dato disponible en esta tabla",
      "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
      "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
      "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
      "sInfoPostFix":    "",
      "sSearch":         "Buscar:",
      "sUrl":            "",
      "sInfoThousands":  ",",
      "sLoadingRecords": "Cargando...",
      "oPaginate": {
      "sFirst":    "Primero",
      "sLast":     "Último",
      "sNext":     "Siguiente",
      "sPrevious": "Anterior"
      },
      "oAria": {
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
      }

    }

  });


    },500);


  





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


			  
			   	const obj = await axios.delete(`https://aqueous-dawn-54000-9bdf4e305f79.herokuapp.com/api/areas/${idArea}`);


			   	 	Swal.fire({
					  title: 'Área Eliminada',
					  text: "Área eliminada correctamente",
					  icon: 'success',
					  confirmButtonColor: '#3085d6',
					  confirmButtonText: 'OK',
					 
					}).then(async (result) => {
			  			if (result.isConfirmed) {

			  					location.href="http://localhost:5173/inicio/areas"


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



		

		alertaEditarAgregarError('Área Editada',"Área editada correctamente",'success',"http://localhost:5173/inicio/areas");


		
	}

	const agregarArea = async (e)=>{

		e.preventDefault();
		
		const data = await axios.post(`https://aqueous-dawn-54000-9bdf4e305f79.herokuapp.com/api/areas`,{nombre:nombreArea});

		

		alertaEditarAgregarError('Área Agregada',"Área agregada correctamente",'success',"http://localhost:5173/inicio/areas");


	}

	return(


			<>

					<div className="content-wrapper">

          <section className="content-header">
    
            <h1>
              
              Administrar Áreas
            
            </h1>

            <ol className="breadcrumb">
              
              <li><a href="/inicio"><i className="fa fa-dashboard"></i> Inicio</a></li>
              
              <li className="active">Inicio</li>
            
            </ol>

          </section>


        <section className="content">

          <div className="box">


             <div className="box-header with-border">
  
             	<button type="button" className="btn bg-sky-600 text-white hover:bg-sky-500 hover:text-white" data-toggle="modal" data-target="#modalAgregar"  >AGREGAR</button>

            </div>

            <div className="box-body contenedor">

            
             
             <table className="  table table-bordered table-striped dt-responsive tablas" >
               
                <thead>
                 
                 <tr>
                   
                  
                   <td className="text-center py-5 px-10">ÁREA</td>
							<td className="text-center py-5 px-10">ACCIONES</td>

                 </tr> 

                </thead>

                <tbody

                

                >

           
                  	{


							areas && areas.map((area)=>{


													const {nombre} = area;

													return(


																<tr  key={area._id}>
							
																	<td>{nombre}</td>
																	<td>
																			
																	

																		<button 

																			onClick={()=>{editarAreaInputs(area)}}
																		type="button" className="btn bg-sky-600 text-white hover:btn-sky-500 hover:text-white" data-toggle="modal" data-target="#modalEditar" >EDITAR</button>



																		<button 
																		className="ml-5 btn bg-red-500 text-white hover:bg-red-400 hover:text-white"
																		 onClick={()=>{eliminarArea(area._id)}} >ELIMINAR</button>

																	</td>

																</tr>


															)
														

												})
													

							


						}
               



                </tbody>

             </table>

           </div>


          </div>
        </section>
        </div>






				<div id="modalEditar" className="modal fade" role="dialog">
  <div className="modal-dialog">

   
    <div className="modal-content">
      <div className="modal-header bg-sky-600 ">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title text-white text-4xl">Editar Area</h4>
      </div>
      <div className="modal-body">
        <form

        	onSubmit={(e)=>{editarArea(e)}}

        >

		  <div className="input-group">
		    <span className="input-group-addon"><i class="fa-solid fa-layer-group"></i></span>
		    <input id="nombre-area" type="text" className="form-control" name="text" placeholder="Nombre Del Área" required />
		  </div>


		   <input id="areaId" type="hidden" className="form-control" name="text" placeholder="id Del Área"/>

		  <input type="submit" className="mt-5 btn bg-sky-600 hover:bg-sky-500  text-white hover:text-white" value="Editar Área"  />

		  
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
      <div className="modal-header bg-sky-600 ">
        <button type="button" className="close text-white text-4xl" data-dismiss="modal">&times;</button>
        <h4 className="modal-title text-white text-4xl">Agregar Area</h4>
      </div>
      <div className="modal-body">
        <form

        	onSubmit={(e)=>{agregarArea(e)}}

        >

		  <div className="input-group">
		    <span className="input-group-addon"><i class="fa-solid fa-layer-group"></i></span>
		    <input   onChange={(e)=>{setNombreArea(e.target.value)}} id="nombre-area" type="text" className="form-control"  placeholder="Nombre Del Área" required />
		  </div>


		  

		  <input type="submit" className="mt-5  btn  bg-sky-600 hover:bg-sky-500 text-white hover:text-white" value="Agregar Área"  />

		  
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

export default Areas;