// ===============================
// QUIZ QUESTIONS
// ===============================
const quizData = [
  {
    question: "1. What is 2 + 2?",
    options: ["1", "2", "3", "4"],
    answer: "4"
  },
  {
    question: "2. Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "3. What is the capital of France?",
    options: ["Rome", "Paris", "Berlin", "London"],
    answer: "Paris"
  },
  {
    question: "4. Which is a mammal?",
    options: ["Shark", "Dolphin", "Octopus", "Eagle"],
    answer: "Dolphin"
  },
  {
    question: "5. Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Tolstoy", "Homer", "Milton"],
    answer: "Shakespeare"
  }
];

const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// ===============================
// LOAD SAVED PROGRESS
// ===============================
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// ===============================
// RENDER QUIZ QUESTIONS
// ===============================
function renderQuestions() {
  questionsDiv.innerHTML = "";

  quizData.forEach((q, index) => {
    const qDiv = document.createElement("div");

    const title = document.createElement("p");
    title.textContent = q.question;
    qDiv.appendChild(title);

    q.options.forEach(option => {
      const label = document.createElement("label");
      const radio = document.createElement("input");

      radio.type = "radio";
      radio.name = `question-${index}`;
      radio.value = option;

      // Restore saved selection
      if (savedProgress[index] === option) {
        radio.checked = true;
      }

      radio.addEventListener("change", () => {
        // Save progress to sessionStorage
        savedProgress[index] = option;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
      });

      label.appendChild(radio);
      label.append(option);
      qDiv.appendChild(label);
      qDiv.appendChild(document.createElement("br"));
    });

    questionsDiv.appendChild(qDiv);
  });
}

renderQuestions();

// ===============================
// SUBMIT QUIZ
// ===============================
submitBtn.addEventListener("click", () => {
  let score = 0;

  quizData.forEach((q, index) => {
    if (savedProgress[index] === q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;

  // Save score to localStorage
  localStorage.setItem("score", score);
});
