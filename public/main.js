const natoAlphabet = {
    A: 'Alpha',
    B: 'Bravo',
    C: 'Charlie',
    D: 'Delta',
    E: 'Echo',
    F: 'Foxtrot',
    G: 'Golf',
    H: 'Hotel',
    I: 'India',
    J: 'Juliett',
    K: 'Kilo',
    L: 'Lima',
    M: 'Mike',
    N: 'November',
    O: 'Oscar',
    P: 'Papa',
    Q: 'Quebec',
    R: 'Romeo',
    S: 'Sierra',
    T: 'Tango',
    U: 'Uniform',
    V: 'Victor',
    W: 'Whiskey',
    X: 'X-ray',
    Y: 'Yankee',
    Z: 'Zulu'
};

const swedishAlphabet = {
    A: 'Adam',
    B: 'Bertil',
    C: 'Cesar',
    D: 'David',
    E: 'Erik',
    F: 'Filip',
    G: 'Gustav',
    H: 'Helge',
    I: 'Ivar',
    J: 'Johan',
    K: 'Kalle',
    L: 'Ludvig',
    M: 'Martin',
    N: 'Niklas',
    O: 'Olof',
    P: 'Petter',
    Q: 'Quintus',
    R: 'Rikard',
    S: 'Sigurd',
    T: 'Tore',
    U: 'Urban',
    V: 'Viktor',
    W: 'Wilhelm',
    X: 'Xerxes',
    Y: 'Yngve',
    Z: 'Zäta',
    Å: 'Åke',
    Ä: 'Ärlig',
    Ö: 'Östen'
};

let currentLetter = '';
let history = [];
let correctCount = 0;

function getRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ';
    return letters[Math.floor(Math.random() * letters.length)];
}

function updateLetter() {
    currentLetter = getRandomLetter();
    document.getElementById('letter').textContent = currentLetter;
}

function checkAnswer(answer) {
    const alphabet = document.querySelector('input[name="alphabet"]:checked').value;
    const correctAnswer = alphabet === 'nato' ? natoAlphabet[currentLetter] : swedishAlphabet[currentLetter];
    return answer === correctAnswer;
}

function updateHistory(answer, isCorrect) {
    history.push({ answer, isCorrect });
    const historyElement = document.getElementById('history');
    historyElement.innerHTML = '';
    history.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${entry.answer} - ${entry.isCorrect ? 'Correct' : 'Incorrect'}`;
        li.className = entry.isCorrect ? 'text-green-500' : 'text-red-500';
        historyElement.appendChild(li);
    });
}

function updateScore() {
    const score = (correctCount / history.length) * 100;
    document.getElementById('score').textContent = `Score: ${score.toFixed(2)}%`;
}

document.getElementById('quiz-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const answer = document.getElementById('answer').value;
    const isCorrect = checkAnswer(answer);
    if (isCorrect) correctCount++;
    updateHistory(answer, isCorrect);
    updateScore();
    updateLetter();
    document.getElementById('answer').value = '';
});

updateLetter();
