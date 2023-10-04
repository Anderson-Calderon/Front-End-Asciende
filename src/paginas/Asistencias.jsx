import {useState,useEffect} from 'react';
import axios from 'axios';
import useAdmin from '../hooks/useAdmin';
const Asistencias =()=>{
	
	

	const {asistencias}= useAdmin();
 
  const [urlCaptura , setUrlCaptura] = useState("");

	useEffect(()=>{
	




    setTimeout(()=>{


      $(".tablas").DataTable({
        "order": [[2, 'desc']],
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

    const body = document.querySelector("body");

    body.addEventListener("click",function(e){

      const elemento = e.target;

      if(elemento.getAttribute("id")=="captura-imagen"){

        const captura = elemento.getAttribute("data-url");
              
        
          setUrlCaptura(captura);

        
      }

    });







  },[]);


  const obtenerDiferenciaDeHoras  = (horaSalidaAlmuerzo,horaIngresoAlmuerzo)=>{

   

    const [hora1Horas, hora1Minutos, hora1Segundos] = horaSalidaAlmuerzo.split(':').map(Number);
    const [hora2Horas, hora2Minutos, hora2Segundos] = horaIngresoAlmuerzo.split(':').map(Number);
  
    const hora1SegundosTotal = hora1Horas * 3600 + hora1Minutos * 60 + hora1Segundos;
    const hora2SegundosTotal = hora2Horas * 3600 + hora2Minutos * 60 + hora2Segundos;
    

    const diferenciaSegundos = hora2SegundosTotal - hora1SegundosTotal;

 

     

      return diferenciaSegundos;

  }
	

	return(


			<>


					<div className="content-wrapper">

          <section className="content-header">
    
            <h1>
              
              Administrar Asistencias
            
            </h1>

            <ol className="breadcrumb">
              
              <li><a href="inicio"><i className="fa fa-dashboard"></i> Inicio</a></li>
              
              <li className="active">Inicio</li>
            
            </ol>

          </section>


        <section className="content">

          <div className="box">


             <div className="box-header with-border">
  
              <ul className='w-2/5 flex flex-col  justify-items-center pl-28'>
              
                <li className="flex justify-start">  <span className="h-14 w-14 bg-red-500 inline-block mr-5"></span> Muy Tarde </li>
                <li className="flex justify-start mt-5">  <span className="h-14 w-14 bg-green-400 inline-block mr-5"></span> Tarde </li>
                <li className="flex justify-start mt-5">  <span className="h-14 w-14 bg-lime-300 inline-block mr-5"></span> Temprano </li>
              </ul>

            </div>

            <div className="box-body contenedor">

              
             
             <table className="  table table-bordered table-striped dt-responsive tablas" >
               
                <thead>
                 
                 <tr>
                   
                  
                  <td className="px-5">

							Nombre

						</td >

						<td className="px-5">

							Apellido

						</td>

						<td className="px-5">

							Fecha

						</td>

						<td className="px-5">

							Hora Ingreso

						</td>

						<td className="px-5">

							Salida al Almuerzo

						</td>

						<td className="px-5">

							Ingreso despúes de almuerzo

						</td>

						<td className="px-5">

							Salida

						</td>


						<td className="px-5">

							Último Trabajo

						</td>

						<td className="px-5">

							Área

						</td>

                 </tr> 

                </thead>

                <tbody

                

                >

              		{

						asistencias.map((asistencia)=>{

							const {_id:id , nombre,apellido,area,fecha,horaIngreso,horaSalidaAlmuerzo,horaIngresoAlmuerzo,horaSalida,captura} = asistencia;
							
             
              
              return(

									<tr key={id} >

										<td className="px-5">{nombre}</td>
										<td className="px-5">{apellido}</td>
										<td className="px-5">{fecha}</td>
										<td className="px-5 flex justify-center"><span className={ horaIngreso >= "09:00:00" && horaIngreso<="09:45:00" ? "bg-lime-300 py-4 px-5 text-black rounded-lg" :  horaIngreso > "09:45:00" && horaIngreso<="10:00:00" ? "bg-green-400 py-4 px-5 text-white rounded-lg" :  "bg-red-500 py-4 px-5 text-white rounded-lg" }   >{horaIngreso}</span> </td>
										<td className="px-5"><span className={ !horaSalidaAlmuerzo.includes(":") ?  "py-4 px-5 text-red" : "py-4 px-5"} >{horaSalidaAlmuerzo}</span></td>
										<td className="px-5 flex justify-center"><span className={  

                                                                  !horaIngresoAlmuerzo.includes(":") ? "py-4 px-5 text-red" : obtenerDiferenciaDeHoras(horaSalidaAlmuerzo,horaIngresoAlmuerzo) <= 3600 ? "bg-lime-300 py-4 px-5 text-black rounded-lg" : obtenerDiferenciaDeHoras(horaSalidaAlmuerzo,horaIngresoAlmuerzo) <= 3900 ? "bg-green-400 py-4 px-5 text-white rounded-lg" :"bg-red-500 py-4 px-5 text-white rounded-lg"

                                                                    


                                                                }  
                     >
                      
                      
                      
                      
                      {horaIngresoAlmuerzo}</span></td>
										<td className="px-5"> <span className={ !horaSalida.includes(":") ?  "py-4 px-5 text-red" : "py-4 px-5"} >{horaSalida}</span></td>
										<td className="px-5"><img id="captura-imagen" data-url={captura} data-toggle="modal" data-target="#modalMostrarFoto"  src={captura} className="w-72 hover:cursor-pointer" /></td>





										<td className="px-5">{area}</td>

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

        <div id="modalMostrarFoto" className="modal fade" role="dialog">
  <div className="modal-dialog">

   
    <div className="modal-content">
      <div className="modal-header bg-sky-600">
        <button type="button" className="close text-white text-4xl" data-dismiss="modal">&times;</button>
        <h4 className="modal-title text-white text-4xl">Foto Última Actividad</h4>
      </div>
      <div className="modal-body">
        
        <img className="w-100" src={urlCaptura} />

  </div>
  </div>
  </div>
  </div>


			</>






		  )

}

export default Asistencias;