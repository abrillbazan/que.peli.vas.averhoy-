
/* ========================================
   🎬 ¿QUÉ VEMOS HOY? - FUNCIONALIDADES
======================================== */

// ========================================
// 🌙 MODO OSCURO Y MODO CLARO
// ========================================

const botonModoOscuro = document.getElementById("modoOscuro");

let modoOscuro = true;

botonModoOscuro.addEventListener("click", () => {

    modoOscuro = !modoOscuro;

    if (modoOscuro) {

        // VOLVER AL MODO OSCURO

        document.documentElement.style.setProperty(
            "--fondo",
            "#0f0b1a"
        );

        document.documentElement.style.setProperty(
            "--fondo-secundario",
            "#19132b"
        );

        document.documentElement.style.setProperty(
            "--tarjeta",
            "#211a36"
        );

        document.documentElement.style.setProperty(
            "--texto",
            "#e9e5f5"
        );

        document.documentElement.style.setProperty(
            "--texto-secundario",
            "#b8b0ce"
        );

        document.documentElement.style.setProperty(
            "--blanco",
            "#ffffff"
        );

        botonModoOscuro.textContent = "☀️ Modo claro";

        document.body.classList.remove("modo-claro");

    } else {

        // ACTIVAR EL MODO CLARO

        document.documentElement.style.setProperty(
            "--fondo",
            "#f5f3ff"
        );

        document.documentElement.style.setProperty(
            "--fondo-secundario",
            "#e9e4ff"
        );

        document.documentElement.style.setProperty(
            "--tarjeta",
            "#ffffff"
        );

        document.documentElement.style.setProperty(
            "--texto",
            "#27203b"
        );

        document.documentElement.style.setProperty(
            "--texto-secundario",
            "#625b76"
        );

        document.documentElement.style.setProperty(
            "--blanco",
            "#211a36"
        );

        botonModoOscuro.textContent = "🌙 Modo oscuro";

        document.body.classList.add("modo-claro");

    }

});


// ========================================
// 🎬 BASE DE DATOS DE PELÍCULAS Y SERIES
// ========================================

const contenido = [

    {
        titulo: "Interestelar",
        tipo: "Película",
        genero: ["ciencia-ficcion", "drama"],
        duracion: 169,
        año: 2014,
        actores: [
            "matthew mcconaughey",
            "anne hathaway",
            "jessica chastain"
        ],
        descripcion:
            "Un grupo de exploradores viaja por el espacio en busca de un futuro para la humanidad."
    },

    {
        titulo: "Enola Holmes",
        tipo: "Película",
        genero: ["misterio", "aventura"],
        duracion: 123,
        año: 2020,
        actores: [
            "millie bobby brown",
            "henry cavill",
            "louis partridge"
        ],
        descripcion:
            "Una joven detective se embarca en una aventura para encontrar a su madre."
    },

    {
        titulo: "Jumanji",
        tipo: "Película",
        genero: ["aventura", "accion", "comedia"],
        duracion: 119,
        año: 2017,
        actores: [
            "dwayne johnson",
            "kevin hart",
            "jack black",
            "karen gillan"
        ],
        descripcion:
            "Un grupo de jóvenes entra en un videojuego lleno de desafíos y aventuras."
    },

    {
        titulo: "Stranger Things",
        tipo: "Serie",
        genero: ["ciencia-ficcion", "misterio", "terror"],
        duracion: 50,
        año: 2016,
        actores: [
            "millie bobby brown",
            "finn wolfhard",
            "winona ryder",
            "david harbour"
        ],
        descripcion:
            "Un grupo de amigos se enfrenta a misterios sobrenaturales en un pequeño pueblo."
    },

    {
        titulo: "The Vampire Diaries",
        tipo: "Serie",
        genero: ["drama", "fantasia", "romance"],
        duracion: 45,
        año: 2009,
        actores: [
            "ian somerhalder",
            "nina dobrev",
            "paul wesley"
        ],
        descripcion:
            "Una historia de vampiros, amistades y relaciones en un pueblo lleno de secretos."
    },

    {
        titulo: "Wednesday",
        tipo: "Serie",
        genero: ["comedia", "misterio", "fantasia"],
        duracion: 45,
        año: 2022,
        actores: [
            "jenna ortega",
            "catherine zeta-jones",
            "christina ricci"
        ],
        descripcion:
            "Wednesday investiga misterios mientras se adapta a su vida en una academia peculiar."
    },

    {
        titulo: "El diario de Noah",
        tipo: "Película",
        genero: ["romance", "drama"],
        duracion: 123,
        año: 2004,
        actores: [
            "ryan gosling",
            "rachel mcadams"
        ],
        descripcion:
            "Una historia de amor que atraviesa los años y las dificultades de la vida."
    },

    {
        titulo: "Jumanji: Bienvenidos a la jungla",
        tipo: "Película",
        genero: ["accion", "aventura", "comedia"],
        duracion: 119,
        año: 2017,
        actores: [
            "dwayne johnson",
            "kevin hart",
            "jack black",
            "karen gillan"
        ],
        descripcion:
            "Cuatro adolescentes quedan atrapados en un videojuego y deben superar sus desafíos."
    },

    {
        titulo: "La máscara",
        tipo: "Película",
        genero: ["comedia"],
        duracion: 101,
        año: 1994,
        actores: [
            "jim carrey",
            "cameron diaz"
        ],
        descripcion:
            "Un hombre encuentra una máscara mágica que transforma completamente su personalidad."
    },

    {
        titulo: "Coraline",
        tipo: "Película",
        genero: ["fantasia", "terror", "misterio"],
        duracion: 100,
        año: 2009,
        actores: [
            "dakota fanning",
            "teri hatcher"
        ],
        descripcion:
            "Una niña descubre una misteriosa versión alternativa de su hogar."
    }

];


