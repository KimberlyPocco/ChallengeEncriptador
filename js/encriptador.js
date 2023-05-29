var mensajeTextarea = document.getElementById("mensaje");
var mensajeCopiadoTextarea = document.getElementById("mensajeCopiado");

var mensajeNoEncontrado = document.querySelector(".mensajeNoEncontrado");

var botonEncriptar = document.querySelector('.btn-encriptar');
var botonDesencriptar = document.querySelector('.btn-desencriptar');
var botonCopiar = document.querySelector(".btn-copiar");

document.addEventListener("DOMContentLoaded", verificarEstadoInicial);
botonEncriptar.addEventListener("focus", ocultarMostrarBotonCopiar);
botonDesencriptar.addEventListener("focus", ocultarMostrarBotonCopiar);

var mensajeCopiado = "";

function verificarEstadoInicial() {
    if (mensajeTextarea.value.trim() === '') {
        mensajeCopiadoTextarea.style.backgroundImage = "url('./img/munieco.svg')";
    } else {
        mensajeCopiadoTextarea.style.backgroundImage = 'none';
    }
}


function ocultarMostrarBotonCopiar(){
    if(mensajeTextarea.value.trim() == ""){
        botonCopiar.style.display = "none";
        mensajeNoEncontrado.style.display = "block";
    }
    else{
        botonCopiar.style.display = "block";
        mensajeNoEncontrado.style.display = "none";   
    }
}

botonCopiar.addEventListener("click", () => {
    mensajeCopiado = mensajeCopiadoTextarea.value;
    copiarMensaje();
});

function copiarMensaje() {
    const textoCopiar = mensajeCopiadoTextarea.value;
    navigator.clipboard.writeText(textoCopiar)
    
}
function mostrarTextoEncriptado(textoEncriptado) {
    mensajeCopiadoTextarea.value = textoEncriptado;
    if (textoEncriptado.trim() === '') {
        mensajeCopiadoTextarea.style.backgroundImage = "url('./img/munieco.svg')";
    } else {
        mensajeCopiadoTextarea.style.backgroundImage = 'none';
    }
}


function mostrarTextoDesencriptado(textoDesencriptado) {
    mensajeCopiadoTextarea.value = textoDesencriptado;
    if (textoDesencriptado.trim() === '') {
        mensajeCopiadoTextarea.style.backgroundImage = "url('./img/munieco.svg')";
    } else {
        mensajeCopiadoTextarea.style.backgroundImage = 'none';
    }
}

var codigo = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat'
};

function encriptar() {
    var texto = mensajeTextarea;
    let textoEncriptado = "";
    for ( let i = 0; i < texto.value.length; i++) {
        if (texto.value.charAt(i) in codigo) {
            textoEncriptado = textoEncriptado + codigo[texto.value.charAt(i)];
        } else {
            textoEncriptado = textoEncriptado + texto.value.charAt(i);
        }
    }

    mostrarTextoEncriptado(textoEncriptado);
    mensajeTextarea.value = ""
}


var textoDesencriptado = "";
var i=0,iAux, encontrado;

function verificar(texto){
    if(texto.value.charAt(i) in codigo &&
       texto.value.length - i >= codigo[texto.value.charAt(i)].length){
        iAux = i;
        for(iAux; iAux-i < codigo[texto.value.charAt(i)].length; iAux++){
            if(texto.value.charAt(iAux) != codigo[texto.value.charAt(i)].charAt(iAux-i)){
                encontrado = 0;
                break;
            }
            encontrado = 1;
        }
        if(encontrado){ 
            textoDesencriptado += texto.value.charAt(i); 
            i=iAux-1; 
        }
    }
}


function desencriptar(){
    var texto = mensajeTextarea;
    while(i < texto.value.length){
        console.log(i)
        encontrado = 0;
        verificar(texto);
        if(!encontrado)
            textoDesencriptado += texto.value.charAt(i);
        i++;
    }
    mostrarTextoDesencriptado(textoDesencriptado);
    i = 0;
    textoDesencriptado = "";
}

botonEncriptar.onclick = encriptar;
botonDesencriptar.onclick = desencriptar;