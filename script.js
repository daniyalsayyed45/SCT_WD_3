const questions = [
  {
    type: "single",
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
    answer: "Delhi"
  },
  {
    type: "multi",
    question: "Select programming languages:",
    options: ["HTML", "Python", "CSS", "JavaScript"],
    answer: ["Python", "JavaScript"]
  },
  {
    type: "text",
    question: "Fill in the blank: HTML stands for ______",
    answer: "HyperText Markup Language"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {
  let q = questions[currentQuestion];
  questionEl.innerText = q.question;
  answersEl.innerHTML = "";

  if (q.type === "single") {
    q.options.forEach(opt => {
      let btn = document.createElement("div");
      btn.innerText = opt;
      btn.classList.add("answer");
      btn.onclick = () => selectSingle(opt);
      answersEl.appendChild(btn);
    });
  }

  else if (q.type === "multi") {
    q.options.forEach(opt => {
      let label = document.createElement("label");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = opt;

      label.appendChild(checkbox);
      label.append(" " + opt);
      answersEl.appendChild(label);
      answersEl.appendChild(document.createElement("br"));
    });
  }

  else if (q.type === "text") {
    let input = document.createElement("input");
    input.type = "text";
    input.id = "textAnswer";
    answersEl.appendChild(input);
  }
}

function selectSingle(selected) {
  if (selected === questions[currentQuestion].answer) {
    score++;
  }
}

nextBtn.onclick = () => {
  let q = questions[currentQuestion];

  if (q.type === "multi") {
    let selected = [...answersEl.querySelectorAll("input:checked")]
      .map(el => el.value);

    if (JSON.stringify(selected.sort()) === JSON.stringify(q.answer.sort())) {
      score++;
    }
  }

  if (q.type === "text") {
    let input = document.getElementById("textAnswer").value;
    if (input.toLowerCase() === q.answer.toLowerCase()) {
      score++;
    }
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  document.getElementById("result-box").classList.remove("hidden");
  document.getElementById("score").innerText = score + "/" + questions.length;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("result-box").classList.add("hidden");
  document.getElementById("quiz-box").classList.remove("hidden");
  loadQuestion();
}

loadQuestion();