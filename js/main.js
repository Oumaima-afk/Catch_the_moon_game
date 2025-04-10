// ETAPE 1 : les déplacements du player

// Où écouter les touches du clavier ?
// ajouter un addevent listener qq part
const player = document.querySelector(".player");
const gameArea = document.querySelector(".game-area");
const scoreEl = document.querySelector(".score");
const lifeNb = document.querySelector(".life");

console.log(player, gameArea);

// Calculer la position centrale
const middle = (gameArea.offsetWidth - player.offsetWidth) / 2;
// Placer le joueur au milieu
player.style.left = `${middle}px`;

const maxLimite = gameArea.offsetWidth - player.offsetWidth - 10;

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

// ETAPE 2 : les objets qui tombent

let score = 0;

// nombre de chances au départ
let life = 3;

// objet non attrapé
let missedCount = 0;

// Fin de jeu
let gameIsOver = false;

// Le nb de vies disponibles
function updateLifeDisplay() {
  lifeNb.textContent = `Life : ${"❤️".repeat(life)}`;
}
updateLifeDisplay();

// Les objets qui tombent
function createFallingObjects() {
  // Si le jeu est finit les objets arretent de tomber
  if (gameIsOver) return;

  let objectPosition = 0;

  // Créer un objet
  const object = document.createElement("div");
  const img = document.createElement("img");
  img.src = "../assets/star.png";
  img.alt = "Falling object";
  object.appendChild(img); // Ajouter l'image dans le div

  object.classList.add("falling-object");

  // Ajouter l'objet dans .game-area
  gameArea.append(object);

  object.style.left = Math.random() * maxLimite + "px";

  // Lui donner une position aléatoire en haut de .game-area
  const objectInterval = setInterval(() => {
    // On arrête l'interval quand le jeu est finit
    if (gameIsOver) {
      clearInterval(objectInterval);
      object.remove();
      return;
    }

    objectPosition += 5;
    object.style.top = objectPosition + "px";

    // Récupère les positions du joueur et de l'objet
    const playerRect = player.getBoundingClientRect();
    const objectRect = object.getBoundingClientRect();

    // Vérifier la collision entre les 2
    if (
      objectRect.bottom >= playerRect.top &&
      objectRect.left <= playerRect.right &&
      objectRect.right >= playerRect.left
    ) {
      // on augmente le score
      score++;
      scoreEl.textContent = `Score : ${score}`;
      object.remove();
      clearInterval(objectInterval);
    }

    // Vérifier si l'objet n'est pas attrapé
    if (objectPosition > gameArea.offsetHeight) {
      missedCount++;
      life--; // on enlève une vie
      updateLifeDisplay(); // on met à jour l'affichage
      object.remove();
      clearInterval(objectInterval);
    }

    // Game over
    if (life <= 0 && !gameIsOver) {
      gameOver();
    }
  }, 50);
}

function gameOver() {
  gameIsOver = true;

  // Afficher un écran de fin
  const gameOverScreen = document.createElement("div");
  gameOverScreen.classList.add("game-over");
  gameOverScreen.innerHTML = `
  <h1>Game over</h1>
  <p>Final score : <strong>${score}</strong></p>
  <button onclick = "restartGame()">Play again</button>`;

  // Ajouter l'écran au body
  document.body.appendChild(gameOverScreen);
}

// Pour rejouer
function restartGame() {
  window.location.reload();
}

setInterval(createFallingObjects, 2500);

// ETAPE 3 : changer d'animal
const animalElements = document.querySelectorAll(".animal");

animalElements.forEach((animal) => {
  animal.addEventListener("click", () => {
    const animalId = animal.dataset.animal;
    // changement de page
    window.location.href = `game.html?animal=${animalId}`;
  });
});

// faire le changement d'image
const params = new URLSearchParams(window.location.search);
const animal = params.get("animal");

console.log("Animal paramètre reçu :", animal);

if (animal) {
  const imageElement = document.getElementById("selected-animal");
  imageElement.src = `../assets/${animal}.png`;
  imageElement.alt = animal;
}
