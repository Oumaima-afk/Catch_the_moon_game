// Déplacements du joueur

const player = document.querySelector(".player");
const gameArea = document.querySelector(".game-area");
const scoreEl = document.querySelector(".score");
const lifeNb = document.querySelector(".life");

console.log(player, gameArea);

const middle = (gameArea.offsetWidth - player.offsetWidth) / 2;
player.style.left = `${middle}px`;

const maxLimite = gameArea.offsetWidth - player.offsetWidth - 10;

document.addEventListener("keydown", handleKeypress);

function handleKeypress(event) {
  let currentLeft = parseInt(player.style.left) || 0;

  if (currentLeft > 0 && event.key === "ArrowLeft") {
    player.style.left = currentLeft - 10 + "px";
  } else if (currentLeft < maxLimite && event.key === "ArrowRight") {
    player.style.left = currentLeft + 10 + "px";
  }
  event.preventDefault();
}

// Faire tomber les objets

let score = 0;

let life = 3;

let missedCount = 0;

// Fin de jeu
let gameIsOver = false;

function updateLifeDisplay() {
  lifeNb.textContent = `Life : ${"❤️".repeat(life)}`;
}
updateLifeDisplay();

function createFallingObjects() {
  if (gameIsOver) return;

  let objectPosition = 0;

  const object = document.createElement("div");
  const img = document.createElement("img");
  img.src = "../assets/star.png";
  img.alt = "Falling object";
  object.appendChild(img); // Ajouter l'image dans le div

  object.classList.add("falling-object");

  gameArea.append(object);

  object.style.left = Math.random() * maxLimite + "px";

  const objectInterval = setInterval(() => {
    if (gameIsOver) {
      clearInterval(objectInterval);
      object.remove();
      return;
    }

    objectPosition += 5;
    object.style.top = objectPosition + "px";

    const playerRect = player.getBoundingClientRect();
    const objectRect = object.getBoundingClientRect();

    if (
      objectRect.bottom >= playerRect.top &&
      objectRect.left <= playerRect.right &&
      objectRect.right >= playerRect.left
    ) {
      score++;
      scoreEl.textContent = `Score : ${score}`;
      object.remove();
      clearInterval(objectInterval);
    }

    if (objectPosition > gameArea.offsetHeight) {
      missedCount++;
      life--;
      updateLifeDisplay();
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

  // Ecran de fin
  const gameOverScreen = document.createElement("div");
  gameOverScreen.classList.add("game-over");
  gameOverScreen.innerHTML = `
  <h1>Game over</h1>
  <p>Final score : <strong>${score}</strong></p>
  <button onclick = "restartGame()">Play again</button>`;

  document.body.appendChild(gameOverScreen);
}

// Rejouer
function restartGame() {
  window.location.reload();
}

setInterval(createFallingObjects, 2500);

// Changer de perso
const animalElements = document.querySelectorAll(".animal");

animalElements.forEach((animal) => {
  animal.addEventListener("click", () => {
    const animalId = animal.dataset.animal;
    // changement de page
    window.location.href = `game.html?animal=${animalId}`;
  });
});

const params = new URLSearchParams(window.location.search);
const animal = params.get("animal");

console.log("Animal paramètre reçu :", animal);

if (animal) {
  const imageElement = document.getElementById("selected-animal");
  imageElement.src = `../assets/${animal}.png`;
  imageElement.alt = animal;
}
