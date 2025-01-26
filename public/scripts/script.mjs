document.addEventListener('DOMContentLoaded', () => {
    const createDeckButton = document.getElementById('createDeck');
    const shuffleDeckButton = document.getElementById('shuffleDeck');
    const drawCardButton = document.getElementById('drawCard');
    const getDeckButton = document.getElementById('getDeck');
    const deckSelector = document.getElementById('deckSelector');
    const cardDisplay = document.getElementById('cardDisplay');
    let deckId = null;
    let decks = {};

    createDeckButton.addEventListener('click', async () => {
        const response = await fetch('/temp/deck', { method: 'POST' });
        const data = await response.json();
        deckId = data.deck_id;
        decks[deckId] = `Deck ${deckId}`;
        updateDeckSelector();
        deckSelector.disabled = false;
        shuffleDeckButton.disabled = false;
        drawCardButton.disabled = false;
        getDeckButton.disabled = false;
        cardDisplay.innerHTML = `Deck created with ID: ${deckId}`;
    });

    deckSelector.addEventListener('change', (event) => {
        deckId = event.target.value;
        cardDisplay.innerHTML = `Selected Deck ID: ${deckId}`;
    });

    shuffleDeckButton.addEventListener('click', async () => {
        if (!deckId) return;
        await fetch(`/temp/deck/shuffle/${deckId}`, { method: 'PATCH' });
        cardDisplay.innerHTML = `Deck shuffled with ID: ${deckId}`;
    });

    drawCardButton.addEventListener('click', async () => {
        if (!deckId) return;
        const response = await fetch(`/temp/deck/${deckId}/card`);
        const card = await response.json();
        showCard(card);
    });

    getDeckButton.addEventListener('click', async () => {
        if (!deckId) return;
        const response = await fetch(`/temp/deck/${deckId}`);
        const deck = await response.json();
        showDeck(deck);
    });

    const updateDeckSelector = () => {
        deckSelector.innerHTML = '';
        Object.keys(decks).forEach((id) => {
            const option = document.createElement('option');
            option.rank = id;
            option.text = decks[id];
            deckSelector.appendChild(option);
        });
        deckSelector.rank = deckId;
    };

    const showCard = (card) => {
        cardDisplay.innerHTML = `<div class="card">${card.rank} of ${card.suit}</div>`;
    };

    const showDeck = (deck) => {
        cardDisplay.innerHTML = '';
        deck.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.innerHTML = `${card.rank} of ${card.suit}`;
            cardDisplay.appendChild(cardElement);
        });
    };
});