'use strict';

// Объект с пришедшими данными
let images = {
  IMG_SRC: ['https://images.chesscomfiles.com/uploads/v1/user/15724568.d631aaf3.1200x1200o.24a044fff3a6.jpeg',
    'https://avatars.mds.yandex.net/get-pdb/2496928/f72c1974-6562-47c9-93f1-73b44d61e602/s1200?webp=false',
    'https://avatars.mds.yandex.net/get-pdb/2342895/6f71cd34-dfd4-4994-9536-b16f5941f536/s1200?webp=false',
    'https://avatars.mds.yandex.net/get-pdb/2391763/ead7b063-bb15-42cc-a17d-6da640e6e6fc/s1200?webp=false',
    'https://avatars.mds.yandex.net/get-pdb/2395147/c9ea3781-f3cb-45f6-bcf8-077f9ce9966d/s1200?webp=false'
  ],
  ALT_TEXT: ['Forest lake', 'Autumn mountains', 'Fores', 'Mountains lake', 'Violet tree']
};


let gallery = {
  thumbnailsHTML: '',
  images: [],
  imagesAltTexts: [],
  imagesQuantity: 0,
  currentImage: 0,
  mainImage: {
    width: '1200px',
    height: '800px',
    src: ''
  },
  thumbnails: {
    width: '120px',
    height: '80px',
  },
  isArrows: false,

  loadImages(sourceObj) {
    this.images = sourceObj.IMG_SRC;
    this.imagesQuantity = sourceObj.IMG_SRC.length;
    this.mainImage.src = this.images[0];
  },
  loadAltTexts(sourceObj) {
    this.imagesAltTexts = sourceObj.ALT_TEXT;
  },
  createThumbnailTemplate(img, index) {
    return `
      <div class="thumbnailWrapper">
        <img class="thumbnailImg" src="${img}" alt="${this.imagesAltTexts[index]}">
      </div>
    `;
  },
  createThumbnailsWrapperTemplate() {
    this.images.forEach((elem, index) => {
      this.thumbnailsHTML += this.createThumbnailTemplate(elem, index);
    });
    return this.thumbnailsHTML;
  },
  createGalleryTemplate() {
    return `
      <div class="gallery">
        <div class="mainImg">
          <img src="${this.mainImage.src}" alt="${this.imagesAltTexts[0]}">
        </div>
        <div class="bottomWrapper">
          <div class="prev"></div>
          <div class="thumbnailsWrapper">
            ${this.createThumbnailsWrapperTemplate()}
          </div>
          <div class="next"></div>
        </div>
      </div>
    `;
  },
  changeMainImage(index) {
    this.currentImage = index;
    this.mainImage.src = this.images[this.currentImage].src;
    let mainImg  = document.querySelector('.mainImg > img');
    mainImg.src = this.images[this.currentImage];
  },
  setActiveThumbnail(index) {
    let thumbnailWrapper = document.querySelectorAll('.thumbnailWrapper');
    thumbnailWrapper.forEach((elem) => {
      elem.classList.remove('active');
    });
    thumbnailWrapper[index].classList.add('active');
  }

};

let galleryWrapper = document.querySelector('#galleryWrapper');

window.addEventListener('DOMContentLoaded', function() {
  gallery.loadImages(images);
  gallery.loadAltTexts(images);
  galleryWrapper.innerHTML = gallery.createGalleryTemplate();
  gallery.setActiveThumbnail(0);


  let bottomWrapper = document.querySelector('.bottomWrapper');
  let thumbnailWrapper = document.querySelectorAll('.thumbnailWrapper');
  let thumbnailImg = document.querySelectorAll('.thumbnailWrapper > img');
  let mainImg = document.querySelector('.mainImg > img');

  bottomWrapper.addEventListener('click', (e) => {
    let target = e.target;
    if (target.classList.contains('thumbnailImg')) {
      thumbnailImg.forEach((elem, index) => {
        if (target == elem) {
          gallery.changeMainImage(index);
        }
      });
    } else if (target.classList.contains('prev')) {
      gallery.currentImage--;
      if (gallery.currentImage < 0) {
        gallery.currentImage = gallery.images.length - 1;
      }
      gallery.changeMainImage(gallery.currentImage);
    } else if (target.classList.contains('next')) {
      gallery.currentImage++;
      if (gallery.currentImage >= gallery.images.length) {
        gallery.currentImage = 0;
      }
      gallery.changeMainImage(gallery.currentImage);
    }
    gallery.setActiveThumbnail(gallery.currentImage);
  });

  let prev = document.querySelector('.prev');
  let next = document.querySelector('.next');




});
