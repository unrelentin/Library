const gameLibrary = [];

class Game {
  constructor(name, developer, playTime, clearStatus, image) {
    this.name = name;
    this.developer = developer;
    this.playTime = playTime;
    this.clearStatus = clearStatus;
    this.image = image;
  }

  toggleClearStatus() {
    this.clearStatus = this.clearStatus === "Played" ? "Not Played" : "Played";
  }
}

function addGameToLibrary() {
  const name = document.querySelector("#game_name").value;
  const developer = document.querySelector("#game_dev").value;
  const playTime = document.querySelector("#game_playtime").value;
  const clearStatus = document.querySelector(
    `input[name="clear_status"]:checked`,
  ).value;
  const image = document.querySelector(`#game_image`).files[0];

  if (image) {
    const imageReader = new FileReader();
    imageReader.readAsDataURL(image);
    imageReader.onload = function (event) {
      const imageSrc = event.target.result;
      const newGame = new Game(
        name,
        developer,
        playTime,
        clearStatus,
        imageSrc,
      );
      gameLibrary.push(newGame);
      gameDisplay(); //Need to call this because FileReader is async
    };
  } else {
    const newGame = new Game(
      name,
      developer,
      playTime,
      clearStatus,
      "pics/Vergil.jpg",
    );
    gameLibrary.push(newGame);
    gameDisplay();
  }
}

const displayOfGame = document.querySelector(".game_pool");

function gameDisplay() {
  displayOfGame.innerHTML = "";

  gameLibrary.forEach((game, index) => {
    //iterate through each entry while keeping track of the index
    const gameCard = document.createElement("div");
    gameCard.classList.add("gameCard");
    gameCard.setAttribute("data_index", index); //give each entry an index

    const buttonContainer = document.createElement("button");
    buttonContainer.classList.add("buttonContainer");
    gameCard.appendChild(buttonContainer);

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("detailsContainer");
    gameCard.appendChild(detailsContainer);

    const gameName = document.createElement("div");
    gameName.classList.add("gameName");
    gameName.textContent = `Game Title: ${game.name}`;
    detailsContainer.appendChild(gameName);

    const gameDev = document.createElement("div");
    gameDev.classList.add("gameDev");
    gameDev.textContent = `Game Developer: ${game.developer}`;
    detailsContainer.appendChild(gameDev);

    const gameTime = document.createElement("div");
    gameTime.classList.add("gameTime");
    gameTime.textContent = `Completion Time:` + game.playTime + ` hours`;
    detailsContainer.appendChild(gameTime);

    const gameImage = document.createElement("img");
    gameImage.classList.add("gameImage");
    gameImage.src = game.image;
    gameCard.appendChild(gameImage);

    const gameStatus = document.createElement("button");
    gameStatus.classList.add("gameStatus");
    gameStatus.textContent = `${game.clearStatus}`;
    buttonContainer.appendChild(gameStatus);
    game;

    const remove_button = document.createElement("button");
    remove_button.classList.add("remove_button");
    remove_button.textContent = "X";
    buttonContainer.appendChild(remove_button);

    displayOfGame.appendChild(gameCard);
  });
}

document.querySelector(".add_game_form").addEventListener("submit", (event) => {
  event.preventDefault(); //prevent default because it will send data to a server by default, there's no server here
  addGameToLibrary();
  gameDisplay();
  document.querySelector(".add_game_form").reset();
  modal.close();
});

const modal = document.querySelector("#modal");
const openModal = document.querySelector(".new_game");

openModal.addEventListener("click", () => {
  modal.showModal();
});

window.onclick = function (event) {
  if (event.target === modal){
    modal.close()
  };
}

displayOfGame.addEventListener("click", (event) => {
  //apply to displayOfGame and not remove button directly because of event delegation, more efficient
  if (event.target.classList.contains("remove_button")) {
    const gameIndex = event.target.parentElement.getAttribute("data_index");
    gameLibrary.splice(gameIndex, 1);
    gameDisplay();
  }
});

displayOfGame.addEventListener("click", (event) => {
  if (event.target.classList.contains("gameStatus")) {
    const gameIndex =
      event.target.parentElement.parentElement.getAttribute("data_index");
    gameLibrary[gameIndex].toggleClearStatus(); //call the method on the currently selected index
    gameDisplay();
  }
});

gameLibrary.push(
  new Game("Half Life", "Valve", 11.5, "Played", "pics/Half-Life.jpg"),
);
gameLibrary.push(
  new Game(
    "Resident Evil",
    "Capcom",
    10,
    "Not Played",
    "pics/Resident_Evil_1.png",
  ),
);
gameLibrary.push(
  new Game(
    "Fallout New Vegas",
    "Obsidian",
    35,
    "Played",
    "pics/Fallout_New_Vegas.jpg",
  ),
);
gameLibrary.push(
  new Game(
    "Sekiro: Shadow die Twice",
    "From Sofware",
    20,
    "Played",
    "pics/Sekiro.jpg",
  ),
);

gameDisplay();
