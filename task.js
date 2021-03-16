import gallery from "./gallery-items.js";

const refs = {
  ulRef: document.querySelector(".js-gallery"),
  modalJs: document.querySelector(".js-lightbox"),
  modalBtn: document.querySelector(".lightbox__button"),
  origImg: document.querySelector(".lightbox__image"),
  overlay: document.querySelector(".lightbox__overlay"),
};

refs.ulRef.addEventListener("click", onOpenModal);
refs.modalBtn.addEventListener("click", onCloseModal);
refs.overlay.addEventListener("click", onCloseModal);

const imgList = gallery.map(image => image.original)
for (let i = 0; i < imgList.length; i+= 1) {imgList[i]}
let currentIndex = null;

function createItems(image) {
  const itemRef = document.createElement("li");
  itemRef.classList.add("gallery__item");

  const linkRef = document.createElement("a");
  linkRef.classList.add("gallery__link");
  linkRef.href = image.original;

  const imgRef = document.createElement("img");

  imgRef.src = image.preview;
  imgRef.alt = image.description;
  imgRef.dataset.suorce = image.original;
  imgRef.dataset.index = image.index;
  imgRef.classList.add("gallery__image");

  linkRef.append(imgRef);
  itemRef.append(linkRef);

  return itemRef;
}

const imageItem = gallery.map((image) => createItems(image));
refs.ulRef.append(...imageItem);

function onOpenModal(event) {
  event.preventDefault();

  window.addEventListener("keydown", onEsc);
  window.addEventListener("keydown", onLiftImg);

  if (event.target.nodeName === "IMG") {
    refs.modalJs.classList.add("is-open");
    refs.origImg.src = event.target.dataset.suorce;
    refs.origImg.setAttribute("data-index", "");
    } else return;
}

function onCloseModal() {
  refs.modalJs.classList.remove("is-open");
  refs.origImg.src = "";
  window.removeEventListener("keydown", onEsc);
}

function onEsc(event) {
  if (event.code === "Escape") {
    onCloseModal();
  }
}

function onLiftImg(event) {
  if (event.code === "ArrowRight") {
    currentIndex += 1;
    
    if (currentIndex < imgList.length) {
      refs.origImg.src = imgList[currentIndex]
    } else if (currentIndex === imgList.length) {
      currentIndex = 0;
      refs.origImg.src = imgList[currentIndex]
    }
  
  } else if (event.code === "ArrowLeft") {
    currentIndex -= 1;
   
    if (currentIndex >= 0) {
      refs.origImg.src = imgList[currentIndex]
    } else if (currentIndex < 0) {
      currentIndex = imgList.length - 1;
      refs.origImg.src = imgList[currentIndex]
    }
  }
}

