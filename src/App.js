import { useState } from 'react';

function Question({value, answer, onChange, onClick}) {
  const ops = ["+", "-", 'x', "/"]
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onChange(event);
      onClick();
    }
  }

  return (
    <div className="game no-print">
      <div  className="question">
        {value.num1} {ops[value.operator]} {value.num2} =
      </div>
      <div>
        <input 
          autoComplete="off" 
          type="text" 
          id="answer" 
          name="answer" 
          value={answer} 
          onChange={(event)=>onChange(event)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button className="button" onClick={() => onClick()}>=</button>
    </div>
  );
}

function Answer({value}) {
  const ops = ["+", "-", 'x', "/"]
  const result = value.answer ? value.result + ' ✔' : value.result
  return (
    <div className="answer">
      {value.num1} {ops[value.operator]} {value.num2} = {result}      
    </div>
  );
}

export default function Game() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState([]);

  function handleNext() {
    let question = genQuestion();
    setHistory([...history, question]);
    setMessage("");
    setAnswer("");
  }

  function handleAnswerClick() {
    let num = Number(answer);
    if (answer.trim()==='' || isNaN(num)) {
      setMessage("Enter Your Answer")
      return;
    }

    let question = history[history.length - 1]
    if(num === question.result) {
      question.answer = true;
      handleNext();
      setMessage("Correct!")
    } else {
      setMessage("The answer is not " + answer);
    }
  }

  const handleTextChange = (event) => {
    setAnswer(event.target.value);
  };

  if (history.length === 0) {
    setHistory([genQuestion()]);
  }

  const questions = history.slice(0,-1).map((question, index) => {
    return( 
      <li key={index}>
        <Answer value={question}/>
      </li>
    );
  });

  return(
    <>
      <div>
        <Question 
          value={history[history.length - 1]} 
          answer={answer} 
          onChange={handleTextChange} 
          onClick={handleAnswerClick}
        />
      </div>
      <div className="no-print">
        {message}
      </div>
      <div className="game-info">
        <ul>{questions}</ul>
      </div>
      <button onClick={() => handleNext()}>&raquo;</button>
    </>
  );
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function genQuestion()
{
  let result = null;
  let num1 = getRandomInt(10, 100);
  let num2 = getRandomInt(2, 10);
  let op = getRandomInt(0, 4);

  if ( op===0 ) {
    num2 = getRandomInt(10, 100);
    result = num1 + num2;
  } else if ( op===1 ) {
    num2 = getRandomInt(10, 100);
    if (num1 < num2) {
      let x = num1;
      num1 = num2;
      num2 = x;
    }
    result = num1 - num2;
  } else if ( op===2 ) {
    result = num1 * num2;
  } else {
    while (num1 % num2 !== 0) {
      num1 = getRandomInt(10, 100);      
    }
    result = num1 / num2;
  } 

  return {
    num1: num1,
    num2: num2,
    operator: op,
    result: result,
    answer: false
  };
}
