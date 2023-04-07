/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
    let campoTexto=/^[A-Z+ " "]+$/i;
    if (campoTexto.test(texto)){
        return true;
    }else{
        return false;
    }
    
}

function normalizarTexto(texto) {
        texto.toUpperCase();
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    normalizarEmail(email);
    let validMail = /^\w+([.-_+]?\w+)@\w+([.-]?\w+)(.\w{2,10})+$/;
    if(validMail.test(email) && email != null){
        return true;
    }else {
        return false;
    };
};

function normalizarEmail(email) {
    // email.toLowerCase();
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
    
    if (contrasenia.length>3 && contrasenia.length<=15&& contrasenia!=null){
        return true;
    }else{
        return false;
    }
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
    if (contrasenia_1===contrasenia_2){
        return true;
    }else{
        return false;
    }
}

