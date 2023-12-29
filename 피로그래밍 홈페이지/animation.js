let box = document.querySelector(".interview");
let image = document.querySelector(".interview-thumbnail");

box.addEventListener("mouseover", () => {
  image.classList.add(".thumbnail-hover");
});

box.addEventListener("mouseout", () => {
  image.classList.remove(".thumbnail-hover");
});
