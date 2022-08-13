const pokemonName =document.querySelector('.pokemon_name');
const pokemonNumber =document.querySelector('.pokemon_number');
const pokemonImg =document.querySelector('.pokemon_image');
const pokemonForm =document.querySelector('.form');
const pokemonInput =document.querySelector('.input_search');
const pokemonPrev =document.querySelector('.bnt-prev');
const pokemonNext =document.querySelector('.bnt-next');

let searchPokemon = 1;
const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200){
    const data = await APIResponse.json();
    return data;
    }
}


const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Cargando...'
    const data = await fetchPokemon(pokemon);

    if(data){
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    searchPokemon =data.id;
    } else{
    pokemonName.innerHTML = 'no existe :C';
    pokemonNumber.innerHTML = "";
    }
}
 pokemonForm.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(pokemonInput.value.toLowerCase());
    pokemonInput.value="";
 })

 pokemonPrev.addEventListener('click', () => {
    if(searchPokemon == 1){
    renderPokemon(searchPokemon);
    }else{
        searchPokemon -=1;
        renderPokemon(searchPokemon);
    }
 })

 pokemonNext.addEventListener('click', () => {
    searchPokemon +=1;
    renderPokemon(searchPokemon);
    
})
 renderPokemon(searchPokemon)