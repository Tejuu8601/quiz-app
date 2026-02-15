const questions = [
    {
        question: "Which language runs in the browser?",
        answers: [
            { text: "Java", correct: false },
            { text: "C", correct: false },
            { text: "JavaScript", correct: true },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Central Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Cascading Simple Sheets", correct: false },
            { text: "Cars SUVs Sailboats", correct: false }
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Trainer Marking Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Text Marketing Language", correct: false },
            { text: "Hyper Tool Multi Language", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const startButton = document.getElementById("start-btn");
const startContainer = document.getElementById("start-container");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", handleNextButton);

function startQuiz() {
    startContainer.classList.add("hide");
    questionContainer.classList.remove("hide");
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    const letters = ["A", "B", "C", "D"];

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = letters[index] + ". " + answer.text;
        button.addEventListener("click", () => selectAnswer(answer, button));
        answerButtons.appendChild(button);
    });
}


function resetState() {
    nextButton.classList.add("hide");
    feedback.innerText = "";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(answer, button) {

    const buttons = document.querySelectorAll("#answer-buttons button");

    buttons.forEach(btn => {
        btn.disabled = true;
    });

    if (answer.correct) {
        button.classList.add("correct");
        feedback.innerText = "Correct!";
        score++;
    } else {
        button.classList.add("wrong");
        feedback.innerText = "Wrong!";
    }

    nextButton.classList.remove("hide");
}



function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    questionContainer.classList.add("hide");
    nextButton.classList.add("hide");
    feedback.innerText = "";
    scoreContainer.classList.remove("hide");
    scoreElement.innerText = score + " / " + questions.length;
}
