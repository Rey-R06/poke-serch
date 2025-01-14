let conterForm = document.getElementById("conterForm")


conterForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita el recargado automático del formulario
    fetchData();
})

const contenedorHtml = document.getElementById("contenedor");
contenedorHtml.classList.add("contenedor");

//Esta funtion buscara el pokemon en la api
async function fetchData() {
    try{
let namePokemon = document.getElementById("input").value.trim().toLowerCase();
        if (namePokemon) {
            //importante: las api no tienen un metodo de busqueda general pero cada api tiene su forma de busqueda rapida
                const url ="https://pokeapi.co/api/v2/pokemon/"+namePokemon;
                const respuesta = await fetch(url); // Realizar la solicitud

            //convertir la respuesta a JSON
            const pokemon = await respuesta.json();

            let nombre = pokemon.name;
            let img = pokemon.sprites.front_default;

            mostrarPokemon(nombre, img);     
        } else{
            contenedorHtml.style.visibility = "visible";
            contenedorHtml.style.height = "150px"
            contenedorHtml.innerHTML = `<button onclick="quitar()" translate="no">X</button><p>ingrese un nombre.</p>`;
        }
    }catch(error2){
        console.log("pokemon no encontrado");
        contenedorHtml.style.visibility = "visible";
        contenedorHtml.style.height = "150px"
        contenedorHtml.innerHTML = `<button onclick="quitar()" translate="no">X</button><p>Pokémon no encontrado.</p>`;

        console.log(error2)//muestra si hay algun error  
    }
}

//Esta funtion mostrara el pokemon buscado
function mostrarPokemon(name, img) {
    contenedorHtml.innerHTML = "";
    contenedorHtml.style.height = ""
    contenedorHtml.style.visibility = "visible";
    let contenedor = document.createElement("div");
    contenedorHtml.classList.add("contenedorPokemon");
    contenedor.innerHTML = `<button onclick="quitar()" translate="no">X</button><h2>${name.toUpperCase()}</h2><img src="${img}" width="400">  `;
    
    contenedorHtml.appendChild(contenedor);
}

function quitar() {
    let namePokemon = document.getElementById("input");
    namePokemon.value = "";
    namePokemon.placeholder = "Name Pokémon";
    contenedorHtml.innerHTML = "";
    contenedorHtml.style.visibility = "hidden";
}
