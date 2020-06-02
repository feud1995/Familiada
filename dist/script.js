document.querySelector('#setup').addEventListener('click', () => {
  const numAnswers = parseInt(document.getElementById('numAnswers').value, 10);

  setup(numAnswers);
});

document.querySelector('#add').addEventListener('click', () => {
  const pos = parseInt(document.getElementById('pos').value, 10);
  const answer = document.getElementById('answer').value;
  const score = parseInt(document.getElementById('score').value, 10);

  correctAnswer(pos, answer, score);
});

document.querySelector('#wrong').addEventListener('click', () => {
  wrongAnswer();
});
document.querySelector('#clearWrong').addEventListener('click', () => {
  setWrong(false);
});

function correctAnswer(pos, answer, score) {
  setWrong(false);

  updateLine(pos, answer, score);

  correct.play();
}

function wrongAnswer() {
  setWrong(true);

  wrong.play();
}

function setup(numAnswers) {
  const boardEl = document.querySelector('.line-wrapper');

  setWrong(false);

  boardEl.innerHTML = '';

  for(let i = 0; i < numAnswers; i++){
    boardEl.append(createLine(i+1, '..........................', '--'));
  }
}

function createLine(pos, answer, score) {
  const line = document.createElement('div');

  line.classList.add('line');

  line.innerHTML = getTemplate(pos, answer, score);

  updateTotal();

  return line;
}

function updateLine(pos, answer, score) {
  const line = document.querySelector(`.line:nth-child(${pos})`);

  line.innerHTML = getTemplate(pos, answer, score);

  line.classList.add('reveal');

  updateTotal();
}

function getTemplate(pos, answer, score) {
  return `<span class="pos">${pos}</span><span class="answer">${answer}</span><span class="score">${score}</span>`
}

function updateTotal() {
  const totalEls = document.querySelectorAll('.line:not(.total) .score');

  const total = [].reduce.call(totalEls, (out, el) => out + parseInt(el.textContent.replace(/\-/g, '') || 0, 10), 0);

  document.querySelector('.line.total .score').textContent = total;
}

function setWrong(on) {
  document.querySelector('.side').classList[on ? 'add' : 'remove']('wrong');
}

setup(6);

const correct = new Audio('good.mp3');
const wrong = new Audio('wrong.mp3');
