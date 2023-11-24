let deck = [];
let playerHand = [];
let dealerHand = [];
let isGameOver = false;
let playerBalance = 1000;
let currentBet = 50;
let playerDoubledDown = false;

function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    deck = [];

    for (let i = 0; i < 6; i++) { // Create six decks
        for (let suit of suits) {
            for (let value of values) {
                deck.push(value + " of " + suit);
            }
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
    let playerScore = calculateScore(playerHand);
    let dealerScore = calculateScore(dealerHand);

    document.getElementById('dealer-hand').textContent = 'Dealer Hand: ' + dealerHand.join(', ') + ' (Score: ' + dealerScore + ')';
    document.getElementById('player-hand').textContent = 'Player Hand: ' + playerHand.join(', ') + ' (Score: ' + playerScore + ')';
    document.getElementById('balance').textContent = 'Balance: $' + playerBalance;
    document.getElementById('game-result').textContent = '';
}

function handlePayouts() {
    let playerScore = calculateScore(playerHand);
    let dealerScore = calculateScore(dealerHand);
    let payoutMultiplier = playerDoubledDown ? 2 : 1;

    if (playerScore > 21) {
        playerBalance -= currentBet * payoutMultiplier;
        document.getElementById('game-result').textContent += ` Player busts! Loses $${currentBet * payoutMultiplier}.`;
    } else if (dealerScore > 21 || playerScore > dealerScore) {
        playerBalance += currentBet * (playerScore === 21 && playerHand.length === 2 ? 1.5 : 1) * payoutMultiplier;
        let winAmount = currentBet * (playerScore === 21 && playerHand.length === 2 ? 1.5 : 1) * payoutMultiplier;
        document.getElementById('game-result').textContent += ` Player wins $${winAmount}.`;
    } else if (playerScore === dealerScore) {
        document.getElementById('game-result').textContent += ' Push. No money won or lost.';
    } else {
        playerBalance -= currentBet * payoutMultiplier;
        document.getElementById('game-result').textContent += ` Dealer wins. Player loses $${currentBet * payoutMultiplier}.`;
    }
}

function checkForEndOfGame() {
    let playerScore = calculateScore(playerHand);
    let dealerScore = calculateScore(dealerHand);

    if (playerScore > 21 || dealerScore === 21) {
        isGameOver = true;
    } else if (dealerScore > 21 || playerScore === 21) {
        isGameOver = true;
    } else if (isGameOver) {
        while (calculateScore(dealerHand) < 17) {
            dealerHand.push(deck.pop());
        }
        dealerScore = calculateScore(dealerHand);
        isGameOver = true;
    }

    if (isGameOver) {
        handlePayouts();
        updateGameDisplay();
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
    isGameOver = true;
    checkForEndOfGame();
}

function playerDoubleDown() {
    if (!isGameOver && playerHand.length === 2 && playerBalance >= currentBet * 2) {
        playerBalance -= currentBet; // Deduct additional bet
        currentBet *= 2; // Double the bet
        playerDoubledDown = true;
        playerHit(); // Player gets one more card
        if (!isGameOver) {
            playerStand(); // Player must stand after doubling down
        }
    }
}

document.getElementById('deal-button').addEventListener('click', function() {
    if (playerBalance >= currentBet) {
        isGameOver = false;
        playerDoubledDown = false;
        deck = [];
        playerHand = [];
        dealerHand = [];
        createDeck();
        shuffleDeck();
        dealHand();
        updateGameDisplay();
    } else {
        document.getElementById('game-result').textContent = 'Insufficient balance to play.';
    }
});
document.getElementById('hit-button').addEventListener('click', playerHit);
document.getElementById('stand-button').addEventListener('click', playerStand);
document.getElementById('double-down-button').addEventListener('click', playerDoubleDown);