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

  // 問題文の埋め込み
  question.textContent = quizSet[currentNum].q;
  // 問題をシャッフル(フィッシャー・イエーツ)
  function shuffle(arr) {
    for(let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }
  // 選択肢の埋め込み
  quizSet[currentNum].c.forEach(choice => {
    const li = document.createElement('li');
    li.textContent = choice;
    choices.appendChild(li);
  });
}