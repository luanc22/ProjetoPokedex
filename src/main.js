const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number'); 
const pokemonSprite = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let searchPokemon = 1;

var audio = document.getElementById("bgmusic");
audio.volume = 0.1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);  

    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }


}

const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonSprite.style.display = 'block';
        btnNext.style.display = 'block';
        btnPrev.style.display = 'block';
        pokemonSprite.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input.value = '';
        searchPokemon = data.id;
    }
    else{
        pokemonName.innerHTML = 'Pokemon not found!';
        pokemonNumber.innerHTML = ':(';
        pokemonSprite.style.display = 'none';
        btnNext.style.display = 'none';
        btnPrev.style.display = 'none';
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

btnNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);