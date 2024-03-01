//TODO: https://random-word-api.herokuapp.com/word?length=5&lang=es

const V = '#79b851';
const A = '#f3c237';
const G = '#a4aec4';

let palabra = "";
let tieneVidas = 6;
let listado = []; // historico de intentos
let diccionario = [
    "Higos",
    "miedo",
    "hogar",
    "hijos",
    "Stere",
    "venta",
    "cosas",
    "Fadge",
    "tetas",
    "secos",
    "Monto",
    "dagas",
    "error",
    "friki",
    "Banda",
    "truco",
    "becas",
    "cedro",
    "nariz",
    "Sneap",
    "Temas",
    "Paten",
    "ritmo",
    "ricos",
    "guiso",
    "vista",
    "Horla",
    "cielo",
    "rocio",
    "cielo",
    "sueño",
    "Folia",
    "Reefy",
    "vigas",
    "pinza",
    "polvo",
    "tarde",
    "salud",
    "sedes",
    "demas",
    "tipos",
    "tales",
    "nubes",
    "velas",
    "raros",
    "juego",
    "latex",
    "final",
    "Caber",
    "surge"
];

const INPUT = document.getElementById("guess-input");
const BOTON = document.getElementById("guess-button");
const AVISO = document.getElementById("guesses");
const GRILLA = document.getElementById("grid");


buscarPalabra();
botonIntentar();

BOTON.addEventListener("click", () => {
    if (!tieneVidas) {
        reintentar();
    }
    const INTENTO = leerIntento();
    if (palabra === INTENTO) {
        verificar(palabra, INTENTO);
        terminar("Ganaste!");
        return;
    }
    if (INTENTO.length <= 0) {
        avisar("Ingrese su intento!");
        limpiar();
        return;
    }
    verificar(palabra, INTENTO);
});

INPUT.oninput = function () {
    if (this.value.trim().length > 5) {
        this.value = this.value.trim().slice(0, 5);
    }
}

function buscarPalabra() {
    fetch("https://random-word-api.herokuapp.com/word?length=5&lang=es")
        .then(response => response.json())
        .then(response => {
            palabra = response[0].toUpperCase();
        })
        .catch(err => {
            palabra = palabraAleatoria();
        });
}

function palabraAleatoria() {
    return diccionario[Math.floor(Math.random * diccionario.length)].toUpperCase();
}

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
        terminar("Perdiste!<br><i>" + palabra + "</i>");
        return;
    }
    limpiar();
}

function reintentar() {
    tieneVidas = 6;
    listado = [];
    buscarPalabra();
    limpiarGrilla();
    terminar("Empecemos otra vez!");
    botonIntentar();
}

function terminar(msg) {
    avisar(msg);
    limpiar();
    botonReintentar();
}

function avisar(msg) {
    AVISO.innerHTML = "<h1>" + msg + "</h1>";
    setTimeout(() => {
        AVISO.innerHTML = "";
    }, 30000);
}

function limpiar() {
    INPUT.value = "";
    INPUT.focus();
}

function limpiarGrilla() {
    GRILLA.innerHTML = "";
}

function botonIntentar() {
    BOTON.style.backgroundColor = "#0cbaba";
    BOTON.innerHTML = "Intentar";
}

function botonReintentar() {
    BOTON.style.backgroundColor = V;
    BOTON.innerHTML = "Reintentar";
}