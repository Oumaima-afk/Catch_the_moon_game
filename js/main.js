// ETAPE 1 : les déplacements du player

// Où écouter les touches du clavier ?
// ajouter un addevent listener qq part
const player = document.querySelector(".player");
const gameArea = document.querySelector(".game-area");

// Calculer la position centrale
const middle = (gameArea.offsetWidth - player.offsetWidth) / 2;
// Placer le joueur au milieu
player.style.left = `${middle}px`;

const maxLimite = gameArea.offsetWidth - player.offsetWidth - 10;
// const maxLimite = 360;

document.addEventListener("keydown", handleKeypress);

// Comment déplacer le joueur ?
// Si on appuie sur > il se déplace de 40px vers la droite
// Si on appuie sur < il se déplace de 40px vers la gauche
function handleKeypress(event) {
  // Comment garder une trace de sa position ?
  // variable pour stocker la position actuelle
  let currentLeft = parseInt(player.style.left) || 0;

  // Eviter que le joueur sorte du terrain
  // limiter à la largeur de game-area
  if (currentLeft > 0 && event.key === "ArrowLeft") {
    player.style.left = currentLeft - 10 + "px";
  } else if (currentLeft < maxLimite && event.key === "ArrowRight") {
    player.style.left = currentLeft + 10 + "px";
  }
  event.preventDefault();
}
