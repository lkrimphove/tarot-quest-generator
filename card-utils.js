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
      card: card.name
    });
  
    // Open a new tab with card details
    window.open(`card-detail.html?${params.toString()}`, '_blank');
  }  

/**
 * Creates and opens a dynamic overlay to display card details.
 *
 * @param {object} card - The card object containing name, image, and description.
 */
function showCardOverlay(card) {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  // Add content to overlay
  overlay.innerHTML = `
    <div class="overlay-content">
        <span class="close-btn">&times;</span>
        <div class="card-details">
            <h3>${card.name}</h3>
            <div class="overlay-scrollable">
                <p class="card-description">${card.description}</p>
                <div class="card-meanings">
                    <div class="meaning-group">
                        <img src="assets/cards/${card.image}" alt="${card.name}" class="card-image" />
                        <ul>
                            ${aspects.map(aspect => {
                                const key = aspect.toLowerCase().replace(/\s+/g, "_");
                                const meaning = card.upright[key] || "N/A";
                                return `<li><strong>${aspect}:</strong> ${meaning}</li>`;
                            }).join('')}
                        </ul>
                    </div>
                    <div class="meaning-group">
                        <ul>
                            ${aspects.map(aspect => {
                                const key = aspect.toLowerCase().replace(/\s+/g, "_");
                                const meaning = card.reversed[key] || "N/A";
                                return `<li><strong>${aspect}:</strong> ${meaning}</li>`;
                            }).join('')}
                        </ul>
                        <img src="assets/cards/${card.image}" alt="${card.name}" class="card-image reversed" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

  document.body.appendChild(overlay);

  const closeBtn = overlay.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      document.body.removeChild(overlay);
    }
  });
}
