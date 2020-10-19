'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  // 問題を定義
  const quizSet = shuffle([
    {q: '世界で一番大きな湖は？', c: ['カスピ海', 'カリブ海', '琵琶湖']},
    {q: '2の8乗は？', c: ['256', '64', '1024']},
    {q: '次のうち最初にリリースされた言語は？', c: ['Pyhton', 'JavaScript', 'HTML']},
  ]);
  let currentNum = 0;
  // 解答したか判定
  let isAnswered;
  // scoreの定義
  let score = 0;


  // 選択肢をシャッフル(フィッシャー・イエーツ)
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
      score++;
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

    if(currentNum === quizSet.length - 1) {
      // console.log(`Score: ${score} / ${quizSet.length}`);
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}