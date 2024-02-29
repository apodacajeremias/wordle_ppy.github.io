//TODO : se podría bloquear el botón mientras no haya 5 letras
//TODO: https://random-word-api.herokuapp.com/word?length=5&lang=es
// https://random-word-api.vercel.app/
// TODO: en input evitar que ingresen numeros

const V = '#79b851';
const A = '#f3c237';
const G = '#a4aec4';

let palabra = "";
let tieneVidas = 6;
let listado = []; // historico de intentos
let diccionario = { "clave": "valor" };

fetch("https://random-word-api.herokuapp.com/word?length=5&lang=es")
    .then(response => response.json())
    .then(response => {
        console.log(response[0]);
        palabra = response[0].toUpperCase();
    })
    .catch(err => {
        // incluir metodo para obtener palabra de lista offline
        console.error(err);
    });


const INPUT = document.getElementById("guess-input");
const BOTON = document.getElementById("guess-button");
const AVISO = document.getElementById("guesses");
const GRILLA = document.getElementById("grid");

BOTON.addEventListener("click", () => {
    const INTENTO = leerIntento();
    if (palabra === INTENTO) {
        terminar("Ganaste!");
        // TODO: mostrar el mensaje
        // TODO: volver a empezar (restaurar vidas, cambiar palabra, vaciar intentos)
        return;
    }
    verificar(palabra, INTENTO);
});

function crearLetraEnGrilla(row, letra, color) {
    const span = document.createElement("span");
    span.className = "letter";
    span.innerHTML = letra;
    span.style.background = color;
    row.appendChild(span);
    GRILLA.appendChild(row);
}

function leerIntento() {
    return INPUT.value.toUpperCase().trim();
}

function verificar(palabra, intento) {
    console.log("Verificando:", intento);
    if (intento.length != 5) {
        alert("La palabra debe tener 5 caracteres");
        return;
    }
    const row = document.createElement("div");
    row.className = "row";
    listado.push(intento);
    for (const i in intento) {
        if (intento[i] == palabra[i]) {
            crearLetraEnGrilla(row, intento[i], V);
        } else if (palabra.includes(intento[i])) {
            crearLetraEnGrilla(row, intento[i], A);
        } else {
            crearLetraEnGrilla(row, intento[i], G);
        }
    }
    tieneVidas--;
    if (!tieneVidas) {
        // TODO: mostrar el mensaje
        // TODO: volver a empezar (restaurar vidas, cambiar palabra, vaciar intentos)
        // TODO: 

        terminar("Perdiste!");
        return;
    }
}

function terminar(msg) {
    tieneVidas = 6;
    listado = [];
    AVISO.innerHTML = "<h1>" + msg + "</h1>";
}