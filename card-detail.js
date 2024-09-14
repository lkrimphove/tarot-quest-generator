document.addEventListener("DOMContentLoaded", () => {
    // Extract card name from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const cardName = urlParams.get('card');

    // Fetch card data from JSON
    fetch('cards.json')
        .then(response => response.json())
        .then(data => {
            // Find the card by name
            const card = data.cards.find(card => card.name === cardName);

            if (card) {
                // Update page content with card details
                document.getElementById('card-name').textContent = card.name;
                document.getElementById('card-description').textContent = card.description;
                document.getElementById('card-image').src = `assets/cards/${card.image}`;

                // Populate upright meanings
                const uprightList = document.getElementById('upright-meanings');
                Object.entries(card.upright).forEach(([key, meaning], index) => {
                    const aspectTitle = aspects[index];  // Get corresponding title from aspects array
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${aspectTitle}:</strong> ${meaning}`;
                    uprightList.appendChild(li);
                });                

                // Populate reversed meanings
                const reversedList = document.getElementById('reversed-meanings');
                Object.entries(card.reversed).forEach(([key, meaning], index) => {
                    const aspectTitle = aspects[index];  // Get corresponding title from aspects array
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${aspectTitle}:</strong> ${meaning}`;
                    reversedList.appendChild(li);
                });
            } else {
                document.body.innerHTML = `<p>Card not found.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching cards:', error);
            document.body.innerHTML = `<p>Error loading card details.</p>`;
        });
});
