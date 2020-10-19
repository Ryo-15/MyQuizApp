'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');

  const quizSet = [
    {q: 'What is A?', c: ['A0', 'A1', 'A2']},
    {q: 'What is B?', c: ['B0', 'B1', 'B2']},
    {q: 'What is C?', c: ['C0', 'C1', 'C2']},
  ];
  let currentNum = 0;
  // 解答したか判定
  let isAnswered;


  // 問題をシャッフル(フィッシャー・イエーツ)
  function shuffle(arr) {
    for(let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    // if (isAnswered === true) {
    if (isAnswered) {
      return;
    }
    // 解答した状態
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
    } else {
      li.classList.add('wrong');
    }
    // 解答後ボタンを青色にする
    btn.classList.remove('disabled')
  }

  // 問題のセット
  function setQuiz() {
    // 未解答状態
    isAnswered = false;
    // 問題文の埋め込み
    question.textContent = quizSet[currentNum].q;
    // 前の問題の選択肢を削除
    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }
    // 選択肢をシャッフル(元の選択肢はシャッフルされないようにする)
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    console.log(quizSet[currentNum].c);
    // 選択肢の埋め込み
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });
    // Show Scoreの表示
    if(currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');
    currentNum++;
    setQuiz();
  });
}