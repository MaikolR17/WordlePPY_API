let intentos = 6;
let diccionario = ["Pausa", "Lista", "Comer", "Beber", "Tomar", "campo", "calma"];
let palabra = diccionario[Math.floor(Math.random() * diccionario.length)]; 
palabra = palabra.toUpperCase();
let contenedor = document.getElementById("adivinar");
let listado = [];
let Api = {"clave":"valor", "clave1": "valor1"}
const BOTON = document.getElementById("boton-adivinar");
const REINICIAR = document.getElementById("boton-reiniciar");
const INPUT = document.getElementById("input-adivinar");
const VALOR = INPUT.value;
const GRID = document.getElementById("red");
BOTON.addEventListener("click", intentar);

console.log("Diccionario", Api);
console.log("Diccionario2", Api["Clave1"]);

    fetch("https://random-word-api.herokuapp.com/word?lang=es&length=5")
        .then((response) => response.json())
        .then((response) => {
        console.log("desde API", response);
        palabra = response[0].toUpperCase();
        console.log(palabra);
        })
        .catch((err) => {
        //en esta sección incluir las instrucciones para obtener la palabra de forma aleatoria de la lista de palabras que yo cree.
        console.log("Ocurrió un error");
     });

REINICIAR.addEventListener("click", () => { 
    location.reload();
    })

function intentar() {
    const INTENTO = leerIntento();
    const ROW = document.createElement('div');
    ROW.className = 'row';
    if (INTENTO.length != 5) {
        return
    }
    const BORRAR = INPUT.value = "";
    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i] === palabra[i]) { //VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#79b851';
        } else if (palabra.includes(INTENTO[i])) { //AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#f3c237';
        } else { //GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#a4aec4';
        }
        ROW.appendChild(SPAN)
    }
    GRID.appendChild(ROW)
    
    if (INTENTO === palabra) {
        terminar("<h1>GANASTE!😀</h1>");
        return
    }
    intentos--
    if (intentos == 0) {
        terminar("<h1>PERDISTE!🥺</h1>")
    }
}

function terminar(mensaje) {
    const INPUT = document.getElementById("input-adivinar");
    INPUT.disabled = true;
    BOTON.disabled = true;
    contenedor.innerHTML = mensaje;
}

function leerIntento() {
    let intento = document.getElementById("input-adivinar");
    intento = intento.value;
    intento = intento.toUpperCase();
    console.log(intento)
    return intento;
}
/* for (let i in palabra) {
    console.log(palabra[i]);
} */




