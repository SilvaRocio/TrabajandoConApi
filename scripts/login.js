window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form=document.querySelector("form");
    // const nombre= this.document.getElementById("inputNombre");
    // const apellido= this.document.getElementById("inputApellido");
    const correo= document.getElementById("inputEmail");
    const password= document.getElementById("inputPassword");
    



    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
            event.preventDefault();

            const dataUsuarios={
                email:"",
                password:""};
        if (validarEmail(correo.value)&&validarContrasenia(password.value)){
                dataUsuarios.email=correo.value;
                dataUsuarios.password=password.value
                let settings={
                     method:"POST",
                    body: JSON.stringify(dataUsuarios),
                    headers: {
                    "Content-Type": "application/json"
                     }
                 }
            

            realizarLogin(settings);
        }else{
            alert("Los datos estan mal cargador");
        }
    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {
       
        fetch("https://todo-api.ctd.academy/v1/users/login",settings)
        .then(function (response){
            if(!response.ok){
                alert("Los datos son incorrectos");
            }
             return response.json();
        })
        .then(function (info){
            if (info.jwt){
                console.log(info);
                localStorage.setItem("jwt",JSON.stringify(info.jwt));
                location.replace("./mis-tareas.html");
            }
        })
        .catch(function(e){
            console.log(e);
        })
        
    };

});