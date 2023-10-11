import { getDogs, getDogByBreed } from './js/dog-api';
import SlimSelect from 'slim-select';

let list = document.querySelector('.breed-select');
let loader = document.querySelector('.loader');
let loaderText = document.querySelector('.loader-text');

let error = document.querySelector('.error');

let dogInfo = document.querySelector('.dog-info');

async function fetchdogs() {
  const dogs = await getDogs();

  let renderData = dogs.data.map(value => {
    return { text: value.name, value: value.id };
  });

  new SlimSelect({
    select: list,
    data: renderData,
  });
}

fetchdogs();

function detailEmpty(description) {
  if (description !== undefined) {
    return `<p>${description}</p>`;
  }
  return ' ';
}

async function fetchDogByBreed(e) {
  error.style.display = 'none';

  loader.style.display = 'inline-block';
  loaderText.style.display = 'inline-block';

  dogInfo.innerHTML = ' ';
  const breed = await getDogByBreed(e.target.value);
  let breedInfo = breed.data[0];
  let renderImg =
    `
  <img src="${breedInfo.url}" style="margin: 0 auto;" loading="lazy">
  <h2>${breedInfo.breeds[0].name}</h2>` +
    detailEmpty(breedInfo.breeds[0].description) +
    `<h3>Temperament:</h3>
  <p>${breedInfo.breeds[0].temperament}</p>
  `;
  dogInfo.innerHTML += renderImg;

  console.log(breedInfo.breeds[0].name);
}

list.addEventListener('change', fetchDogByBreed);
