const pokemonCount = 151;
var pokemon = {}; // { 1 : { "name" : "bulsaur", "img" : url, "type" : ["grass, "poison"], "description" : "blabla"} }

// when the page loads, get the first pokemon
window.onload = function() {
    getPokemon(1);
}

function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    // to get the response from the url
    let res = fetch (url); 

    // to get the json data
    let pokemon = res.json(); 

    // to get the name of the pokemon
    console.log(pokemon);

}