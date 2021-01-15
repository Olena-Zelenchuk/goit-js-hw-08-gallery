import gallery from "./gallery-items.js";

const ulRef = document.querySelector(".js-gallery");

const ModalJs = document.querySelector(".js-lightbox");

const ModalBtn = document.querySelector(".lightbox__button");
const origImg = document.querySelector(".lightbox__image");

const onCloseHandler = function () {
  ModalJs.classList.remove("is-open");
  origImg.src = "";
};

ModalBtn.addEventListener("click", onCloseHandler);

const createItems = (image) => {
  const itemRef = document.createElement("li");
  itemRef.classList.add("gallery__item");

  const linkRef = document.createElement("a");
  linkRef.classList.add("gallery__link");
  linkRef.href = image.original;

  const imgRef = document.createElement("img");

  imgRef.src = image.preview;
  imgRef.alt = image.description;
  imgRef.dataset.suorce = image.original;
  imgRef.classList.add("gallery__image");

  linkRef.append(imgRef);
  itemRef.append(linkRef);

  return itemRef;
};

const imageItem = gallery.map((image) => createItems(image));
ulRef.append(...imageItem);

const onOpenHandler = (event) => {
  event.preventDefault();

  if (event.target.nodeName === "IMG") {
    ModalJs.classList.add("is-open");
    origImg.src = event.target.dataset.suorce;
  } else return;
};
ulRef.addEventListener("click", onOpenHandler);
