
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Machine Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used to style web pages?",
        options: ["Python", "CSS", "Java", "SQL"],
        answer: 1
    },
    {
        question: "Which language adds interactivity to websites?",
        options: ["HTML", "CSS", "JavaScript", "XML"],
        answer: 2
    },
    {
        question: "Which HTML tag creates a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["<!-- -->", "##", "//", "**"],
        answer: 2
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["var", "int", "define", "dim"],
        answer: 0
    },
    {
        question: "Which HTML tag displays an image?",
        options: ["<image>", "<picture>", "<img>", "<src>"],
        answer: 2
    },
    {
        question: "Which CSS property changes text color?",
        options: ["font-style", "color", "background", "text-size"],
        answer: 1
    },
    {
        question: "Which method selects an element by its ID?",
        options: [
            "document.getElementById()",
            "document.getClass()",
            "document.selectID()",
            "window.getElement()"
        ],
        answer: 0
    },
    {
        question: "Which of these is a JavaScript data type?",
        options: ["Boolean", "Browser", "Website", "Keyboard"],
        answer: 0
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionNumber = document.getElementById("question-number");
const scoreDisplay = document.getElementById("score");
const progress = document.getElementById("progress");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

function showQuestion() {
    answered = false;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreDisplay.textContent = `Score: ${score}`;

    progress.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    questionElement.textContent = current.question;
    optionsContainer.innerHTML = "";
    feedback.textContent = "";
    nextBtn.disabled = true;

    current.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "option-btn";
        button.textContent = option;
        button.type = "button";

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        optionsContainer.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const current = questions[currentQuestion];
    const buttons = optionsContainer.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (selectedIndex === current.answer) {
        score++;
        feedback.textContent = "Correct! Well done!";
        feedback.style.color = "#16803c";
        buttons[selectedIndex].classList.add("correct");
    } else {
        feedback.textContent =
            `Incorrect! Correct answer: ${current.options[current.answer]}`;

        feedback.style.color = "#d32f2f";
        buttons[selectedIndex].classList.add("wrong");
        buttons[current.answer].classList.add("correct");
    }

    scoreDisplay.textContent = `Score: ${score}`;
    nextBtn.disabled = false;
    nextBtn.textContent =
        currentQuestion === questions.length - 1
            ? "View Results"
            : "Next Question";
}

function showResults() {
    quizScreen.hidden = true;
    resultScreen.hidden = false;

    progress.style.width = "100%";

    document.getElementById("final-score").textContent =
        `Your score: ${score} / ${questions.length}`;

    const percentage = (score / questions.length) * 100;

    let message;

    if (percentage >= 80) {
        message = "Excellent work! You know your programming basics!";
    } else if (percentage >= 50) {
        message = "Good effort! Keep practicing to improve.";
    } else {
        message = "Keep learning! Try again and beat your score.";
    }

    document.getElementById("result-message").textContent = message;
}

nextBtn.addEventListener("click", () => {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    answered = false;

    resultScreen.hidden = true;
    quizScreen.hidden = false;

    nextBtn.textContent = "Next Question";

    showQuestion();
});

showQuestion();
