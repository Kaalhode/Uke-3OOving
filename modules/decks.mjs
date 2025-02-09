const suits = ["Clubs", "Diamonds", "Hearts", "Spades"]

const ranks = ["Ace", "2", "3", "4", "5","6","7","8","9","10","Jack","Queen","King"]

export let decks = [];
export let deckCounter = 0;

export function createDeck(){
    let deck = [];
    for(let suit of suits){
        for(let rank of ranks){
            deck.push({suit, rank})
        }
    }
    return deck;
}
export function incrementDeckCounter() {
    return ++deckCounter;
}
