const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter an equation with x as a variable: ', (equation) => {

  equation = equation.replace(/ /g, ''); // remove whitespace
  console.log(equation);

  var equalsIndex = equation.indexOf("=")
  if (equalsIndex != -1){
    var sideOne = equation.substring(0, equalsIndex);
    var sideTwo = equation.substring(equalsIndex + 1);

    var checkingVal = 0;
    var answer = null;

    while(answer == null){
      if (isTrue(sideOne, sideTwo, checkingVal)){ // positive integers
        answer = checkingVal;
      } else if (isTrue(sideOne, sideTwo, checkingVal * -1)){ // negative integers
        answer = checkingVal * -1;
      }

      checkingVal++;
    }

    console.log("The answer is: " + answer);

  } else {
    console.log("Equation did not contain an equals sign. Unable to solve");
  }



  rl.close();
});



function isTrue(sideOne, sideTwo, value){
  var evaluation = "x = " + value + "; ";

  var solvedSideOne = eval(evaluation + sideOne + ";");
  var solvedSideTwo = eval(evaluation + sideTwo + ";");

  console.log(evaluation + sideOne + " = " + evaluation + sideTwo);


  return solvedSideOne == solvedSideTwo;
}
