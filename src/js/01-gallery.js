// Add imports above this line
// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryOfImg = document.querySelector('.gallery');


// Создание галереии
const itemEl = galleryItems
    .map((image) =>
        `<a class="gallery__item" href='${image.original}'>
        <img class="gallery__image" src='${image.preview}' alt='${image.description}' loading="lazy"> 
        </a>`)
    .join("");

galleryOfImg.insertAdjacentHTML('afterbegin', itemEl);

// Слушатель события
galleryOfImg.addEventListener('click', findImgAlt);
function findImgAlt(event) {
    return console.log(event.target.alt);
}

// Создание лайтбокс с помошью библиотеки SimpleLightbox
var lightbox = new SimpleLightbox('.gallery a', {
    captionType: 'attr',
    captionsData: 'alt',
    captionDelay: 250
 });

lightbox.on('show.SimpleLightbox');

console.log(galleryItems);
