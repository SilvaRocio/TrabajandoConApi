// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.


/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const  btnCerrarSesion= document.getElementById("closeApp");
  const usuario=document.querySelector(".nombreUsuario");
  let key=localStorage.getItem("jwt");
  const formCrearTarea=document.querySelector("form");
  const nuevaTarea=document.getElementById("nuevaTarea");
  const main=document.querySelector("main");
  const tareas=document.querySelector(".tareas-pendientes");
  const tareaFinalizada=document.querySelector(".tareas-terminadas");
  obtenerNombreUsuario();
  consultarTareas();

 
  

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
      location.replace("./index.html");

  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */
  
  function obtenerNombreUsuario() {
    let settings={
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          "authorization": JSON.parse(key)
      }    
  }
  fetch("https://todo-api.ctd.academy/v1/users/getMe",settings)
      .then(function(respuesta){
          return  respuesta.json();
      })
      .then(function(info){
         usuario.innerText=info.firstName;
         
      })
      .catch(function(e){
          console.log("El error es"+ e);
      })
  };
 
  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */
  
  function consultarTareas() {
    let settings={
      method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "authorization": JSON.parse(key)
         }
      }
    fetch("https://todo-api.ctd.academy/v1/tasks",settings)
    .then(function(respuesta){
        return respuesta.json();
    })
    .then(function(info){
        // console.log(info);
        renderizarTareas(info);
        botonesCambioEstado();
        botonBorrarTarea();
    })
    .catch(function(error){
      return ("El error es"+error);
    })
  };


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
           event.preventDefault();
          let tareas={
              description: nuevaTarea.value,
              completed:false

          }
          let settings={
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
                "authorization": JSON.parse(key)
              },
              body:JSON.stringify(tareas)
          }
          fetch("https://todo-api.ctd.academy/v1/tasks",settings)
          .then(function(response){
            return response.json();
          })
          .then(function(info){
              console.log(info);
              consultarTareas();
          })
          .catch(function(error){
              return error;
          })
          formCrearTarea.reset();
  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    tareas.innerHTML="";
    tareaFinalizada.innerHTML="";
     listado.forEach(element => {
          if (element.completed){
            tareaFinalizada.innerHTML+=`<li class="tarea">
            <div class="hecha">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="descripcion">
              <p class="nombre">${element.description}</p>
              <div class="cambios-estados">
                <button class="change incompleta" id="${element.id}" ><i class="fa-solid fa-rotate-left"></i></button>
                <button class="borrar" id="${element.id}"><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </li>`
          }else{
            tareas.innerHTML+=
            `<li class="tarea">
              <button class="change" id="${element.id}"><i class="fa-regular fa-circle"></i></button>
              <div class="descripcion"> <p class="nombre">${element.description}</p>
              </div>
              </li>`
          }
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    
      main.addEventListener('click',function(e){  
          
        if (e.target.classList.contains("change")){
          let idTarea=e.target.id;
          let objetoTarea={};
          if (e.target.classList.contains("incompleta")){
            objetoTarea.completed=false;
          }else{
            objetoTarea.completed=true;
          }
        
          let settings={
            method:"PUT",
            headers:{
              "content-type": "application/json",
              "authorization":JSON.parse(key)
            },
            body: JSON.stringify(objetoTarea)
          }
          fetch(`https://todo-api.ctd.academy/v1/tasks/${idTarea}`,settings)
          .then(function(respuesta){
            console.log(respuesta)
            return respuesta.json();
          })
          .then(function(info){
            console.log(info);
            consultarTareas();
          })
          .catch(function(error){
            return error;
          })
        }
      });
  }

  // function tareaFinalizadas(tarea){


// }

  
  

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
    main.addEventListener('click',function(e){
      if(e.target.classList.contains("borrar")){
        let idTarea=e.target.id;

        let settings={
          method:"DELETE",
          headers:{
            "authorization":JSON.parse(key)
          } 
        }
        fetch(`https://todo-api.ctd.academy/v1/tasks/${idTarea}`,settings)
        .then(function(response){
          return response.json();
        })
        .then(function(info){
          console.log(info);
          consultarTareas();
          
        })
        .catch(function(error){
          return error+"Esto es un error";
        })
      }
    })
  };

});