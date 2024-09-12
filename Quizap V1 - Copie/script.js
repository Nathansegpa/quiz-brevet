const quizData = {
    maths: [
        { question: "Combien font 5 + 7 ?", answers: ["10", "12", "15"], correct: 1 },
        { question: "Quelle est la formule de l'aire d'un cercle ?", answers: ["πr²", "2πr", "πd"], correct: 0 }
    ],
    francais: [
        { question: "Qui est l'auteur de 'Les Misérables' ?", answers: ["Victor Hugo", "Émile Zola", "Albert Camus"], correct: 0 },
        { question: "Quelle est la nature du mot 'vite' ?", answers: ["Adjectif", "Adverbe", "Nom"], correct: 1 }
    ],
    histoire: [
        { question: "En quelle année est tombé le mur de Berlin ?", answers: ["1989", "1991", "1975"], correct: 0 },
        { question: "Qui était le premier président de la République française ?", answers: ["Louis-Napoléon Bonaparte", "Charles de Gaulle", "François Mitterrand"], correct: 0 }
    ],
    sciences: [
        { question: "Quelle est la planète la plus proche du soleil ?", answers: ["Venus", "Mercure", "Mars"], correct: 1 },
        { question: "Quelle est la formule chimique de l'eau ?", answers: ["CO2", "O2", "H2O"], correct: 2 }
    ]
};

let currentSubject = '';
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(subject) {
    currentSubject = subject;
    currentQuestionIndex = 0;
    score = 0;
    
    document.getElementById('subject-title').textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
    document.getElementById('subject-selection').classList.add('hidden');
    document.getElementById('quiz-section').classList.remove('hidden');

    loadQuestion();
}

function loadQuestion() {
    const questionData = quizData[currentSubject][currentQuestionIndex];
    document.getElementById('question-container').textContent = questionData.question;

    const answerButtons = document.getElementById('answer-buttons');
    answerButtons.innerHTML = '';

    questionData.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(selectedAnswer) {
    const questionData = quizData[currentSubject][currentQuestionIndex];

    const buttons = document.querySelectorAll('#answer-buttons button');
    buttons.forEach((button, index) => {
        if (index === questionData.correct) {
            button.classList.add('correct');
        } else if (index === selectedAnswer) {
            button.classList.add('incorrect');
        }
        button.disabled = true;
    });

    if (selectedAnswer === questionData.correct) {
        score++;
    }

    document.getElementById('next-btn').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData[currentSubject].length) {
        loadQuestion();
        document.getElementById('next-btn').classList.add('hidden');
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('result-section').classList.remove('hidden');

    const resultText = `Votre score est de ${score}/${quizData[currentSubject].length}`;
    document.getElementById('result-score').textContent = resultText;
}

function restartQuiz() {
    document.getElementById('result-section').classList.add('hidden');
    document.getElementById('subject-selection').classList.remove('hidden');
}
