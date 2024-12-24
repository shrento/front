import 'flickity/dist/flickity.min.css';
import Flickity from 'flickity';

const slider = new Flickity(document.querySelector('.slider'), {
  wrapAround: true,
  autoplay: 1000,
  freeScroll: true,
});