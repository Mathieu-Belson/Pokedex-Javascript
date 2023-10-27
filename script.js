const pokemonCount = 151;
var pokedex = {}; // { 1 : { "name" : "bulsaur", "img" : url, "type" : ["grass, "poison"], "description" : "blabla"} }

// when the page loads, get the first pokemon
window.onload = async function() {
    // getPokemon(1);
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
        // <div id="1" class="pokemon-name">BULBASAUR</div>
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener("click", updatePokemon);
        document.getElementById("pokemon-list").appendChild(pokemon);
    }

    console.log(pokedex);
}

// async is used to make the function asynchronous. Because we are using await inside the function, we need to use async.
async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    // to get the response from the url. await is used to wait for the response to avoid errors
    let res = await fetch (url); 

    // to get the json data
    let pokemon = await res.json(); 

    // console.log(pokemon);

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();

    // console.log(pokemonDesc);
    pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"];

    pokedex[num] = { "name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc }

}

function updatePokemon() {
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];


    // clear previous pokemon types on the left side
    let typesDiv = document.getElementById("pokemon-types");
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }

    // update types

    let types = pokedex[this.id]["types"];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]); // adds background color and font color
        typesDiv.append(type);
    }

    // update description
    document.getElementById("pokemon-decription").innerText = pokedex[this.id]["desc"];
}