"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonSprite = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
let searchPokemon = 1;
const fetchPokemon = (pokemon) => __awaiter(void 0, void 0, void 0, function* () {
    const APIResponse = yield fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = yield APIResponse.json();
        return data;
    }
});
const renderPokemon = (pokemon) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetchPokemon(pokemon);
    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonSprite.style.display = 'block';
        btnNext.style.display = 'block';
        btnPrev.style.display = 'block';
        pokemonSprite.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    }
    else {
        pokemonName.innerHTML = 'Pokemon not found!';
        pokemonNumber.innerHTML = ':(';
        pokemonSprite.style.display = 'none';
        btnNext.style.display = 'none';
        btnPrev.style.display = 'none';
    }
});
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});
btnPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});
btnNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});
renderPokemon(searchPokemon);
