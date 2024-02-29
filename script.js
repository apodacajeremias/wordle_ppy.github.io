const V = '#79b851';
const A = '#f3c237';
const G = '#a4aec4';

const PALABRA = "APPLE";
let tieneVidas = 6;

const INPUT = document.getElementById("guess-input");
const BOTON = document.getElementById("guess-button");
const AVISO = document.getElementById("guesses");
const GRILLA = document.getElementById("grid");

BOTON.addEventListener("click", () => {
    const INTENTO = leerIntento();
    if (PALABRA === INTENTO) {
        terminar("Ganaste!");
        // TODO: mostrar el mensaje
        // TODO: volver a empezar (restaurar vidas, cambiar palabra, vaciar intentos)
        return;
    }
    verificar(PALABRA, INTENTO);
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
    return INPUT.value.toUpperCase();
}

function verificar(palabra, intento) {
    const row = document.createElement("div");
    row.className = "row";
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
    AVISO.innerHTML = "<h1>" + msg + "</h1>";
}