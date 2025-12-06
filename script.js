// ⚠️ MUST MATCH CYPRESS QUESTION SET EXACTLY
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Rome", "Paris", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "What is 2 + 2?",
    choices: ["1", "3", "4", "5"],
    answer: "4"
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "Which is a mammal?",
    choices: ["Shark", "Dolphin", "Eagle", "Octopus"],
    answer: "Dolphin"
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: ["Shakespeare", "Tolstoy", "Milton", "Homer"],
    answer: "Shakespeare"
  }
];

const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load saved progress
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// ---------------------------
// RENDER QUESTIONS
// ---------------------------
function renderQuestions() {
  questionsDiv.innerHTML = "";

  questions.forEach((q, index) => {
    const wrapper = document.createElement("div");

    const title = document.createElement("p");
    title.textContent = q.question;
    wrapper.appendChild(title);

    q.choices.forEach(choice => {
      const label = document.createElement("label");
      const radio = document.createElement("input");

      radio.type = "radio";
      radio.name = "q" + index;
      radio.value = choice;

      // restore selection
      if (progress[index] === choice) {
        radio.setAttribute("checked", "true"); // REQUIRED FOR CYPRESS SELECTOR
      }

      // save progress
      radio.addEventListener("change", () => {
        progress[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      label.appendChild(radio);
      label.append(" " + choice);
      wrapper.appendChild(label);
      wrapper.appendChild(document.createElement("br"));
    });

    questionsDiv.appendChild(wrapper);
  });
}

renderQuestions();

// ---------------------------
// SUBMIT QUIZ
// ---------------------------
submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    if (progress[index] === q.answer) score++;
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;

  localStorage.setItem("score", score);
});
