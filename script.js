const pokemonCount = 151;
var pokemon = {}; // { 1 : { "name" : "bulsaur", "img" : url, "type" : ["grass, "poison"], "description" : "blabla"} }

// when the page loads, get the first pokemon
window.onload = async function() {
    getPokemon(1);

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

