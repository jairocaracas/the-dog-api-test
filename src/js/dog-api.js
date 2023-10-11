import axios from 'axios';
import Notiflix from 'notiflix';

let loader = document.querySelector('.loader');
let loaderText = document.querySelector('.loader-text');

let errorText = document.querySelector('.error');

let svgContainer = document.getElementById('dog-loader');
let animItem = bodymovin.loadAnimation({
  wrapper: svgContainer,
  animType: 'svg',
  loop: true,
  path: 'https://lottie.host/23be4f03-79cb-42d7-b979-6e90521c5c97/X6019IAHPz.json',

  //path: 'dogLoader.json',
});

axios.defaults.headers.common['x-api-key'] =
  'live_VtJA8KTxP8u7DarDVCtrEIkxfR87Iv5mrPKZK6fTAQm4nyIeimflv6I8vUACJUCz';

async function getDogs() {
  svgContainer.style.display = 'block';
  loader.style.display = 'none';

  try {
    const response = await axios.get('https://api.thedogapi.com/v1/breeds');
    return response;
  } catch (error) {
    loader.style.display = 'none';
    loaderText.style.display = 'none';

    svgContainer.style.display = 'none';
    Notiflix.Notify.warning('Error: ' + error);
    errorText.style.display = 'inline-block';
  }
}

async function getDogByBreed(id) {
  svgContainer.style.display = 'block';

  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/images/search?breed_ids=${id}`
    );
    console.log(response);
    return response;
  } catch (error) {
    Notiflix.Notify.warning('Error: ' + error);

    errorText.style.display = 'inline-block';
  } finally {
    loader.style.display = 'none';
    loaderText.style.display = 'none';
    svgContainer.style.display = 'none';
  }
}

export { getDogs, getDogByBreed };
