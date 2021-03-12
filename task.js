import gallery from "./gallery-items.js";

const refs = {
  ulRef: document.querySelector(".js-gallery"),
  modalJs: document.querySelector(".js-lightbox"),
  modalBtn: document.querySelector(".lightbox__button"),
  origImg: document.querySelector(".lightbox__image"),
  overlay: document.querySelector(".lightbox__overlay"),
};
console.log(refs.overlay);

refs.ulRef.addEventListener("click", onOpenModal);
refs.modalBtn.addEventListener("click", onCloseModal);
refs.overlay.addEventListener("click", onCloseModal);

function createItems(image) {
  const itemRef = document.createElement("li");
  itemRef.classList.add("gallery__item");

  const linkRef = document.createElement("a");
  linkRef.classList.add("gallery__link");
  linkRef.href = image.original;

  const imgRef = document.createElement("img");

  imgRef.src = image.preview;
  imgRef.alt = image.description;
  imgRef.dataset.index = image.index;
  imgRef.dataset.suorce = image.original;
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
    console.log(refs.origImg);
    refs.modalJs.classList.add("is-open");
    refs.origImg.src = event.target.dataset.suorce;
    refs.origImg.id = event.target.id;
  } else return;
}

function onCloseModal() {
  refs.modalJs.classList.remove("is-open");
  refs.origImg.src = "";
  window.removeEventListener("keydown", onEsc);
  //   window.removeEventListener("keydown", onLiftImg);
}
function onEsc(event) {
  if (event.code === "Escape") {
    onCloseModal();
  }
}
function onLiftImg(event) {
  if (event.code === "ArrowRight") {
    let index;

    console.dir(refs.origImg);
  } else if (event.code === "ArrowLeft") {
    console.log("Left!!!");
    event.target.id -= 1;
  }
}

//
