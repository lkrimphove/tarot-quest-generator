const questions = [
  "Objective",
  "Quest Giver",
  "Challenge",
  "Location",
  "Result Or Reward",
];

let cards = [];

// Load the JSON file and populate the tarotDeck array
fetch("cards.json")
  .then((response) => response.json())
  .then((data) => {
    cards = data.cards;
    document.getElementById("generateButton").disabled = false;
    generateQuest();
  })
  .catch((error) => console.error("Error loading JSON:", error));

document
  .getElementById("generateButton")
  .addEventListener("click", generateQuest);

function generateQuest() {
  let deck = [...cards];
  const questDisplay = document.getElementById("questDisplay");
  questDisplay.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const cardElement = generateCardElement(deck, i);

    questDisplay.appendChild(cardElement);
  }
}

function generateCardElement(deck, index) {
  const reuseCards = document.getElementById("reuseCardsCheckbox").checked;
  const excludeReversed = document.getElementById(
    "excludeReversedCheckbox"
  ).checked;

  if (deck.length <= 0 ||reuseCards) {
    deck = [...cards];
  }

  const cardIndex = Math.floor(Math.random() * deck.length);
  const card = deck[cardIndex];
  const isReversed = Math.random() > 0.5 && !excludeReversed;
  const cardName = `${card.name} (${isReversed ? "R" : "U"})`;
  const cardMeaning = isReversed
    ? card.reversed[questions[index].toLowerCase().replace(/\s+/g, "_")]
    : card.upright[questions[index].toLowerCase().replace(/\s+/g, "_")];
  const question = questions[index];
  const imagePath = `assets/cards/${card.image}`;

  if (!reuseCards) {
    deck.splice(cardIndex, 1);
  }

  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.innerHTML = `
    <h2>${question}</h2>
    <img
      src="${imagePath}" alt="${card.name}"
      class="card-image ${isReversed ? "reversed" : ""}"
    >
    <h3>${cardName}</h3>
    <p>${cardMeaning}</p>
    <div class="card-controls">
      <button class="button reverse-btn">Reverse</button>
      <button class="button reroll-btn">Reroll</button>
      <button class="button info-btn invisible">Read More</button>
    </div>
  `;

  cardElement.querySelector(".info-btn").addEventListener("click", () => {
    alert(`More info about ${card.name} coming soon.`);
  });

  cardElement.querySelector(".reroll-btn").addEventListener("click", () => {
    const newCardElement = generateCardElement(deck, index);
    cardElement.replaceWith(newCardElement);
  });

  cardElement.querySelector(".reverse-btn").addEventListener("click", () => {
    const cardImage = cardElement.querySelector(".card-image");
    let isReversed = cardImage.classList.toggle("reversed");
    const newMeaning = isReversed
      ? card.upright[questions[index].toLowerCase().replace(/\s+/g, "_")]
      : card.reversed[questions[index].toLowerCase().replace(/\s+/g, "_")];

    cardElement.querySelector("h3").textContent = `${card.name} (${
      isReversed ? "U" : "R"
    })`;
    cardElement.querySelector("p").textContent = newMeaning;
  });

  return cardElement;
}
