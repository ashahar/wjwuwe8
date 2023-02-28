import { useState } from 'react';
import { useId } from 'react';
import { getRandomQuestion } from '../random';

function Question({value, index, handleChange}) {
    const answerId = useId();
    const ops = ["+", "-", 'x', "/"]
    const styles = {
        answer : {
            backgroundColor: value.answer ? "#fff" : "#ddd"
        }
    }

    return (
      <div className="main">
        <div  className="question">
            {value.num1} {ops[value.operator]} {value.num2} = 
        </div>
        <input className="no-print" style={styles.answer}
            autoComplete="off" type="text" 
            id={answerId} 
            name={"answer_" + index} maxLength="4" size="4"
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
        () => (getRandomQuestion())
      );
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
  
