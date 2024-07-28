const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "What is the capital of Germany?",
    answers: [
      { text: "Munich", correct: false },
      { text: "Berlin", correct: true },
      { text: "Hamburg", correct: false },
      { text: "Cologne", correct: false },
    ],
  },
  {
    question: "What is the capital of Italy?",
    answers: [
      { text: "Milan", correct: false },
      { text: "Turin", correct: false },
      { text: "Rome", correct: true },
      { text: "Venice", correct: false },
    ],
  },
  {
    question: "What is the capital of Spain?",
    answers: [
      { text: "Madrid", correct: true },
      { text: "Barcelona", correct: false },
      { text: "Seville", correct: false },
      { text: "Valencia", correct: false },
    ],
  },
  {
    question: "What is the capital of Portugal?",
    answers: [
      { text: "Porto", correct: false },
      { text: "Coimbra", correct: false },
      { text: "Braga", correct: false },
      { text: "Lisbon", correct: true },
    ],
  },
];
const QuestionElement = document.getElementById("Question");
const AnswerButton = document.getElementById("answerbutton");
const nextButton = document.getElementById("next-btn");

let CurrentQuestionIndex = 0;
let score = 0;
function startQuiz() {
  CurrentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  ShowQuestion();
}
function ShowQuestion() {
  resetState();
  let currentQuestion = questions[CurrentQuestionIndex];
  let QuestionNo = CurrentQuestionIndex + 1;
  QuestionElement.innerHTML = QuestionNo + "." + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    AnswerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (AnswerButton.firstChild) {
    AnswerButton.removeChild(AnswerButton.firstChild);
  }
}
function selectAnswer(e) {
  const selectedbtn = e.target;
  const isCorrect = selectedbtn.dataset.correct === "true";
  if (isCorrect) {
    selectedbtn.classList.add("correct");
    score++;
  } else {
    selectedbtn.classList.add("incorrect");
  }
  Array.from(AnswerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  QuestionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  CurrentQuestionIndex++;
  if (CurrentQuestionIndex < questions.length) {
    ShowQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (CurrentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
