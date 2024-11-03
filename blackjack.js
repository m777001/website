// blackjack.js

// Full basic strategy table based on the image provided
const strategyTable = {
    pairs: {
        'A,A': {2: 'Y', 3: 'Y', 4: 'Y', 5: 'Y', 6: 'Y', 7: 'Y', 8: 'Y', 9: 'Y', 10: 'Y', 'A': 'Y'},
        'T,T': {2: 'N', 3: 'N', 4: 'N', 5: 'N', 6: 'N', 7: 'N', 8: 'N', 9: 'N', 10: 'N', 'A': 'N'},
        '9,9': {2: 'Y', 3: 'Y', 4: 'Y', 5: 'Y', 6: 'Y', 7: 'N', 8: 'Y', 9: 'Y', 10: 'N', 'A': 'N'},
        '8,8': {2: 'Y', 3: 'Y', 4: 'Y', 5: 'Y', 6: 'Y', 7: 'Y', 8: 'Y', 9: 'Y', 10: 'Y', 'A': 'Y'},
        '7,7': {2: 'Y', 3: 'Y', 4: 'Y', 5: 'Y', 6: 'Y', 7: 'Y', 8: 'H', 9: 'H', 10: 'N', 'A': 'N'},
        '6,6': {2: 'Y/N', 3: 'Y', 4: 'Y', 5: 'Y', 6: 'Y', 7: 'Y', 8: 'H', 9: 'H', 10: 'N', 'A': 'N'},
        '5,5': {2: 'D', 3: 'D', 4: 'D', 5: 'D', 6: 'D', 7: 'D', 8: 'D', 9: 'D', 10: 'H', 'A': 'H'},
        '4,4': {2: 'N', 3: 'N', 4: 'N', 5: 'Y/N', 6: 'Y/N', 7: 'N', 8: 'N', 9: 'N', 10: 'N', 'A': 'N'},
        '3,3': {2: 'Y/N', 3: 'Y', 4: 'Y', 5: 'Y', 6: 'Y', 7: 'Y', 8: 'H', 9: 'H', 10: 'N', 'A': 'N'},
        '2,2': {2: 'Y/N', 3: 'Y', 4: 'Y', 5: 'Y', 6: 'Y', 7: 'Y', 8: 'H', 9: 'H', 10: 'N', 'A': 'N'}
    },
    soft: {
        'A,9': {2: 'S', 3: 'S', 4: 'S', 5: 'S', 6: 'S', 7: 'S', 8: 'S', 9: 'S', 10: 'S', 'A': 'S'},
        'A,8': {2: 'S', 3: 'S', 4: 'S', 5: 'Ds', 6: 'Ds', 7: 'S', 8: 'S', 9: 'S', 10: 'S', 'A': 'S'},
        'A,7': {2: 'Ds', 3: 'Ds', 4: 'Ds', 5: 'Ds', 6: 'Ds', 7: 'S', 8: 'S', 9: 'H', 10: 'H', 'A': 'H'},
        'A,6': {2: 'H', 3: 'D', 4: 'D', 5: 'D', 6: 'D', 7: 'H', 8: 'H', 9: 'H', 10: 'H', 'A': 'H'},
        'A,5': {2: 'H', 3: 'H', 4: 'D', 5: 'D', 6: 'D', 7: 'H', 8: 'H', 9: 'H', 10: 'H', 'A': 'H'},
        'A,4': {2: 'H', 3: 'H', 4: 'D', 5: 'D', 6: 'D', 7: 'H', 8: 'H', 9: 'H', 10: 'H', 'A': 'H'},
        'A,3': {2: 'H', 3: 'H', 4: 'H', 5: 'D', 6: 'D', 7: 'H', 8: 'H', 9: 'H', 10: 'H', 'A': 'H'},
        'A,2': {2: 'H', 3: 'H', 4: 'H', 5: 'D', 6: 'D', 7: 'H', 8: 'H', 9: 'H', 10: 'H', 'A': 'H'}
    },
    hard: {
        17: {2: 'S', 3: 'S', 4: 'S', 5: 'S', 6: 'S', 7: 'S', 8: 'S', 9: 'S', 10: 'S', 'A': 'S'},
        16: {2: 'S', 3: 'S', 4: 'S', 5: 'S', 6: 'S', 7: 'H', 8: 'H', 9: 'H', 10: 'H', 'A': 'H'},
        15: {2: 'S', 3: 'S', 4: 'S', 5: 'S', 6: 'S', 7: 'H', 8: 'H', 9: 'H', 10: 'H', 'A': 'H'},
        14: {2: 'S', 3: 'S', 4: 'S', 5: 'S', 6: 'S', 7: 'H', 8: 'H', 9: 'H', 10: 'H', 'A': 'H'},
        13: {2: 'S', 3: 'S', 4: 'S', 5: 'S', 6: 'S', 7: 'H', 8: 'H', 9: 'H', 10: 'H', 'A': 'H'},
        12: {2: 'H', 3: 'H', 4: 'S', 5: 'S', 6: 'S', 7: 'H', 8: 'H', 9: 'H', 10: 'H', 'A': 'H'},
        11: {2: 'D', 3: 'D', 4: 'D', 5: 'D', 6: 'D', 7: 'D', 8: 'D', 9: 'D', 10: 'D', 'A': 'H'},
        10: {2: 'D', 3: 'D', 4: 'D', 5: 'D', 6: 'D', 7: 'D', 8: 'D', 9: 'D', 10: 'H', 'A': 'H'},
        9: {2: 'H', 3: 'D', 4: 'D', 5: 'D', 6: 'D', 7: 'H', 8: 'H', 9: 'H', 10: 'H', 'A': 'H'},
        8: {2: 'H', 3: 'H', 4: 'H', 5: 'H', 6: 'H', 7: 'H', 8: 'H', 9: 'H', 10: 'H', 'A': 'H'}
    },
    surrender: {
        16: {9: 'SUR', 10: 'SUR', 'A': 'SUR'},
        15: {10: 'SUR'}
    }
};

// Function to get the strategy recommendation
function getStrategy(playerHandType, playerHandValue, dealerCard) {
    if (playerHandType === 'pair' && strategyTable.pairs[playerHandValue]) {
        return strategyTable.pairs[playerHandValue][dealerCard] || 'N/A';
    }
    if (playerHandType === 'soft' && strategyTable.soft[playerHandValue]) {
        return strategyTable.soft[playerHandValue][dealerCard] || 'N/A';
    }
    if (playerHandType === 'hard' && strategyTable.hard[playerHandValue]) {
        return strategyTable.hard[playerHandValue][dealerCard] || 'N/A';
    }
    if (strategyTable.surrender[playerHandValue]) {
        return strategyTable.surrender[playerHandValue][dealerCard] || 'N/A';
    }
    return 'Invalid input';
}

// Event listener to get the result
document.getElementById('get-strategy').addEventListener('click', () => {
    const playerHandType = document.getElementById('hand-type').value;
    const playerHandValue = document.getElementById('hand-value').value;
    const dealerCard = document.getElementById('dealer-card').value;

    const strategy = getStrategy(playerHandType, playerHandValue, dealerCard);
    document.getElementById('result').textContent = `Recommended Action: ${strategy}`;
});
