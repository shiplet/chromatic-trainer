(function () {
  const notes = [
    "A",
    "Bb",
    "B",
    "C",
    "C#",
    "D",
    "Eb",
    "E",
    "F",
    "F#",
    "G",
    "G#",
  ];
  const operators = ["+", "-"];
  let nextPrompt = false;
  let activeNote, operator, interval, intervalForm, answer, next, check, result;

  const state = {
    note: "",
    operator: "",
    interval: 0,
    answer: "",
  };

  init();

  function init() {
    getElements();
    setListeners();

    setPrompt();
  }

  function getElements() {
    activeNote = document.getElementById("active-note");
    operator = document.getElementById("operator");
    intervalForm = document.getElementById("interval-form");
    interval = document.getElementById("interval");
    answer = document.getElementById("answer");
    next = document.getElementById("next");
    check = document.getElementById("check");
    result = document.getElementById("result");
  }

  function setListeners() {
    next.addEventListener("click", resetPrompt);
    intervalForm.addEventListener("submit", checkAnswer);
    answer.addEventListener("input", updateAnswer);
    check.addEventListener("click", checkAnswer);
  }

  function resetPrompt() {
    nextPrompt = false;
    intervalForm.reset();
    setPrompt();
    swapCheckAndNext();
    intervalForm.querySelector("input").focus();
  }

  function setPrompt() {
    const note = getNote();

    activeNote.querySelector(".box").replaceChildren(createNoteElement(note));
    operator
      .querySelector(".box")
      .replaceChildren(createSimpleElement(getOperator));
    interval
      .querySelector(".box")
      .replaceChildren(createSimpleElement(getInterval));
    result.textContent = "\u00a0";
  }

  function updateAnswer(event) {
    const value = event.target.value;
    state.answer = value.charAt(0).toUpperCase() + value.slice(1);
    this.value = state.answer;
  }

  function checkAnswer(event) {
    event.preventDefault();
    const activeNoteIndex = notes.findIndex((v) => v === state.note);
    const answerIndex = notes.findIndex((v) => v === state.answer);
    let correctIndex;
    switch (state.operator) {
      case "+":
        correctIndex = (activeNoteIndex + state.interval) % 12;
        break;
      case "-":
        correctIndex = (activeNoteIndex - state.interval + 12) % 12;
        break;
    }

    displayAnswer(answerIndex, correctIndex);
    next.focus();
  }

  function displayAnswer(answer, correct) {
    const isCorrect =
      answer === correct ? "Correct!" : `Try again: ${notes[correct]}`;
    result.textContent = isCorrect;
    nextPrompt = true;

    if (isCorrect) {
      swapCheckAndNext();
    }
  }

  function swapCheckAndNext() {
    if (nextPrompt) {
      next.classList.remove("hide");
      check.classList.add("hide");
    } else {
      next.classList.add("hide");
      check.classList.remove("hide");
    }
  }

  function createNoteElement(note) {
    const el = document.createElement("p");
    if (note.length > 1) {
      const [name, tag] = note.split("");
      const sup = document.createElement("sup");
      el.textContent = name;
      sup.textContent = tag;
      el.appendChild(sup);
    } else {
      el.textContent = note;
    }

    return el;
  }

  function createSimpleElement(cb) {
    const el = document.createElement("p");
    el.textContent = cb();
    return el;
  }

  function getNote() {
    const index = Math.floor(Math.random() * notes.length);
    const note = notes[index];
    state.note = note;
    return note;
  }

  function getOperator() {
    const op = operators[Math.floor(Math.random() * operators.length)];
    state.operator = op;
    return op;
  }

  function getInterval() {
    const intvl = Math.floor(Math.random() * 12) + 1;
    state.interval = intvl;
    return intvl;
  }
})();
