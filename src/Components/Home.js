import { useState } from 'react';
  
function Question({value, index, handleChange}) {
    const ops = ["+", "-", 'x', "/"]
    const styles = {
        answer : {
            backgroundColor: "#ddd",
            display: value.answer ? "none" : ""
        }
    }

    return (
      <div className="main">
        <div  className="question">
            {value.num1} {ops[value.operator]} {value.num2} = {value.answer ? value.result : ''}
        </div>
        <input className="no-print" style={styles.answer}
            autoComplete="off" type="text" id="answer" name="answer" maxLength="4" size="4"
            value={value.text}
            onChange={(event)=>handleChange(index, event)}
          />
      </div>
    );
}

export default function Home() {
    const [questions, setQuestions] = useState([]);
  
    function handleNext() {
      let next = Array.from({length: 15}, 
        () => (getRandomQuestion()))
      setQuestions([...next]);
    }
  
    const handleTextChange = (index, event) => {
      const question = questions[index];
      const num = Number(event.target.value);

      question.answer = question.result === num;
      question.text = event.target.value;  

      const left = questions.slice(0, index);
      const right = questions.slice(index + 1);
      setQuestions([...left, question, ...right]) ;        
    };
  
    if (questions.length === 0) {
      handleNext();
    }

    const questionList = questions.map(
        (question, index) => {
        return( 
          <li key={index}>
            <Question value={question} index={index} handleChange={handleTextChange}/>
          </li>
        );
      });

    return(
      <>
        <div className="question-info">
          <ol>{questionList}</ol>
        </div>
        <div className="no-print">
          <button onClick={() => handleNext()}>Next &raquo;</button>
        </div>
      </>
    );
  }
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  function getRandomQuestion()
  {
    let result = null;
    let num1 = getRandomInt(10, 100);
    let num2 = getRandomInt(10, 100);
    let op = getRandomInt(0, 4);
  
    if ( op===0 ) {
      result = num1 + num2;
    } else if ( op===1 ) {
      while (num1 <= num2 + 10) {
        num1 = getRandomInt(10, 100);
        num2 = getRandomInt(10, 100);
      }
      result = num1 - num2;
    } else if ( op===2 ) {
      num2 = getRandomInt(4, 10);
      result = num1 * num2;
    } else {
      num2 = getRandomInt(4, 10);
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
      text: "",
      answer: false
    };
  }
  