// ========================================
// 🎯 ELEMENTOS DEL FORMULARIO
// ========================================

const formulario = document.getElementById(
    "formularioRecomendador"
);

const generoSelect = document.getElementById("genero");

const duracionSelect = document.getElementById("duracion");

const actorInput = document.getElementById("actor");

const resultado = document.getElementById("resultado");


// ========================================
// 🔤 NORMALIZAR TEXTO
// ========================================

function normalizarTexto(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

}


// ========================================
// ⏱️ COMPROBAR DURACIÓN
// ========================================

function coincideDuracion(pelicula, duracion) {

    if (duracion === "cualquiera") {
        return true;
    }

    if (duracion === "corta") {
        return pelicula.duracion < 90;
    }

    if (duracion === "media") {
        return pelicula.duracion >= 90 &&
            pelicula.duracion <= 120;
    }

    if (duracion === "larga") {
        return pelicula.duracion > 120;
    }

    return true;

}


// ========================================
// 🔎 BUSCAR RECOMENDACIONES
// ========================================

function buscarRecomendaciones(genero, duracion, actor) {

    const actorNormalizado = normalizarTexto(actor);

    let resultados = contenido.filter((pelicula) => {

        // COMPROBAR GÉNERO

        const coincideGenero =
            pelicula.genero.includes(genero);

        // COMPROBAR DURACIÓN

        const coincideTiempo =
            coincideDuracion(pelicula, duracion);

        // COMPROBAR ACTOR

        const coincideActor =
            actorNormalizado === "" ||
            pelicula.actores.some((nombre) =>
                normalizarTexto(nombre).includes(actorNormalizado)
            );

        return coincideGenero &&
            coincideTiempo &&
            coincideActor;

    });

    return resultados;

}


// ========================================
// 🎬 MOSTRAR UNA RECOMENDACIÓN
// ========================================

function mostrarRecomendacion(pelicula) {

    resultado.innerHTML = "";

    const titulo = document.createElement("h3");

    titulo.textContent =
        "🍿 ¡Tu recomendación es " +
        pelicula.titulo +
        "!";

    const tipo = document.createElement("p");

    tipo.textContent =
        "🎬 Tipo: " + pelicula.tipo;

    const genero = document.createElement("p");

    genero.textContent =
        "🎭 Género: " +
        pelicula.genero.join(", ");

    const duracion = document.createElement("p");

    duracion.textContent =
        pelicula.tipo === "Serie"
            ? "⏱️ Duración aproximada por episodio: " +
              pelicula.duracion +
              " minutos"
            : "⏱️ Duración: " +
              pelicula.duracion +
              " minutos";

    const año = document.createElement("p");

    año.textContent =
        "📅 Año: " + pelicula.año;

    const descripcion = document.createElement("p");

    descripcion.textContent =
        "✨ " + pelicula.descripcion;

    resultado.append(
        titulo,
        tipo,
        genero,
        duracion,
        año,
        descripcion
    );

}


// ========================================
// ❌ MOSTRAR MENSAJE SIN RESULTADOS
// ========================================

function mostrarSinResultados() {

    resultado.innerHTML = "";

    const titulo = document.createElement("h3");

    titulo.textContent =
        "😕 No encontramos una recomendación";

    const mensaje = document.createElement("p");

    mensaje.textContent =
        "Probá cambiar el género, la duración " +
        "o el nombre del actor.";

    resultado.append(titulo, mensaje);

}


// ========================================
// 🔎 ENVIAR FORMULARIO
// ========================================

formulario.addEventListener("submit", (evento) => {

    // EVITAR QUE LA PÁGINA SE RECARGUE

    evento.preventDefault();

    const genero = generoSelect.value;

    const duracion = duracionSelect.value;

    const actor = actorInput.value;

    // VALIDAR EL GÉNERO

    if (genero === "") {

        resultado.innerHTML =
            "<h3>⚠️ Elegí un género</h3>" +
            "<p>Seleccioná qué tipo de contenido querés ver.</p>";

        generoSelect.focus();

        return;

    }

    // VALIDAR LA DURACIÓN

    if (duracion === "") {

        resultado.innerHTML =
            "<h3>⚠️ Elegí una duración</h3>" +
            "<p>Seleccioná cuánto tiempo tenés disponible.</p>";

        duracionSelect.focus();

        return;

    }

    // BUSCAR CONTENIDO

    let recomendaciones = buscarRecomendaciones(
        genero,
        duracion,
        actor
    );

    // SI NO HAY RESULTADOS CON ACTOR,
    // AVISAR AL USUARIO SIN CAMBIAR SUS PREFERENCIAS

    if (recomendaciones.length === 0) {

        mostrarSinResultados();

        return;

    }

    // ELEGIR UNA RECOMENDACIÓN AL AZAR

    const indiceAleatorio =
        Math.floor(Math.random() * recomendaciones.length);

    const recomendacion =
        recomendaciones[indiceAleatorio];

    // MOSTRAR EL RESULTADO

    mostrarRecomendacion(recomendacion);

    // DESPLAZAR HACIA EL RESULTADO

    resultado.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


// ========================================
// ✨ MENSAJE INICIAL
// ========================================

console.log(
    "🎬 ¡Bienvenido a ¿Qué vemos hoy?!"
);

console.log(
    "🍿 El recomendador está listo para funcionar."
);
