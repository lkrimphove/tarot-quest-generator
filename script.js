// Load tarot cards on page load
document.addEventListener("DOMContentLoaded", () => {
  // Disable the generate button until cards are loaded
  const generateButton = document.getElementById("generateButton");
  generateButton.disabled = true;

  // Load tarot cards using the utility function
  loadCards(() => {
    generateButton.disabled = false;
    generateQuest();
  });
});

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

  if (deck.length <= 0 || reuseCards) {
    deck = [...cards];
  }

  const cardIndex = Math.floor(Math.random() * deck.length);
  const card = deck[cardIndex];
  const isReversed = Math.random() > 0.5 && !excludeReversed;
  const cardName = `${card.name} (${isReversed ? "R" : "U"})`;
  const cardMeaning = isReversed
    ? card.reversed[aspects[index].toLowerCase().replace(/\s+/g, "_")]
    : card.upright[aspects[index].toLowerCase().replace(/\s+/g, "_")];
  const aspect = aspects[index];
  const imagePath = `assets/cards/${card.image}`;

  if (!reuseCards) {
    deck.splice(cardIndex, 1);
  }

  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.innerHTML = `
    <h2>${aspect}</h2>
    <img
      src="${imagePath}" alt="${card.name}"
      class="card-image pointable ${isReversed ? "reversed" : ""}"
    >
    <h3>${cardName}</h3>
    <p>${cardMeaning}</p>
    <div class="card-controls">
      <button class="button reverse-btn">Reverse</button>
      <button class="button reroll-btn">Reroll</button>
      <button class="button info-btn invisible">Read More</button>
    </div>
  `;

  const cardImage = cardElement.querySelector(".card-image");
  cardImage.addEventListener("click", () => {
    showCardOverlay(card);
  });

  cardElement.querySelector(".reroll-btn").addEventListener("click", () => {
    const newCardElement = generateCardElement(deck, index);
    cardElement.replaceWith(newCardElement);
  });

  cardElement.querySelector(".reverse-btn").addEventListener("click", () => {
    const cardImage = cardElement.querySelector(".card-image");
    let isReversed = cardImage.classList.toggle("reversed");
    const newMeaning = isReversed
      ? card.reversed[aspects[index].toLowerCase().replace(/\s+/g, "_")]
      : card.upright[aspects[index].toLowerCase().replace(/\s+/g, "_")];

    cardElement.querySelector("h3").textContent = `${card.name} (${
      isReversed ? "U" : "R"
    })`;
    cardElement.querySelector("p").textContent = newMeaning;
  });

  return cardElement;
}
