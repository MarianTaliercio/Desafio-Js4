const form = document.getElementById("form");
const input = document.getElementById("input");
const submit = document.getElementById("submit");
const error = document.querySelector(".msgError");
const cards = document.querySelector(".cardContainer");

let pokemones = JSON.parse(localStorage.getItem("pokemones")) || [];

const saveLocalStorage = (pokemonList) =>{
    localStorage.setItem("pokemones", JSON.stringify(pokemonList))
}



const buscarPokemon = async (e) => {
    e.preventDefault();

    let idPokemon = input.value;
    const fetchedPokemon = await requestAPI(idPokemon);


    if(!fetchedPokemon){
        alert('no existe ese pokemon')
        return;
    }


    if(!idPokemon){
        error.textContent = "Ingresa un número de Pokemon"
        return;
    }else if(pokemones.some(pokemon => pokemon.id === fetchedPokemon.id)){
        error.textContent = "Ya estas viendo este Pokemon"
        return;
    }

    // pokemones = [fetchedPokemon];
    pokemones = [fetchedPokemon, ... pokemones];
    error.textContent = "";
    renderCard(pokemones);
    saveLocalStorage(pokemones);
    form.reset();
}


const renderCard = pokemonList => {
    cards.innerHTML = pokemonList.map(pokemon => createHTML(pokemon)).join("");
}




let colorPokemon = {
    electric: "#FFEA70",
    normal: "#B09398",
    fire: "#FF675C",
    water: "#0596C7",
    ice: "#AFEAFD",
    rock: "#999799",
    flying: "#7AE7C7",
    grass: "#4A9681",
    psychic: "#FFC6D9",
    ghost: "#561D25",
    bug: "#A2FAA3",
    poison: "#795663",
    ground: "#D2B074",
    dragon: "#DA627D",
    steel: "#1D8A99",
    fighting: "#2F2F2F",
    fairy: "#da625d",
    dark: "#808080",
    default: "#2A1A1F",
  }  

//funciones para convertir peso y altura
const convertirHeigth = metro =>{
    let altura = metro / 10;
    return altura;
}

const convertirWeight = kilos =>{
    let peso = kilos / 10;
    return peso;
}

const createHTML = pokemon =>{

    const imgPokemon = pokemon.sprites.front_default 

    const typePokemon = pokemon.types[0].type.name;
    return `
    <div class="cardPokemon" style="background-color: ${colorPokemon[typePokemon]}">
    
        <div class="informacion">        
            <div class="id-name">
                <div class="numero">${pokemon.id}</div>
                <h2 class="pkmName">${pokemon.name}</h2>
            </div>
            <div class="informacion2">
                <img src="${imgPokemon}" class="img-pokemon" alt="Pokemon"/>
                <p class="type"> ${pokemon.types[0].type.name}</p>
                <p class="move">Moves: ${pokemon.moves[7].move.name}</p>
                <p class="p">Height: ${convertirHeigth(pokemon.height)} m</p>
                <p class="p">Weight: ${convertirWeight(pokemon.weight)} kg</p>
            </div>
        </div>
    </div>`
}

// const setCardColor = array => {
//     const color = colorPokemon[array[0].types[0].type.name];

//     cardContainer.style.backgroundColor = ${color};
// }

const init = () => {
  form.addEventListener( "submit", buscarPokemon)
  renderCard(pokemones);
};

init();