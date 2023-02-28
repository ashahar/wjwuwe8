
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
  
export function getRandomQuestion()
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
  