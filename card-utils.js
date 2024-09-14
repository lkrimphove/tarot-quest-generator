const aspects = [
  "Objective",
  "Quest Giver",
  "Challenge",
  "Location",
  "Result Or Reward",
];

let cards = [];

/**
 * Fetches tarot cards from the JSON file and initializes the deck.
 *
 * @param {function} callback - A function to call once the cards are loaded.
 */
function loadCards(callback) {
  fetch("cards.json")
    .then((response) => response.json())
    .then((data) => {
      cards = data.cards;
      if (callback) {
        callback(cards);
      }
    })
    .catch((error) => console.error("Error loading cards.json:", error));
}

function showCardDetails(card) {
  // Create URL parameters
  const params = new URLSearchParams({
    card: card.name,
  });

  // Open a new tab with card details
  window.open(`card-detail.html?${params.toString()}`, "_blank");
}
