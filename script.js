let deck = [];
let playerHand = [];
let dealerHand = [];
let isGameOver = false;

function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    
    for (let suit of suits) {
        for (let value of values) {
            deck.push(value + " of " + suit);
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealHand() {
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
}

function calculateScore(hand) {
    let score = 0;
    let aceCount = 0;

    for (let card of hand) {
        let cardValue = card.split(' ')[0];
        if (isNaN(cardValue)) {
            if (cardValue === 'A') {
                aceCount += 1;
                score += 11;
            } else {
                score += 10;
            }
        } else {
            score += parseInt(cardValue);
        }
    }

    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount -= 1;
    }

    return score;
}

function updateGameDisplay() {
    document.getElementById('dealer-hand').textContent = 'Dealer Hand: ' + dealerHand.join(', ');
    document.getElementById('player-hand').textContent = 'Player Hand: ' + playerHand.join(', ');
    document.getElementById('game-result').textContent = '';
}

function checkForEndOfGame() {
    let playerScore = calculateScore(playerHand);
    let dealerScore = calculateScore(dealerHand);

    if (playerScore > 21) {
        document.getElementById('game-result').textContent = 'Player busts! Dealer wins.';
        isGameOver = true;
    } else if (dealerScore > 21) {
        document.getElementById('game-result').textContent = 'Dealer busts! Player wins.';
        isGameOver = true;
    } else if (playerScore === 21) {
        document.getElementById('game-result').textContent = 'Player hits Blackjack! Player wins.';
        isGameOver = true;
    } else if (dealerScore === 21) {
        document.getElementById('game-result').textContent = 'Dealer hits Blackjack! Dealer wins.';
        isGameOver = true;
    } else if (isGameOver) {
        if (playerScore > dealerScore) {
            document.getElementById('game-result').textContent = 'Player wins!';
        } else {
            document.getElementById('game-result').textContent = 'Dealer wins!';
        }
    }
}

function playerHit() {
    if (!isGameOver) {
        playerHand.push(deck.pop());
        updateGameDisplay();
        checkForEndOfGame();
    }
}

function playerStand() {
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }

    isGameOver = true;
    updateGameDisplay();
    checkForEndOfGame();
}

document.getElementById('deal-button').addEventListener('click', function() {
    isGameOver = false;
    deck = [];
    playerHand = [];
    dealerHand = [];
    createDeck();
    shuffleDeck();
    dealHand();
    updateGameDisplay();
});

document.getElementById('hit-button').addEventListener('click', playerHit);
document.getElementById('stand-button').addEventListener('click', playerStand);
