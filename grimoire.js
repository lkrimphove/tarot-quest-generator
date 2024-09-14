document.addEventListener('DOMContentLoaded', () => {
    const cardGrid = document.getElementById('card-grid');
    const cardOverlay = document.getElementById('card-overlay');
    const overlayContent = document.getElementById('overlay-card-details');
    const closeBtn = document.querySelector('.close-btn');

    loadCards(displayCards);

    function displayCards(cards) {
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.innerHTML = `
                <img src="assets/cards/${card.image}" alt="${card.name}" class="card-image pointable" />
            `;
            cardElement.addEventListener('click', () => {
                showCardOverlay(card);
            });
            cardGrid.appendChild(cardElement);
        });
    }
});
