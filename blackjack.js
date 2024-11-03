// blackjack.js

// Complete basic strategy table
const strategyTable = {
    pairs: {
        'A,A': {2: 'Y', 3: 'Y', 4: 'Y', 5: 'Y', 6: 'Y', 7: 'Y', 8: 'Y', 9: 'Y', 10: 'Y', 'A': 'Y'},
        'T,T': {2: 'N', 3: 'N', 4: 'N', 5: 'N', 6: 'N', 7: 'N', 8: 'N', 9: 'N', 10: 'N', 'A': 'N'},
        '9,9': {2: 'Y', 3: 'Y', 4: 'Y', 5: 'Y', 6: 'Y', 7: 'N', 8: 'Y', 9: 'Y', 10: 'N', 'A': 'N'},
        '8,8': {2: 'Y', 3: 'Y', 4: 'Y', 5: 'Y', 6: 'Y', 7: 'Y', 8: 'Y', 9: 'Y', 10: 'Y', 'A': 'Y'},
        '7,7': {2: 'Y', 3: 'Y', 4: 'Y', 5: 'Y', 6: 'Y', 7: 'Y', 8: 'H', 9: 'H', 10: 'N', 'A': 'N'},
        '6,6': {2: 'Y/N', 3: 'Y', 4: 'Y', 5: 'Y', 6: 'Y', 7: 'H', 8: 'H', 9: 'H', 10: 'N', 'A': 'N'},
        '5,5': {2: 'D', 3: 'D', 4: 'D', 5: 'D', 6: 'D', 7: 'D', 8: 'D', 9: 'D', 10: 'H', 'A': 'H'},
        '4,4': {2: 'N', 3: 'N', 4: 'N', 5: 'Y/N', 6: 'Y/N', 7: 'N', 8: 'N', 9: 'N', 10: 'N', 'A': 'N'},
        '3,3': {2: 'Y/N', 3: 'Y', 4: 'Y', 5: 'Y', 6: 'Y', 7: 'H', 8: 'H', 9: 'H', 10: 'N', 'A': 'N'},
        '2,2': {2: 'Y/N', 3: 'Y', 4: 'Y', 5: 'Y', 6: 'Y', 7: 'H', 8: 'H', 9: 'H', 10: 'N', 'A': 'N'}
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

// Action mapping to display full names
const actionMap = {
    'S': 'STAND',
    'H': 'HIT',
    'D': 'DOUBLE DOWN',
    'Ds': 'DOUBLE DOWN IF ALLOWED, OTHERWISE STAND',
    'Y': 'SPLIT',
    'Y/N': 'SPLIT IF DOUBLE AFTER SPLIT (DAS) IS ALLOWED, OTHERWISE DO NOT SPLIT',
    'SUR': 'SURRENDER',
    'N': 'DO NOT SPLIT'
};

// Convert soft hand total (13-21) to "A,X" format
function convertSoftTotalToKey(total) {
    if (total >= 13 && total <= 21) {
        const otherCard = total - 11;
        return `A,${otherCard}`;
    }
    return '';
}

// Function to get the strategy recommendation
function getStrategy(playerHandType, playerHandValue, dealerCard) {
    let action = '';
    if (playerHandType === 'pair' && strategyTable.pairs[`${playerHandValue},${playerHandValue}`]) {
        action = strategyTable.pairs[`${playerHandValue},${playerHandValue}`][dealerCard];
    } else if (playerHandType === 'soft') {
        const softHandKey = convertSoftTotalToKey(Number(playerHandValue));
        if (softHandKey && strategyTable.soft[softHandKey]) {
            action = strategyTable.soft[softHandKey][dealerCard];
        }
    } else if (playerHandType === 'hard' && strategyTable.hard[playerHandValue]) {
        action = strategyTable.hard[playerHandValue][dealerCard];
    } else if (strategyTable.surrender[playerHandValue]) {
        action = strategyTable.surrender[playerHandValue][dealerCard];
    }
    return actionMap[action] || 'Invalid input';
}

// Updated input guide content for each hand type with clearer explanations
const inputGuides = {
    hard: `
        <h3>Accepted Inputs for "Your Hand" (Hard Hands)</h3>
        <ul>
            <li>Enter any total from 8 to 17 as a single number (e.g., 8, 12, 17).</li>
            <li>Example: 16 represents a hard hand with a total of 16 points.</li>
        </ul>
    `,
    soft: `
        <h3>Accepted Inputs for "Your Hand" (Soft Hands)</h3>
        <ul>
            <li>Enter a total from 13 to 21, representing a soft hand with an ACE.</li>
            <li>13 (soft 13) could be "A + 2"</li>
            <li>14 (soft 14) could be "A + 3"</li>
            <li>15 (soft 15) could be "A + 4"</li>
            <li>16 (soft 16) could be "A + 5"</li>
            <li>17 (soft 17) could be "A + 6"</li>
            <li>18 (soft 18) could be "A + 7"</li>
            <li>19 (soft 19) could be "A + 8"</li>
            <li>20 (soft 20) could be "A + 9"</li>
        </ul>
    `,
    pair: `
        <h3>Accepted Inputs for "Your Hand" (Pairs)</h3>
        <ul>
            <li>Enter the number for a pair (e.g., 5 for a pair of fives).</li>
            <li><strong>A</strong> = ACE, <strong>T</strong> = TEN, <strong>9</strong> = NINE, <strong>8</strong> = EIGHT, etc.</li>
            <li>Example: Enter 8 for a pair of eights.</li>
        </ul>
    `
};

// Function to update the input guide based on the selected hand type
function updateInputGuide(type) {
    document.getElementById('input-guide').innerHTML = inputGuides[type];
}

// Function to display the strategy based on current input values
function displayStrategy() {
    const playerHandType = document.querySelector('.hand-type-button.active')?.id;
    let playerHandValue = document.getElementById('hand-value').value.toUpperCase(); // Convert input to uppercase
    const dealerCard = document.getElementById('dealer-card').value;

    if (playerHandType && playerHandValue && dealerCard) {
        const strategy = getStrategy(playerHandType, playerHandValue, dealerCard);
        document.getElementById('result').textContent = strategy;
    } else {
        document.getElementById('result').textContent = "Choose your hand type, enter your hand, and select the dealer's card to see the strategy.";
    }
}

// Function to handle button selection for hand type
function selectHandType(type) {
    document.querySelectorAll('.hand-type-button').forEach(button => button.classList.remove('active'));
    document.getElementById(type).classList.add('active');
    updatePlaceholder(type);
    updateInputGuide(type);  // Update the input guide based on selected hand type
    displayStrategy();  // Call displayStrategy after selecting the hand type
}

// Function to update placeholder based on hand type selection
function updatePlaceholder(type) {
    const handValueInput = document.getElementById('hand-value');
    if (type === 'hard') {
        handValueInput.placeholder = "e.g., 16";
    } else if (type === 'soft') {
        handValueInput.placeholder = "e.g., 17 for soft 17";
    } else if (type === 'pair') {
        handValueInput.placeholder = "Pairs of ? (e.g., 6)";
    }
}

// Set the initial hand type to "hard" by default
selectHandType('hard');
