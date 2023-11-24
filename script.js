let deck = [];
let playerHand = [];
let dealerHand = [];
let isGameOver = false;
let playerBalance = 1000;
const betAmount = 50;

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

    if (playerScore > 21) {
        playerBalance -= betAmount;
        document.getElementById('game-result').textContent += ' Player busts! Loses $50.';
    } else if (dealerScore > 21) {
        playerBalance += betAmount;
        document.getElementById('game-result').textContent += ' Dealer busts! Player wins $50.';
    } else if (playerScore === 21 && playerHand.length === 2) {
        playerBalance += betAmount * 1.5;
        document.getElementById('game-result').textContent += ' Blackjack! Player wins $75.';
    } else if (playerScore > dealerScore) {
        playerBalance += betAmount;
        document.getElementById('game-result').textContent += ' Player wins $50.';
    } else if (playerScore === dealerScore) {
        document.getElementById('game-result').textContent += ' Push. No money won or lost.';
    } else {
        playerBalance -= betAmount;
        document.getElementById('game-result').textContent += ' Dealer wins. Player loses $50.';
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

document.getElementById('deal-button').addEventListener('click', function() {
    if (playerBalance >= betAmount) {
        isGameOver = false;
        deck = [];
        playerHand = [];
        dealerHand = [];
        createDeck();
        shuffleDeck();
        dealHand();
        updateGameDisplay();
        document.getElementById('game-result').textContent = ''; // Clear previous game result
    } else {
        document.getElementById('game-result').textContent = 'Insufficient balance to play.';
    }
});


document.getElementById('hit-button').addEventListener('click', playerHit);
document.getElementById('stand-button').addEventListener('click', playerStand);
