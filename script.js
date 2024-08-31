const questions = [
    "Objective",
    "Quest Giver",
    "Challenge",
    "Location",
    "Result Or Reward"
];

let cards = [];

// Load the JSON file and populate the tarotDeck array
fetch('cards.json')
    .then(response => response.json())
    .then(data => {
        cards = data.cards;
        // Enable the generate button once the data is loaded
        document.getElementById("generateButton").disabled = false;
    })
    .catch(error => console.error('Error loading JSON:', error));

document.getElementById("generateButton").addEventListener("click", generateQuest);

function generateQuest() {
    const reuseCards = false;

    const deck = [...cards];

    const questDisplay = document.getElementById("questDisplay");
    questDisplay.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const index = Math.floor(Math.random() * deck.length);
        const card = deck[index];
        if (!reuseCards) {
            deck.splice(index,1);
        }
        

        const isReversed = Math.random() > 0.5;
        const cardName = `${card.name} (${isReversed ? "Reversed" : "Upright"})`;
        const cardMeaning = isReversed ? card.reversed[questions[i].toLowerCase().replace(/\s+/g, '_')] : card.upright[questions[i].toLowerCase().replace(/\s+/g, '_')];
        const question = questions[i];

        const imagePath = `assets/cards/${card.image}`; 

        const cardElement = document.createElement("div");
        cardElement.classList.add("card-display");
        cardElement.innerHTML = `
            <img src="${imagePath}" alt="${card.name}" class="card-image ${isReversed ? "reversed" : ""}">
            <div class="card-text">
                <h3>${question}</h3>
                <p><strong>Card:</strong> ${cardName}</p>
                <p><strong>Meaning:</strong> ${cardMeaning}</p>
            </div>
        `;

        questDisplay.appendChild(cardElement);
    }
}
